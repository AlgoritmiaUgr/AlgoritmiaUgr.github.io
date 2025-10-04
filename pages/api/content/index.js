// API Route para obtener todo el contenido
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Importar datos estáticos (en el futuro podrías conectar a una BD)
    const { estructurasData, algoritmicaData, retosData } = await import('../../../src/data/staticContent');
    
    return res.status(200).json({
      success: true,
      content: {
        estructuras: estructurasData,
        algoritmica: algoritmicaData,
        retos: retosData,
      }
    });
  } catch (error) {
    console.error('Error obteniendo contenido:', error);
    return res.status(500).json({ error: 'Error al obtener contenido' });
  }
}
