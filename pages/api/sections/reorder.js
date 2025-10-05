import redis from '../../../src/lib/upstash';

// API Route para reordenar secciones
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, sections } = req.body;
    
    if (!category || !sections || !Array.isArray(sections)) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: category y sections (array)' 
      });
    }
    
    // Obtener estructura actual
    let sectionsMap = await redis.get('sections-map');
    
    if (!sectionsMap) {
      return res.status(404).json({ error: 'No se encontró la estructura de secciones' });
    }
    
    if (!sectionsMap[category]) {
      return res.status(404).json({ error: `Categoría "${category}" no encontrada` });
    }
    
    // Actualizar el orden de las secciones
    sectionsMap[category] = sections.map((section, index) => ({
      ...section,
      order: index
    }));
    
    // Guardar en Redis
    await redis.set('sections-map', sectionsMap);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Secciones reordenadas exitosamente',
      sections: sectionsMap
    });
  } catch (error) {
    console.error('Error reordenando secciones:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
