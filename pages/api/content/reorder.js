import redis from '../../../src/lib/upstash';

// API Route para reordenar contenidos dentro de una sección
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, section, orderedIds } = req.body;

    if (!category || !section || !Array.isArray(orderedIds)) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: category, section y orderedIds (array)'
      });
    }

    const updates = [];
    for (let index = 0; index < orderedIds.length; index += 1) {
      const id = orderedIds[index];
      const key = `content:${id}`;
      const content = await redis.get(key);

      if (!content) {
        continue;
      }

      const contentCategory = content.category || 'Aprendizaje Libre';

      if (content.section !== section || contentCategory !== (category || 'Aprendizaje Libre')) {
        continue;
      }

      content.order = index;
      content.updatedAt = new Date().toISOString();
      updates.push(redis.set(key, content));
    }

    await Promise.all(updates);

    const keys = await redis.keys('content:*');
    let sameSection = [];

    if (keys && keys.length > 0) {
      const contents = await Promise.all(keys.map(async (key) => redis.get(key)));
      sameSection = contents.filter((item) => {
        if (!item) return false;
        const itemCategory = item.category || 'Aprendizaje Libre';
        return item.section === section && itemCategory === (category || 'Aprendizaje Libre');
      });

      sameSection.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
        const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contenidos reordenados exitosamente',
      data: sameSection
    });
  } catch (error) {
    console.error('Error reordenando contenidos:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
