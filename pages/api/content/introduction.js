import { redis } from '../../../src/lib/upstash';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const introduction = await redis.get('content-manager-intro');
      res.status(200).json({ introduction: introduction || '' });
    } catch (error) {
      console.error('Error fetching introduction:', error);
      res.status(500).json({ error: 'Error al cargar la introducción' });
    }
  } else if (req.method === 'POST') {
    try {
      const { introduction } = JSON.parse(req.body);
      await redis.set('content-manager-intro', introduction);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving introduction:', error);
      res.status(500).json({ error: 'Error al guardar la introducción' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
