import { redis } from '../../../src/lib/upstash';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    // Obtener el slug antes de borrar para revalidar
    const meeting = await redis.get(`meeting:${id}`);
    const slug = meeting?.slug;

    await redis.del(`meeting:${id}`);

    // Revalidar las páginas afectadas en Vercel
    try {
      if (slug) {
        await res.revalidate(`/reuniones/${slug}`);
      }
      await res.revalidate('/reuniones');
      await res.revalidate('/comparte');
    } catch (revalidateError) {
      // La revalidación falla en desarrollo, pero funciona en producción
      console.warn('Revalidación no disponible:', revalidateError.message);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error eliminando reunión:', error);
    res.status(500).json({ error: 'Error al eliminar reunión' });
  }
}
