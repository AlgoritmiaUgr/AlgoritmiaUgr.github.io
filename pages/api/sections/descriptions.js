import redis from '../../../src/lib/upstash';

// API Route para obtener todas las descripciones de secciones
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener todas las claves de descripciones
    const keys = await redis.keys('section-desc:*');
    
    if (!keys || keys.length === 0) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    // Obtener todas las descripciones
    const descriptions = await Promise.all(
      keys.map(async (key) => {
        const desc = await redis.get(key);
        return desc;
      })
    );

    // Filtrar valores nulos
    const validDescriptions = descriptions.filter(d => d !== null);

    return res.status(200).json({
      success: true,
      data: validDescriptions
    });
  } catch (error) {
    console.error('Error obteniendo descripciones:', error);
    return res.status(500).json({ error: 'Error al obtener descripciones' });
  }
}
