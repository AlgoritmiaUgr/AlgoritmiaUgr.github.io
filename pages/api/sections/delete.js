import redis from '../../../src/lib/upstash';

// API Route para eliminar una sección
export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, sectionName } = req.query;
    
    if (!category || !sectionName) {
      return res.status(400).json({ 
        error: 'Faltan parámetros requeridos: category, sectionName' 
      });
    }
    
    // Obtener estructura actual
    let sectionsMap = await redis.get('sections-map');
    
    if (!sectionsMap || !sectionsMap[category]) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    // Filtrar para eliminar la sección
    const originalLength = sectionsMap[category].length;
    sectionsMap[category] = sectionsMap[category].filter(s => s.name !== sectionName);
    
    if (sectionsMap[category].length === originalLength) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    
    // Reajustar el orden
    sectionsMap[category] = sectionsMap[category].map((section, index) => ({
      ...section,
      order: index
    }));
    
    // Guardar en Redis
    await redis.set('sections-map', sectionsMap);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Sección eliminada exitosamente',
      sections: sectionsMap
    });
  } catch (error) {
    console.error('Error eliminando sección:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
