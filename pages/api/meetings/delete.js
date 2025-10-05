import { redis } from '../../../src/lib/upstash';
import { del } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    // Obtener la reunión antes de borrar para revalidar y eliminar fotos
    const meeting = await redis.get(`meeting:${id}`);
    const slug = meeting?.slug;

    // Eliminar fotos de Vercel Blob si existen
    if (meeting?.photos && Array.isArray(meeting.photos)) {
      for (const photoUrl of meeting.photos) {
        // Solo eliminar si es una URL de Vercel Blob (no base64)
        if (photoUrl.startsWith('https://') && photoUrl.includes('blob.vercel-storage.com')) {
          try {
            await del(photoUrl);
          } catch (blobError) {
            console.warn('Error eliminando foto de Blob:', blobError);
            // Continuar aunque falle la eliminación de una foto
          }
        }
      }
    }

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
