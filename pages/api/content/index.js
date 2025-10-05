import redis from '../../../src/lib/upstash';

// API Route para obtener todo el contenido
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener todas las claves que empiecen con 'content:'
    const keys = await redis.keys('content:*');
    
    if (!keys || keys.length === 0) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    // Obtener todos los contenidos
    const contents = await Promise.all(
      keys.map(async (key) => {
        const content = await redis.get(key);
        return content;
      })
    );

    // Filtrar posibles valores nulos y ordenar por fecha de creación (más recientes primero)
    const validContents = contents.filter(c => c !== null);

    validContents.sort((a, b) => {
      const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
      const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return res.status(200).json({
      success: true,
      data: validContents
    });
  } catch (error) {
    console.error('Error obteniendo contenido:', error);
    return res.status(500).json({ error: 'Error al obtener contenido' });
  }
}
