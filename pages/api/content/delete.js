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

    // TODO: Eliminar de base de datos
    // await db.content.delete(id);

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
