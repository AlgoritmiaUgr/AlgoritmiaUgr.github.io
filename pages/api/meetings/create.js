import { redis } from '../../../src/lib/upstash';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, date, slug, content, photos } = req.body;

    if (!title || !date || !slug || !content) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newMeeting = {
      id: Date.now().toString(),
      title,
      date,
      slug,
      content,
      photos: photos || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await redis.set(`meeting:${newMeeting.id}`, newMeeting);

    res.status(200).json({ success: true, data: newMeeting });
  } catch (error) {
    console.error('Error creando reunión:', error);
    res.status(500).json({ error: 'Error al crear reunión' });
  }
}
