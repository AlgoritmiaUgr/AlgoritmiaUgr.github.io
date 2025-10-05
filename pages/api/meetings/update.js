import { redis } from '../../../src/lib/upstash';

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

    res.status(200).json({ success: true, data: updatedMeeting });
  } catch (error) {
    console.error('Error actualizando reunión:', error);
    res.status(500).json({ error: 'Error al actualizar reunión' });
  }
}
