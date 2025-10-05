import { redis } from '../../../src/lib/upstash';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const keys = await redis.keys('meeting:*');
    
    if (!keys || keys.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const meetings = await Promise.all(
      keys.map(async (key) => {
        const meeting = await redis.get(key);
        return meeting;
      })
    );

    const validMeetings = meetings.filter(Boolean);
    
    // Ordenar por fecha más reciente primero
    validMeetings.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({ success: true, data: validMeetings });
  } catch (error) {
    console.error('Error obteniendo reuniones:', error);
    res.status(500).json({ error: 'Error al obtener reuniones' });
  }
}
