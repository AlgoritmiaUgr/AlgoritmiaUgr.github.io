import redis from '../../../src/lib/upstash';

// API Route para gestionar subsecciones
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, sectionName, subsectionName, action, newOrder } = req.body;

    if (!category || !sectionName || !action) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: category, sectionName y action' 
      });
    }
    
    if ((action === 'add' || action === 'remove') && !subsectionName) {
      return res.status(400).json({ 
        error: 'Falta subsectionName para esta acción' 
      });
    }

    if (action === 'reorder' && (!Array.isArray(newOrder) || newOrder.length === 0)) {
      return res.status(400).json({ 
        error: 'Para reordenar debes enviar newOrder como un array con el nuevo orden' 
      });
    }
    
    // Obtener estructura actual
    let sectionsMap = await redis.get('sections-map');
    
    if (!sectionsMap || !sectionsMap[category]) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    // Encontrar la sección padre
    const sectionIndex = sectionsMap[category].findIndex(s => {
      const name = typeof s === 'string' ? s : s.name;
      return name === sectionName;
    });
    
    if (sectionIndex === -1) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    
    let section = sectionsMap[category][sectionIndex];
    
    // Si la sección es un string, convertirla a objeto
    if (typeof section === 'string') {
      section = {
        name: section,
        order: sectionIndex,
        subsections: []
      };
    }
    
    if (!section.subsections) {
      section.subsections = [];
    }
    
    if (action === 'add') {
      // Añadir subsección si no existe
      if (!section.subsections.includes(subsectionName)) {
        section.subsections.push(subsectionName);
      }
    } else if (action === 'remove') {
      // Eliminar subsección
      section.subsections = section.subsections.filter(sub => sub !== subsectionName);

      // Limpiar referencias en contenidos
      const contentKeys = await redis.keys('content:*');
      if (contentKeys && contentKeys.length > 0) {
        await Promise.all(
          contentKeys.map(async (key) => {
            const content = await redis.get(key);
            if (!content || !content.subsection) return;

            const contentCategory = content.category || 'Aprendizaje Libre';
            if (
              content.section === sectionName &&
              content.subsection === subsectionName &&
              contentCategory === category
            ) {
              const updated = { ...content };
              delete updated.subsection;
              updated.updatedAt = new Date().toISOString();
              await redis.set(key, updated);
            }
          })
        );
      }
    } else if (action === 'reorder') {
      const current = section.subsections;
      if (newOrder.length !== current.length) {
        return res.status(400).json({ error: 'El nuevo orden debe incluir todas las subsecciones existentes' });
      }

      const sameItems = newOrder.every((item) => current.includes(item));
      if (!sameItems) {
        return res.status(400).json({ error: 'El nuevo orden contiene subsecciones desconocidas' });
      }

      section.subsections = [...newOrder];
    } else {
      return res.status(400).json({ error: 'Acción no válida. Usa "add", "remove" o "reorder"' });
    }
    
    // Actualizar la sección en el mapa
    sectionsMap[category][sectionIndex] = section;
    
    // Guardar en Redis
    await redis.set('sections-map', sectionsMap);
    
    return res.status(200).json({ 
      success: true, 
      message: `Subsección ${action === 'add' ? 'añadida' : 'eliminada'} exitosamente`,
      sections: sectionsMap
    });
  } catch (error) {
    console.error('Error gestionando subsección:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
