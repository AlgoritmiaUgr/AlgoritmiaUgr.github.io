import redis from '../../../src/lib/upstash';

// API Route para eliminar contenido
export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    // Verificar que el contenido existe antes de eliminar
    const existingContent = await redis.get(`content:${id}`);
    
    if (!existingContent) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }

    // Eliminar de Vercel KV
    await redis.del(`content:${id}`);

    // Reordenar los contenidos restantes de la misma sección
    const keys = await redis.keys('content:*');

    if (keys && keys.length > 0) {
      const contents = await Promise.all(keys.map(async (key) => redis.get(key)));
      const remaining = contents.filter((item) => {
        if (!item) return false;
        const contentCategory = item.category || 'Aprendizaje Libre';
        const targetCategory = existingContent.category || 'Aprendizaje Libre';
        return contentCategory === targetCategory && item.section === existingContent.section;
      });

      remaining
        .sort((a, b) => {
          const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
          const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
          return orderA - orderB;
        })
        .forEach((item, index) => {
          item.order = index;
        });

      await Promise.all(
        remaining.map((item) => redis.set(`content:${item.id}`, {
          ...item,
          updatedAt: new Date().toISOString(),
        }))
      );
    }

    // Revalidar la página de Aprende
    try {
      await res.revalidate('/aprende');
    } catch (revalidateError) {
      console.warn('Revalidación no disponible:', revalidateError.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Contenido eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error eliminando contenido:', error);
    return res.status(500).json({ 
      error: 'Error al eliminar contenido' 
    });
  }
}
