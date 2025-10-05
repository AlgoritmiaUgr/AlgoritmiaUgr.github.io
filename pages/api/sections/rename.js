import redis from '../../../src/lib/upstash';

// API Route para renombrar secciones o subsecciones
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, type, oldName, newName, parentSection } = req.body;

    if (!category || !type || !oldName || !newName) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: category, type, oldName, newName'
      });
    }

    const trimmedNewName = newName.trim();
    if (!trimmedNewName) {
      return res.status(400).json({ error: 'El nuevo nombre no puede estar vacío' });
    }

    if (trimmedNewName === oldName) {
      return res.status(200).json({
        success: true,
        message: 'El nombre es el mismo, no se realizaron cambios',
        sections: sectionsMap,
      });
    }

    const sectionsMap = await redis.get('sections-map');

    if (!sectionsMap || !sectionsMap[category]) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    if (type === 'section') {
      const sectionIndex = sectionsMap[category].findIndex((section) => {
        const name = typeof section === 'string' ? section : section.name;
        return name === oldName;
      });

      if (sectionIndex === -1) {
        return res.status(404).json({ error: 'Sección no encontrada' });
      }

      const section = sectionsMap[category][sectionIndex];
      const duplicateName = sectionsMap[category].some((item, idx) => {
        const name = typeof item === 'string' ? item : item.name;
        return idx !== sectionIndex && name === trimmedNewName;
      });

      if (duplicateName) {
        return res.status(409).json({ error: 'Ya existe una sección con ese nombre' });
      }
      const normalizedSection =
        typeof section === 'string'
          ? { name: section, order: sectionIndex, subsections: [] }
          : section;

      const updatedSection = {
        ...normalizedSection,
        name: trimmedNewName,
      };

      sectionsMap[category][sectionIndex] = updatedSection;

      // Actualizar descripción si existe
      const oldDescKey = `section-desc:${category}:${oldName}`;
      const description = await redis.get(oldDescKey);

      if (description) {
        const newDescKey = `section-desc:${category}:${trimmedNewName}`;
        await redis.set(newDescKey, {
          ...description,
          section: trimmedNewName,
          updatedAt: new Date().toISOString(),
        });
        await redis.del(oldDescKey);
      }

      // Actualizar contenidos relacionados
      const contentKeys = await redis.keys('content:*');

      if (contentKeys && contentKeys.length > 0) {
        await Promise.all(
          contentKeys.map(async (key) => {
            const content = await redis.get(key);
            if (!content) return;

            const contentCategory = content.category || 'Aprendizaje Libre';

            if (content.section === oldName && contentCategory === category) {
              await redis.set(key, {
                ...content,
                section: trimmedNewName,
                updatedAt: new Date().toISOString(),
              });
            }
          })
        );
      }
    } else if (type === 'subsection') {
      if (!parentSection) {
        return res.status(400).json({ error: 'Falta el campo parentSection para renombrar una subsección' });
      }

      const sectionIndex = sectionsMap[category].findIndex((section) => {
        const name = typeof section === 'string' ? section : section.name;
        return name === parentSection;
      });

      if (sectionIndex === -1) {
        return res.status(404).json({ error: 'Sección padre no encontrada' });
      }

      const section = sectionsMap[category][sectionIndex];

      const subsections = Array.isArray(section.subsections) ? [...section.subsections] : [];
      const subsectionIndex = subsections.findIndex((item) => item === oldName);

      if (subsectionIndex === -1) {
        return res.status(404).json({ error: 'Subsección no encontrada' });
      }

      if (subsections.includes(trimmedNewName)) {
        return res.status(409).json({ error: 'Ya existe una subsección con ese nombre' });
      }

      subsections[subsectionIndex] = trimmedNewName;

      const normalizedParent =
        typeof section === 'string'
          ? { name: parentSection, order: sectionIndex, subsections: [] }
          : section;

      sectionsMap[category][sectionIndex] = {
        ...normalizedParent,
        subsections,
      };

      const contentKeys = await redis.keys('content:*');

      if (contentKeys && contentKeys.length > 0) {
        await Promise.all(
          contentKeys.map(async (key) => {
            const content = await redis.get(key);
            if (!content || !content.subsection) return;

            const contentCategory = content.category || 'Aprendizaje Libre';
            if (
              content.section === parentSection &&
              content.subsection === oldName &&
              contentCategory === category
            ) {
              await redis.set(key, {
                ...content,
                subsection: trimmedNewName,
                updatedAt: new Date().toISOString(),
              });
            }
          })
        );
      }
    } else {
      return res.status(400).json({ error: 'Tipo no soportado. Usa "section" o "subsection"' });
    }

    await redis.set('sections-map', sectionsMap);

    return res.status(200).json({
      success: true,
      message: 'Nombre actualizado correctamente',
      sections: sectionsMap,
    });
  } catch (error) {
    console.error('Error renombrando sección:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
