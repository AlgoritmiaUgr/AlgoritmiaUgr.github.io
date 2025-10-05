import { redis } from '../../../src/lib/upstash';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    const existingMeeting = await redis.get(`meeting:${id}`);

    if (!existingMeeting) {
      return res.status(404).json({ error: 'Reunión no encontrada' });
    }

    const updatedMeeting = {
      ...existingMeeting,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await redis.set(`meeting:${id}`, updatedMeeting);

    // Revalidar las páginas afectadas
    try {
      await res.revalidate('/reuniones');
      await res.revalidate('/comparte');
      if (existingMeeting.slug) {
        await res.revalidate(`/reuniones/${existingMeeting.slug}`);
      }
      if (updatedMeeting.slug && updatedMeeting.slug !== existingMeeting.slug) {
        await res.revalidate(`/reuniones/${updatedMeeting.slug}`);
      }
    } catch (revalidateError) {
      console.warn('Revalidación no disponible:', revalidateError.message);
    }

    res.status(200).json({ success: true, data: updatedMeeting });
  } catch (error) {
    console.error('Error actualizando reunión:', error);
    res.status(500).json({ error: 'Error al actualizar reunión' });
  }
}
