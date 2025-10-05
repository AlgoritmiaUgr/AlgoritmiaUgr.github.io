import redis from '../../../src/lib/upstash';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// API Route para crear contenido
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
  const { section, title, content, category, subsection, pdfAttachment } = req.body;

    // Validar datos requeridos
    if (!section || !title || !content) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: section, title, content' 
      });
    }

    // Calcular el orden para el nuevo contenido dentro de su sección (global, no por subsección)
    let nextOrder = 0;
    const keys = await redis.keys('content:*');

    if (keys && keys.length > 0) {
      const sameSectionContents = await Promise.all(
        keys.map(async (key) => redis.get(key))
      );

      const filtered = sameSectionContents.filter((item) => {
        if (!item) return false;
        const contentCategory = item.category || 'Aprendizaje Libre';
        return contentCategory === (category || 'Aprendizaje Libre') && 
               item.section === section;
      });

      if (filtered.length > 0) {
        const maxOrder = Math.max(
          ...filtered.map((item) => (typeof item.order === 'number' ? item.order : -1))
        );
        nextOrder = maxOrder + 1;
      }
    }

    // Crear el contenido
    const newContent = {
      id: Date.now().toString(),
      section,
      category: category || '',
      subsection: subsection || '',
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: nextOrder,
      ...(pdfAttachment && pdfAttachment.url
        ? {
            pdfAttachment: {
              name: pdfAttachment.name || 'documento.pdf',
              type: pdfAttachment.type || 'application/pdf',
              size: pdfAttachment.size || null,
              url: pdfAttachment.url,
            },
          }
        : {}),
    };

    // Guardar en Vercel KV con la clave content:{id}
    await redis.set(`content:${newContent.id}`, newContent);

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
