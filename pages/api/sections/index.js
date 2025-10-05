import redis from '../../../src/lib/upstash';

// API Route para gestionar secciones (GET para obtener, POST para crear/actualizar)
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Obtener la estructura de secciones
      const sectionsMap = await redis.get('sections-map');
      
      if (!sectionsMap) {
        // Estructura inicial por defecto
        const defaultSections = {
          'Aprendizaje Libre': [
            { name: 'Estructuras de Datos', order: 0, subsections: [] },
            { name: 'Algorítmica', order: 1, subsections: [] },
            { name: 'Retos', order: 2, subsections: [] },
            { name: 'Extra', order: 3, subsections: [] }
          ],
          'Universitario': [
            { name: 'Estructuras de Datos', order: 0, subsections: [] },
            { name: 'Algorítmica', order: 1, subsections: [] }
          ]
        };
        
        await redis.set('sections-map', defaultSections);
        return res.status(200).json({ success: true, sections: defaultSections });
      }
      
      return res.status(200).json({ success: true, sections: sectionsMap });
    } 
    
    else if (req.method === 'POST') {
      // Crear o actualizar una sección
      const { category, sectionName, subsections = [] } = req.body;
      
      if (!category || !sectionName) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos: category, sectionName' 
        });
      }
      
      // Obtener estructura actual
      let sectionsMap = await redis.get('sections-map');
      
      if (!sectionsMap) {
        sectionsMap = {
          'Aprendizaje Libre': [],
          'Universitario': []
        };
      }
      
      // Inicializar categoría si no existe
      if (!sectionsMap[category]) {
        sectionsMap[category] = [];
      }
      
      // Verificar si la sección ya existe
      const existingIndex = sectionsMap[category].findIndex(s => s.name === sectionName);
      
      if (existingIndex >= 0) {
        // Actualizar sección existente
        sectionsMap[category][existingIndex] = {
          ...sectionsMap[category][existingIndex],
          subsections
        };
      } else {
        // Crear nueva sección
        const newSection = {
          name: sectionName,
          order: sectionsMap[category].length,
          subsections
        };
        sectionsMap[category].push(newSection);
      }
      
      // Guardar en Redis
      await redis.set('sections-map', sectionsMap);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Sección guardada exitosamente',
        sections: sectionsMap
      });
    }
    
    else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error en API de secciones:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
