// API Route para crear/actualizar contenido
export default async function handler(req, res) {
  // Solo permitir POST y PUT
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { section, title, content, category } = req.body;

    // Validar datos requeridos
    if (!section || !title || !content) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: section, title, content' 
      });
    }

    // Aquí guardarías en una base de datos
    // Por ahora, solo simulamos el guardado
    const newContent = {
      id: Date.now().toString(),
      section,
      category: category || 'general',
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // TODO: Guardar en base de datos (MongoDB, PostgreSQL, etc.)
    // await db.content.create(newContent);

    return res.status(201).json({
      success: true,
      message: 'Contenido guardado exitosamente',
      data: newContent
    });
  } catch (error) {
    console.error('Error guardando contenido:', error);
    return res.status(500).json({ 
      error: 'Error al guardar contenido' 
    });
  }
}
