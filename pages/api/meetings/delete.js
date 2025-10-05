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

    await redis.del(`meeting:${id}`);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error eliminando reunión:', error);
    res.status(500).json({ error: 'Error al eliminar reunión' });
  }
}
