import redis from '../../../src/lib/upstash';

// API Route para crear/actualizar descripción de sección
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, section, description } = req.body;

    // Validar datos requeridos
    if (!category || !section || !description) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: category, section, description' 
      });
    }

    // Crear objeto de descripción
    const sectionDescription = {
      category,
      section,
      description,
      updatedAt: new Date().toISOString(),
    };

    // Guardar en Redis con la clave section-desc:{category}:{section}
    const key = `section-desc:${category}:${section}`;
    await redis.set(key, sectionDescription);

    return res.status(200).json({
      success: true,
      message: 'Descripción guardada exitosamente',
      data: sectionDescription
    });
  } catch (error) {
    console.error('Error guardando descripción:', error);
    return res.status(500).json({ 
      error: 'Error al guardar descripción' 
    });
  }
}
