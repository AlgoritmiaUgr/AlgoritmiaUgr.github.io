import redis from '../../../src/lib/upstash';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// API Route para actualizar contenido
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
  const { section, title, content, category, order, subsection, pdfAttachment } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID requerido' });
    }

    // Validar datos requeridos
    if (!section || !title || !content) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: section, title, content' 
      });
    }

    // Leer el contenido existente para mantener la fecha de creación
    const existingContent = await redis.get(`content:${id}`);
    
    if (!existingContent) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }

    // Actualizar el contenido
    const updatedContent = {
      ...existingContent,
      section,
      category: category || '',
      title,
      content,
      updatedAt: new Date().toISOString(),
      order:
        typeof order === 'number'
          ? order
          : typeof existingContent.order === 'number'
            ? existingContent.order
            : 0,
      ...(subsection !== undefined
        ? { subsection }
        : existingContent.subsection !== undefined
          ? { subsection: existingContent.subsection }
          : {}),
    };

    if (pdfAttachment && pdfAttachment.url) {
      updatedContent.pdfAttachment = {
        name: pdfAttachment.name || existingContent.pdfAttachment?.name || 'documento.pdf',
        type: pdfAttachment.type || 'application/pdf',
        size: pdfAttachment.size || existingContent.pdfAttachment?.size || null,
        url: pdfAttachment.url,
      };
    } else if (pdfAttachment === null) {
      delete updatedContent.pdfAttachment;
    }

    // Guardar en Vercel KV
    await redis.set(`content:${id}`, updatedContent);

    return res.status(200).json({
      success: true,
      message: 'Contenido actualizado exitosamente',
      data: updatedContent
    });
  } catch (error) {
    console.error('Error actualizando contenido:', error);
    return res.status(500).json({ 
      error: 'Error al actualizar contenido' 
    });
  }
}
