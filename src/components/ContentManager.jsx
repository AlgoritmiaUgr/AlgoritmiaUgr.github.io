import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, FileText, Calendar, Eye, Upload, ChevronUp, ChevronDown, Pencil } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

export default function ContentManager() {
  const [activeTab, setActiveTab] = useState('content'); // 'content' o 'meetings'
  const [contents, setContents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories] = useState(['Aprendizaje Libre', 'Universitario']);
  const [sectionsMap, setSectionsMap] = useState({
    'Aprendizaje Libre': [
      { name: 'Estructuras de Datos', order: 0, subsections: [] },
      { name: 'Algorítmica', order: 1, subsections: [] },
      { name: 'Retos', order: 2, subsections: [] },
      { name: 'Extra', order: 3, subsections: [] }
    ],
    'Universitario': [
      { name: 'Estructuras de Datos', order: 0, subsections: [] },
      { name: 'Algorítmica', order: 1, subsections: [] }
    ]
  });
  const [renderKey, setRenderKey] = useState(0); // Para forzar re-render
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [editingDescription, setEditingDescription] = useState(null); // {category, section}
  const [descriptionText, setDescriptionText] = useState('');
  const [sectionDescriptions, setSectionDescriptions] = useState({});
  const [newSubsectionName, setNewSubsectionName] = useState('');
  const [addingSubsectionFor, setAddingSubsectionFor] = useState(null); // {category, section}
  const [sectionRenameTarget, setSectionRenameTarget] = useState(null); // {category, originalName}
  const [sectionRenameValue, setSectionRenameValue] = useState('');
  const [subsectionRenameTarget, setSubsectionRenameTarget] = useState(null); // {category, section, originalName}
  const [subsectionRenameValue, setSubsectionRenameValue] = useState('');
  const [contentRenameTarget, setContentRenameTarget] = useState(null); // content id
  const [contentRenameValue, setContentRenameValue] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  const [introText, setIntroText] = useState('');
  const [aprendeIntro, setAprendeIntro] = useState('');
  const [isEditingAprendeIntro, setIsEditingAprendeIntro] = useState(false);
  const [aprendeIntroText, setAprendeIntroText] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Aprendizaje Libre',
    section: 'Estructuras de Datos',
    subsection: '',
    title: '',
    content: '',
    pdfAttachment: null,
  });
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    slug: '',
    content: '',
    photos: [],
  });

  // Cargar contenidos al montar el componente
  useEffect(() => {
    loadContents();
    loadMeetings();
    loadSections();
    loadSectionDescriptions();
    loadIntroduction();
    loadAprendeIntroduction();
  }, []);

  useEffect(() => {
    if (!isAddingSection) {
      setAddingSubsectionFor(null);
      setNewSubsectionName('');
      setSectionRenameTarget(null);
      setSectionRenameValue('');
      setSubsectionRenameTarget(null);
      setSubsectionRenameValue('');
    }
  }, [isAddingSection]);

  const loadSections = async () => {
    try {
      const timestamp = Date.now(); // Anti-caché
      const response = await fetch(`/api/sections?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await response.json();
      if (data.success) {
        setSectionsMap(data.sections);
        setRenderKey(prev => prev + 1);

        setFormData((prev) => {
          const availableSections = (data.sections[prev.category] || []).map((section) =>
            typeof section === 'string' ? section : section.name
          );

          if (availableSections.length === 0) {
            return { ...prev, section: '' };
          }

          if (!availableSections.includes(prev.section)) {
            return { ...prev, section: availableSections[0] };
          }

          return prev;
        });
      }
    } catch (error) {
      console.error('Error cargando secciones:', error);
    }
  };

  const loadAprendeIntroduction = async () => {
    try {
      const response = await fetch('/api/aprende/introduction');
      const data = await response.json();
      setAprendeIntro(data.introduction || '');
    } catch (error) {
      console.error('Error cargando introducción de aprende:', error);
    }
  };

  const handleSaveAprendeIntroduction = async () => {
    try {
      const response = await fetch('/api/aprende/introduction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ introduction: aprendeIntroText }),
      });

      if (response.ok) {
        setAprendeIntro(aprendeIntroText);
        setIsEditingAprendeIntro(false);
        alert('Introducción de /aprende guardada correctamente');
      }
    } catch (error) {
      console.error('Error guardando introducción:', error);
      alert('Error al guardar la introducción');
    }
  };

  const loadIntroduction = async () => {
    try {
      const response = await fetch('/api/content/introduction');
      const data = await response.json();
      setIntroduction(data.introduction || '');
    } catch (error) {
      console.error('Error cargando introducción:', error);
    }
  };

  const handleSaveIntroduction = async () => {
    try {
      const response = await fetch('/api/content/introduction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ introduction: introText }),
      });

      if (response.ok) {
        setIntroduction(introText);
        setIsEditingIntro(false);
        alert('Introducción guardada correctamente');
      }
    } catch (error) {
      console.error('Error guardando introducción:', error);
      alert('Error al guardar la introducción');
    }
  };

  const loadSectionDescriptions = async () => {
    try {
      const response = await fetch('/api/sections/descriptions');
      const data = await response.json();
      
      if (data.success) {
        // Convertir array a objeto para fácil acceso
        const descriptionsMap = {};
        data.data.forEach(desc => {
          const key = `${desc.category}:${desc.section}`;
          descriptionsMap[key] = desc.description;
        });
        setSectionDescriptions(descriptionsMap);
      }
    } catch (error) {
      console.error('Error cargando descripciones:', error);
    }
  };

  // Obtener las secciones disponibles según la categoría
  const getAvailableSections = () => {
    const sections = sectionsMap[formData.category] || [];
    // Convertir a array de strings si es array de objetos
    return sections.map(s => typeof s === 'string' ? s : s.name);
  };

  const loadContents = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      
      if (data.success) {
        const normalized = (data.data || []).map((item, index) => ({
          ...item,
          order: typeof item.order === 'number' ? item.order : index,
        }));

        setContents(normalized);
      }
    } catch (error) {
      console.error('Error cargando contenidos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMeetings = async () => {
    try {
      const response = await fetch('/api/meetings');
      const data = await response.json();
      
      if (data.success) {
        setMeetings(data.data || []);
      }
    } catch (error) {
      console.error('Error cargando reuniones:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Si la sección es "Introducción", guardar en el endpoint especial de /aprende
      if (formData.section === 'Introducción' && formData.category === 'Aprendizaje Libre') {
        const response = await fetch('/api/aprende/introduction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ introduction: formData.content }),
        });

        const data = await response.json();

        if (data.success) {
          alert('Introducción de /aprende guardada exitosamente');
          setAprendeIntro(formData.content);
          setIsCreating(false);
          setFormData({
            category: 'Aprendizaje Libre',
            section: 'Estructuras de Datos',
            subsection: '',
            title: '',
            content: '',
            pdfAttachment: null,
          });
        } else {
          alert('Error: ' + data.error);
        }
        return;
      }

      // Flujo normal para otros contenidos
      const url = isEditing ? `/api/content/update?id=${editingId}` : '/api/content/create';
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditing ? 'Contenido actualizado' : 'Contenido guardado exitosamente');
        // Recargar la lista completa
        await loadContents();
        setIsCreating(false);
        setIsEditing(false);
        setEditingId(null);
        setFormData({
          category: 'Aprendizaje Libre',
          section: 'Estructuras de Datos',
          subsection: '',
          title: '',
          content: '',
          pdfAttachment: null,
        });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error guardando contenido:', error);
      alert('Error al guardar contenido');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      category: item.category || 'Aprendizaje Libre',
      section: item.section,
      subsection: item.subsection || '',
      title: item.title,
      content: item.content,
      pdfAttachment: item.pdfAttachment || null,
    });
    setEditingId(item.id);
    setIsEditing(true);
    setIsCreating(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (activeTab === 'content') {
          setFormData((prev) => ({ ...prev, content: event.target.result }));
        } else {
          setMeetingData((prev) => ({ ...prev, content: event.target.result }));
        }
      };
      reader.readAsText(file);
    } else {
      alert('Por favor selecciona un archivo .md');
    }
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('El archivo debe ser un PDF.');
      e.target.value = '';
      return;
    }

    const maxBytes = 8 * 1024 * 1024; // 8MB de límite recomendado
    if (file.size > maxBytes) {
      alert('El PDF es demasiado grande. Por favor, sube un archivo de hasta 8MB.');
      e.target.value = '';
      return;
    }

    setUploadingPdf(true);
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const url = event.target?.result;
      if (typeof url === 'string') {
        setFormData((prev) => ({
          ...prev,
          pdfAttachment: {
            name: file.name,
            size: file.size,
            type: file.type,
            url,
          },
        }));
      }
      setUploadingPdf(false);
      e.target.value = '';
    };
    reader.onerror = () => {
      alert('No se pudo leer el PDF. Inténtalo de nuevo.');
      setUploadingPdf(false);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePdf = () => {
    setFormData((prev) => ({ ...prev, pdfAttachment: null }));
  };

  const handleMeetingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = isEditing ? `/api/meetings/update?id=${editingId}` : '/api/meetings/create';
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditing ? 'Reunión actualizada exitosamente' : 'Reunión guardada exitosamente');
        await loadMeetings();
        setIsCreating(false);
        setIsEditing(false);
        setEditingId(null);
        setMeetingData({ title: '', date: '', slug: '', content: '', photos: [] });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error guardando reunión:', error);
      alert('Error al guardar reunión');
    }
  };

  const handleDeleteMeeting = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta reunión?')) return;

    try {
      const response = await fetch(`/api/meetings/delete?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Reunión eliminada');
        await loadMeetings();
      }
    } catch (error) {
      console.error('Error eliminando reunión:', error);
      alert('Error al eliminar');
    }
  };

  const handleEditMeeting = (meeting) => {
    setIsEditing(true);
    setEditingId(meeting.id);
    setIsCreating(true);
    setMeetingData({
      title: meeting.title,
      date: meeting.date,
      slug: meeting.slug,
      content: meeting.content,
      photos: meeting.photos || [],
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este contenido?')) return;

    try {
      const response = await fetch(`/api/content/delete?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Contenido eliminado');
        // Recargar la lista
        await loadContents();
      }
    } catch (error) {
      console.error('Error eliminando contenido:', error);
      alert('Error al eliminar');
    }
  };

  const handleSaveDescription = async (category, section) => {
    try {
      const response = await fetch('/api/sections/update-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          section,
          description: descriptionText,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Descripción guardada exitosamente');
        // Actualizar el mapa local
        const key = `${category}:${section}`;
        setSectionDescriptions({
          ...sectionDescriptions,
          [key]: descriptionText
        });
        setEditingDescription(null);
        setDescriptionText('');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error guardando descripción:', error);
      alert('Error al guardar descripción');
    }
  };

  const handlePhotoUpload = async (e, targetField = 'content') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen');
      return;
    }

    setUploadingPhoto(true);

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Insertar el markdown de la imagen en el textarea correspondiente
        const imageMarkdown = `![${file.name}](${data.url})`;
        
        if (targetField === 'content') {
          setFormData(prev => ({
            ...prev,
            content: prev.content + '\n' + imageMarkdown + '\n'
          }));
        } else if (targetField === 'meeting') {
          setMeetingData(prev => ({
            ...prev,
            content: prev.content + '\n' + imageMarkdown + '\n',
            photos: [...(prev.photos || []), data.url]
          }));
        }

        alert('Foto subida correctamente');
      } else {
        alert('Error al subir la foto: ' + data.error);
      }
    } catch (error) {
      console.error('Error subiendo foto:', error);
      alert('Error al subir la foto');
    } finally {
      setUploadingPhoto(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleAddSection = async (category, sectionName) => {
    if (!sectionName.trim()) return;

    try {
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          sectionName: sectionName.trim(),
          subsections: []
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSectionsMap(data.sections);
        setNewSectionName('');
        alert('Sección añadida exitosamente');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error añadiendo sección:', error);
      alert('Error al añadir sección');
    }
  };

  const handleDeleteSection = async (category, sectionName) => {
    if (!confirm(`¿Estás seguro de eliminar la sección "${sectionName}"?`)) return;

    try {
      const response = await fetch(`/api/sections/delete?category=${encodeURIComponent(category)}&sectionName=${encodeURIComponent(sectionName)}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSectionsMap(data.sections);
        alert('Sección eliminada exitosamente');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error eliminando sección:', error);
      alert('Error al eliminar sección');
    }
  };

  const handleReorderSection = async (category, sectionIndex, direction) => {
    const sections = [...(sectionsMap[category] || [])];
    
    if (direction === 'up' && sectionIndex > 0) {
      [sections[sectionIndex - 1], sections[sectionIndex]] = [sections[sectionIndex], sections[sectionIndex - 1]];
    } else if (direction === 'down' && sectionIndex < sections.length - 1) {
      [sections[sectionIndex], sections[sectionIndex + 1]] = [sections[sectionIndex + 1], sections[sectionIndex]];
    } else {
      return; // No se puede mover
    }

    try {
      const response = await fetch('/api/sections/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          sections
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSectionsMap(data.sections);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error reordenando sección:', error);
      alert('Error al reordenar sección');
    }
  };

  const handleAddSubsection = async (category, sectionName, subsectionName) => {
    if (!subsectionName.trim()) return;

    try {
      const response = await fetch('/api/sections/subsections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          sectionName,
          subsectionName: subsectionName.trim(),
          action: 'add'
        }),
      });

      const data = await response.json();

      if (data.success) {
        await loadSections(); // Recargar desde servidor
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error añadiendo subsección:', error);
      alert('Error al añadir subsección');
    }
  };

  const handleDeleteSubsection = async (category, sectionName, subsectionName) => {
    if (!confirm(`¿Estás seguro de eliminar la subsección "${subsectionName}"?`)) return;

    try {
      const response = await fetch('/api/sections/subsections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          sectionName,
          subsectionName,
          action: 'remove'
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Recargar desde el servidor en lugar de usar los datos devueltos
        await loadSections();
        alert('Subsección eliminada exitosamente');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error eliminando subsección:', error);
      alert('Error al eliminar subsección');
    }
  };

  const handleRenameSection = async (category, originalName, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    try {
      const response = await fetch('/api/sections/rename', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          type: 'section',
          oldName: originalName,
          newName: trimmed,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await loadSections();
        await loadContents();
        setSectionRenameTarget(null);
        setSectionRenameValue('');
        alert('Sección renombrada correctamente');
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error renombrando sección:', error);
      alert('Error al renombrar la sección');
    }
  };

  const handleRenameSubsection = async (category, sectionName, originalName, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    try {
      const response = await fetch('/api/sections/rename', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          type: 'subsection',
          oldName: originalName,
          newName: trimmed,
          parentSection: sectionName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await loadSections();
        await loadContents();
        setSubsectionRenameTarget(null);
        setSubsectionRenameValue('');
        alert('Subsección renombrada correctamente');
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error renombrando subsección:', error);
      alert('Error al renombrar la subsección');
    }
  };

  const handleReorderSubsection = async (category, sectionName, index, direction) => {
    const section = (sectionsMap[category] || []).find((item) => {
      const name = typeof item === 'string' ? item : item.name;
      return name === sectionName;
    });

    if (!section || !Array.isArray(section.subsections)) return;

    const subsections = [...section.subsections];

    if (direction === 'up' && index > 0) {
      [subsections[index - 1], subsections[index]] = [subsections[index], subsections[index - 1]];
    } else if (direction === 'down' && index < subsections.length - 1) {
      [subsections[index], subsections[index + 1]] = [subsections[index + 1], subsections[index]];
    } else {
      return;
    }

    const movedSubsection =
      direction === 'up'
        ? subsections[index - 1]
        : subsections[index + 1];

    setSectionsMap((prev) => {
      const categorySections = prev[category];
      if (!categorySections) return prev;

      const updatedCategory = categorySections.map((sec) => {
        const secName = typeof sec === 'string' ? sec : sec.name;
        if (secName !== sectionName) return sec;

        if (typeof sec === 'string') {
          return {
            name: sec,
            order: 0,
            subsections,
          };
        }

        return {
          ...sec,
          subsections,
        };
      });

      return {
        ...prev,
        [category]: updatedCategory,
      };
    });

    try {
      const response = await fetch('/api/sections/subsections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          sectionName,
          action: 'reorder',
          newOrder: subsections,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (movedSubsection) {
          await syncSubsectionContentOrder(category, sectionName, movedSubsection, direction);
        }

        await loadSections();
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error reordenando subsecciones:', error);
      alert('Error al reordenar subsecciones');
    }
  };

  const getOrderedSectionContents = (normalizedCategory, sectionName) => {
    return contents
      .filter((item) => (item.category || 'Aprendizaje Libre') === normalizedCategory && item.section === sectionName)
      .sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
        const orderB = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  };

  const handleReorderContent = async (category, sectionName, contentId, direction) => {
    const normalizedCategory = category || 'Aprendizaje Libre';
    
    // Obtener TODOS los items de la sección (con y sin subsección)
    const sectionItems = getOrderedSectionContents(normalizedCategory, sectionName);

    const currentIndex = sectionItems.findIndex((item) => item.id === contentId);

    if (currentIndex === -1) {
      console.error('❌ No se encontró el contenido con ID:', contentId);
      return;
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= sectionItems.length) {
      console.warn('⚠️ No se puede mover más:', { currentIndex, targetIndex, total: sectionItems.length });
      return;
    }

    // Intercambiar posiciones
    [sectionItems[currentIndex], sectionItems[targetIndex]] = [sectionItems[targetIndex], sectionItems[currentIndex]];

    try {
      const response = await fetch('/api/content/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: normalizedCategory,
          section: sectionName,
          orderedIds: sectionItems.map((item) => item.id),
        }),
      });

      const data = await response.json();

      if (data.success) {
        await loadContents();
      } else if (data.error) {
        console.error('❌ Error del servidor:', data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error('❌ Error reordenando contenido:', error);
      alert('Error al reordenar contenido');
    }
  };

  const buildSectionBlocks = (normalizedCategory, sectionName) => {
    const sectionItems = getOrderedSectionContents(normalizedCategory, sectionName);
    const blocks = [];
    let currentBlock = null;

    sectionItems.forEach((item) => {
      if (item.subsection) {
        if (!currentBlock || currentBlock.type !== 'subsection' || currentBlock.name !== item.subsection) {
          currentBlock = {
            type: 'subsection',
            name: item.subsection,
            items: [],
          };
          blocks.push(currentBlock);
        }
        currentBlock.items.push(item);
      } else {
        currentBlock = null;
        blocks.push({ type: 'content', item });
      }
    });

    const sectionDefinition = (sectionsMap[normalizedCategory] || []).find((entry) => {
      const name = typeof entry === 'string' ? entry : entry.name;
      return name === sectionName;
    });

    if (sectionDefinition && Array.isArray(sectionDefinition.subsections)) {
      const existing = new Set(blocks.filter((block) => block.type === 'subsection').map((block) => block.name));
      sectionDefinition.subsections.forEach((subName) => {
        if (!existing.has(subName)) {
          blocks.push({
            type: 'subsection',
            name: subName,
            items: [],
            isEmpty: true,
          });
        }
      });
    }

    return blocks;
  };

  const getReorderableBlocks = (normalizedCategory, sectionName) =>
    buildSectionBlocks(normalizedCategory, sectionName).filter(
      (block) => block.type === 'content' || block.items.length > 0
    );

  const syncSubsectionContentOrder = async (category, sectionName, subsectionName, direction) => {
    const normalizedCategory = category || 'Aprendizaje Libre';
    const blocks = getReorderableBlocks(normalizedCategory, sectionName);
    const blockIndex = blocks.findIndex(
      (block) => block.type === 'subsection' && block.name === subsectionName
    );

    if (blockIndex === -1) {
      return;
    }

    await handleReorderBlock(category, sectionName, blockIndex, direction);
  };

  const handleReorderBlock = async (category, sectionName, blockIndex, direction) => {
    const normalizedCategory = category || 'Aprendizaje Libre';
    const blocks = getReorderableBlocks(normalizedCategory, sectionName);

    if (blocks.length === 0) return;
    if (blockIndex < 0 || blockIndex >= blocks.length) {
      return;
    }

    const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;

    if (targetIndex < 0 || targetIndex >= blocks.length) {
      return;
    }

    const newBlocks = [...blocks];
    const [movingBlock] = newBlocks.splice(blockIndex, 1);
    newBlocks.splice(targetIndex, 0, movingBlock);

    const orderedIds = newBlocks.flatMap((block) =>
      block.type === 'content' ? [block.item.id] : block.items.map((item) => item.id)
    );

    try {
      const response = await fetch('/api/content/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: normalizedCategory,
          section: sectionName,
          orderedIds,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await loadContents();
      } else if (data.error) {
        console.error('❌ Error reordenando bloques:', data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error('❌ Error reordenando bloques:', error);
      alert('Error al reordenar bloques');
    }
  };

  const handleRenameContent = async (contentId, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    const targetContent = contents.find((item) => item.id === contentId);
    if (!targetContent) return;

    try {
      const response = await fetch(`/api/content/update?id=${contentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: targetContent.section,
          title: trimmed,
          content: targetContent.content,
          category: targetContent.category,
          order: typeof targetContent.order === 'number' ? targetContent.order : 0,
          subsection: targetContent.subsection ?? undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await loadContents();
        setContentRenameTarget(null);
        setContentRenameValue('');
        alert('Contenido renombrado correctamente');
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error renombrando contenido:', error);
      alert('Error al renombrar contenido');
    }
  };

  const groupedContents = contents.reduce((acc, item) => {
    const categoryKey = item.category || 'Aprendizaje Libre';
    const sectionKey = item.section || 'Sin sección';

    if (!acc[categoryKey]) {
      acc[categoryKey] = {};
    }

    if (!acc[categoryKey][sectionKey]) {
      acc[categoryKey][sectionKey] = [];
    }

    acc[categoryKey][sectionKey].push(item);
    return acc;
  }, {});

  const orderedCategories = [
    ...categories.filter((category) => groupedContents[category]),
    ...Object.keys(groupedContents).filter((category) => !categories.includes(category)),
  ];

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="border-b border-black/5 dark:border-pure-white/5">
        <div className="flex space-x-8">
          <button
            onClick={() => {
              setActiveTab('content');
              setIsCreating(false);
              setIsEditing(false);
            }}
            className={`pb-3 px-1 font-light transition-colors bg-transparent ${
              activeTab === 'content'
                ? 'text-red-500 dark:text-red-400 border-b-2 border-red-500 dark:border-red-400'
                : 'text-black/60 dark:text-pure-white/60 hover:text-black dark:hover:text-pure-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" strokeWidth={1.5} />
              <span>Contenidos</span>
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('meetings');
              setIsCreating(false);
              setIsEditing(false);
            }}
            className={`pb-3 px-1 font-light transition-colors bg-transparent ${
              activeTab === 'meetings'
                ? 'text-red-500 dark:text-red-400 border-b-2 border-red-500 dark:border-red-400'
                : 'text-black/60 dark:text-pure-white/60 hover:text-black dark:hover:text-pure-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" strokeWidth={1.5} />
              <span>Reuniones</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-light text-black dark:text-pure-white mb-1">
            {activeTab === 'content' ? 'Gestor de Contenidos' : 'Gestor de Reuniones'}
          </h2>
          <p className="text-sm font-light text-black/60 dark:text-pure-white/60">
            {activeTab === 'content' ? 'Crear y administrar contenido educativo' : 'Gestionar reuniones y eventos'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Botón de gestionar secciones */}
          {activeTab === 'content' && !isCreating && (
            <button
              onClick={() => setIsAddingSection(!isAddingSection)}
              className="flex items-center space-x-2 px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400"
            >
              {isAddingSection ? (
                <>
                  <X className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-sm">Cerrar</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-sm">Gestionar Secciones</span>
                </>
              )}
            </button>
          )}
          {/* Botón de subir archivo .md - Solo cuando está creando o en gestión de secciones */}
          {(isCreating || isAddingSection) && (
            <label className="flex items-center space-x-2 px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer">
              <Upload className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-sm">Subir .md</span>
              <input
                type="file"
              accept=".md"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          )}

          {/* Botón nuevo contenido/reunión */}
          {!isAddingSection && (
            <button
              onClick={() => {
                setIsCreating(!isCreating);
              if (isCreating) {
                setIsEditing(false);
                setEditingId(null);
              }
            }}
            className="flex items-center space-x-2 px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400"
          >
            {isCreating ? (
              <>
                <X className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">Cancelar</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">{activeTab === 'content' ? 'Nuevo Contenido' : 'Nueva Reunión'}</span>
              </>
            )}
          </button>
          )}
        </div>
      </div>

      {/* Panel de gestión de secciones */}
      {isAddingSection && activeTab === 'content' && (
        <div key={renderKey} className="mt-6 p-6 border border-black/10 dark:border-pure-white/10 bg-pure-white/50 dark:bg-pure-black/50">
          <h3 className="text-lg font-light text-black dark:text-pure-white mb-4">
            Gestionar Secciones
          </h3>
          <p className="text-sm font-light text-black/60 dark:text-pure-white/60 mb-6">
            Las secciones son categorías que organizan el contenido. Puedes crear nuevas secciones para cada tipo de aprendizaje.
          </p>
          
          {/* Secciones por categoría */}
          {categories.map((category) => (
            <div key={category} className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-light text-black dark:text-pure-white">
                  {category}
                </h4>
              </div>
              <div className="space-y-2">
                {sectionsMap[category]?.map((section, index) => {
                  // Soporte para estructura vieja (array de strings) y nueva (array de objetos)
                  const sectionName = typeof section === 'string' ? section : section?.name;
                  const subsections = Array.isArray(section?.subsections) ? section.subsections : [];
                  
                  const descKey = `${category}:${sectionName}`;
                  const isEditingThisDesc = editingDescription?.category === category && editingDescription?.section === sectionName;
                  const isAddingSubsection = addingSubsectionFor?.category === category && addingSubsectionFor?.section === sectionName;
                  
                  return (
                    <div key={sectionName} className="border border-black/10 dark:border-pure-white/10">
                      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-transparent">
                        {sectionRenameTarget?.category === category && sectionRenameTarget?.originalName === sectionName ? (
                          <div className="flex flex-1 flex-wrap items-center gap-2">
                            <input
                              value={sectionRenameValue}
                              onChange={(e) => setSectionRenameValue(e.target.value)}
                              className="flex-1 min-w-[180px] px-3 py-1.5 border border-black/10 dark:border-pure-white/10 bg-transparent text-sm font-light text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400"
                              placeholder="Nuevo nombre de la sección"
                            />
                            <button
                              onClick={() => handleRenameSection(category, sectionName, sectionRenameValue)}
                              className="flex items-center space-x-1 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                            >
                              <Save className="h-3 w-3" strokeWidth={1.5} />
                              <span>Guardar</span>
                            </button>
                            <button
                              onClick={() => {
                                setSectionRenameTarget(null);
                                setSectionRenameValue('');
                              }}
                              className="flex items-center space-x-1 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                            >
                              <X className="h-3 w-3" strokeWidth={1.5} />
                              <span>Cancelar</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm font-light text-black dark:text-pure-white">
                            {sectionName}
                          </span>
                        )}
                        <div className="flex items-center space-x-2">
                          {/* Botones de reordenamiento */}
                          <button
                            onClick={() => handleReorderSection(category, index, 'up')}
                            disabled={index === 0}
                            className={`p-1 bg-transparent transition-colors ${
                              index === 0 
                                ? 'text-black/20 dark:text-pure-white/20 cursor-not-allowed' 
                                : 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                            }`}
                            title="Mover arriba"
                          >
                            <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleReorderSection(category, index, 'down')}
                            disabled={index === sectionsMap[category].length - 1}
                            className={`p-1 bg-transparent transition-colors ${
                              index === sectionsMap[category].length - 1
                                ? 'text-black/20 dark:text-pure-white/20 cursor-not-allowed' 
                                : 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                            }`}
                            title="Mover abajo"
                          >
                            <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                          {/* Botón renombrar sección */}
                          <button
                            onClick={() => {
                              setSectionRenameTarget({ category, originalName: sectionName });
                              setSectionRenameValue(sectionName);
                              setSubsectionRenameTarget(null);
                              setSubsectionRenameValue('');
                              setContentRenameTarget(null);
                              setContentRenameValue('');
                            }}
                            className="p-1 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            title="Renombrar sección"
                          >
                            <Pencil className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                          {/* Botón de añadir subsección */}
                          <button
                            onClick={() => setAddingSubsectionFor({ category, section: sectionName })}
                            className="p-1 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            title="Añadir subsección"
                          >
                            <Plus className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                          {/* Botón editar descripción */}
                          <button
                            onClick={() => {
                              setEditingDescription({ category, section: sectionName });
                              setDescriptionText(sectionDescriptions[descKey] || '');
                            }}
                            className="p-1 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            title="Editar descripción"
                          >
                            <Edit className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                          {/* Botón eliminar */}
                          <button
                            onClick={() => handleDeleteSection(category, sectionName)}
                            className="p-1 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            title="Eliminar sección"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Subsecciones - Siempre mostrar el panel para debug */}
                      <div className="px-6 py-2 border-t border-black/10 dark:border-pure-white/10 bg-pure-white/20 dark:bg-pure-black/20">
                        <p className="text-xs font-light text-black/60 dark:text-pure-white/60 mb-2">
                          Subsecciones ({subsections.length}):
                        </p>
                        {subsections.length > 0 ? (
                          <div className="space-y-1">
                            {subsections.map((subsection, subIndex) => {
                              const isRenamingSubsection =
                                subsectionRenameTarget?.category === category &&
                                subsectionRenameTarget?.section === sectionName &&
                                subsectionRenameTarget?.originalName === subsection;

                              return (
                                <div key={subsection} className="flex flex-wrap items-center justify-between gap-2 py-1">
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() => handleReorderSubsection(category, sectionName, subIndex, 'up')}
                                      disabled={subIndex === 0}
                                      className={`p-1 bg-transparent transition-colors ${
                                        subIndex === 0
                                          ? 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                          : 'text-black/60 dark:text-pure-white/60 hover:text-red-500 dark:hover:text-red-400'
                                      }`}
                                      title="Mover arriba"
                                    >
                                      <ChevronUp className="h-3 w-3" strokeWidth={1.5} />
                                    </button>
                                    <button
                                      onClick={() => handleReorderSubsection(category, sectionName, subIndex, 'down')}
                                      disabled={subIndex === subsections.length - 1}
                                      className={`p-1 bg-transparent transition-colors ${
                                        subIndex === subsections.length - 1
                                          ? 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                          : 'text-black/60 dark:text-pure-white/60 hover:text-red-500 dark:hover:text-red-400'
                                      }`}
                                      title="Mover abajo"
                                    >
                                      <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
                                    </button>
                                  </div>
                                  <div className="flex-1 min-w-[140px]">
                                    {isRenamingSubsection ? (
                                      <div className="flex items-center space-x-2">
                                        <input
                                          value={subsectionRenameValue}
                                          onChange={(e) => setSubsectionRenameValue(e.target.value)}
                                          className="flex-1 px-3 py-1 border border-black/10 dark:border-pure-white/10 bg-transparent text-xs font-light text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400"
                                          placeholder="Nuevo nombre"
                                        />
                                        <button
                                          onClick={() => handleRenameSubsection(category, sectionName, subsection, subsectionRenameValue)}
                                          className="px-2 py-1 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                                        >
                                          Guardar
                                        </button>
                                        <button
                                          onClick={() => {
                                            setSubsectionRenameTarget(null);
                                            setSubsectionRenameValue('');
                                          }}
                                          className="px-2 py-1 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                                        >
                                          Cancelar
                                        </button>
                                      </div>
                                    ) : (
                                      <span className="text-xs font-light text-black dark:text-pure-white pl-1">
                                        • {subsection}
                                      </span>
                                    )}
                                  </div>
                                  {!isRenamingSubsection && (
                                    <div className="flex items-center space-x-1">
                                      <button
                                        onClick={() => {
                                          setSubsectionRenameTarget({ category, section: sectionName, originalName: subsection });
                                          setSubsectionRenameValue(subsection);
                                          setContentRenameTarget(null);
                                          setContentRenameValue('');
                                        }}
                                        className="p-1 bg-transparent text-black/60 dark:text-pure-white/60 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                        title="Renombrar subsección"
                                      >
                                        <Pencil className="h-3 w-3" strokeWidth={1.5} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteSubsection(category, sectionName, subsection)}
                                        className="p-1 bg-transparent text-black/60 dark:text-pure-white/60 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                        title="Eliminar subsección"
                                      >
                                        <X className="h-3 w-3" strokeWidth={1.5} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs italic text-black/40 dark:text-pure-white/40">
                            No hay subsecciones aún. Haz clic en el botón + para añadir una.
                          </p>
                        )}
                      </div>
                      
                      {/* Form para añadir subsección */}
                      {isAddingSubsection && (
                        <div className="p-3 border-t border-black/10 dark:border-pure-white/10 bg-pure-white/30 dark:bg-pure-black/30">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={newSubsectionName}
                              onChange={(e) => setNewSubsectionName(e.target.value)}
                              onKeyPress={async (e) => {
                                if (e.key === 'Enter' && newSubsectionName.trim()) {
                                  await handleAddSubsection(category, sectionName, newSubsectionName);
                                  setNewSubsectionName('');
                                  setAddingSubsectionFor(null);
                                }
                              }}
                              className="flex-1 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light text-xs"
                              placeholder="Nombre de la subsección"
                              autoFocus
                            />
                            <button
                              onClick={async () => {
                                if (newSubsectionName.trim()) {
                                  await handleAddSubsection(category, sectionName, newSubsectionName);
                                  setNewSubsectionName('');
                                  setAddingSubsectionFor(null);
                                }
                              }}
                              className="px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light text-xs"
                            >
                              Añadir
                            </button>
                            <button
                              onClick={() => {
                                setAddingSubsectionFor(null);
                                setNewSubsectionName('');
                              }}
                              className="px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light text-xs"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Editor de descripción */}
                      {isEditingThisDesc && (
                        <div className="p-3 border-t border-black/10 dark:border-pure-white/10 bg-pure-white/30 dark:bg-pure-black/30">
                          <label className="block text-xs font-light text-black dark:text-pure-white mb-2">
                            Descripción de la sección (Markdown soportado)
                          </label>
                          <textarea
                            value={descriptionText}
                            onChange={(e) => setDescriptionText(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light text-sm"
                            placeholder="Escribe una breve descripción de esta sección..."
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => {
                                setEditingDescription(null);
                                setDescriptionText('');
                              }}
                              className="px-3 py-1 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light text-xs"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleSaveDescription(category, sectionName)}
                              className="flex items-center space-x-1 px-3 py-1 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light text-xs"
                            >
                              <Save className="h-3 w-3" strokeWidth={1.5} />
                              <span>Guardar</span>
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Mostrar descripción existente si no está editando */}
                      {!isEditingThisDesc && sectionDescriptions[descKey] && (
                        <div className="p-3 border-t border-black/10 dark:border-pure-white/10 bg-pure-white/10 dark:bg-pure-black/10">
                          <p className="text-xs font-light text-black/70 dark:text-pure-white/70">
                            {sectionDescriptions[descKey]}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Form para añadir nueva sección a esta categoría */}
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newSectionName.trim()) {
                        handleAddSection(category, newSectionName);
                      }
                    }}
                    className="flex-1 px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                    placeholder={`Nueva sección para ${category}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSection(category, newSectionName)}
                    className="flex items-center space-x-1 px-3 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                    <span className="text-sm">Añadir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-10 p-4 border border-black/10 dark:border-pure-white/10 bg-pure-white/40 dark:bg-pure-black/40">
            <h4 className="text-sm font-light text-black dark:text-pure-white mb-3">
              Resumen de subsecciones
            </h4>
            {(() => {
              const summary = categories
                .map((category) => {
                  const sections = sectionsMap[category] || [];
                  const detail = sections
                    .map((section) => {
                      const sectionName = typeof section === 'string' ? section : section?.name;
                      const subsections = Array.isArray(section?.subsections) ? section.subsections : [];
                      return { sectionName, subsections };
                    })
                    .filter((entry) => entry.subsections.length > 0);

                  return { category, detail };
                })
                .filter((entry) => entry.detail.length > 0);

              if (summary.length === 0) {
                return (
                  <p className="text-xs font-light text-black/50 dark:text-pure-white/50">
                    Aún no hay subsecciones creadas. Cuando añadas la primera aparecerá aquí.
                  </p>
                );
              }

              return summary.map(({ category, detail }) => (
                <div key={category} className="mb-3 last:mb-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-pure-white/60">
                    {category}
                  </p>
                  <ul className="mt-1 space-y-1">
                    {detail.map(({ sectionName, subsections }) => (
                      <li key={sectionName} className="text-xs font-light text-black/70 dark:text-pure-white/70">
                        <span className="font-medium text-black/80 dark:text-pure-white/80">{sectionName}:</span>{' '}
                        {subsections.join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Formulario de contenidos */}
      {isCreating && activeTab === 'content' && (
        <form onSubmit={handleSubmit} className="space-y-6 py-6 border-t border-black/5 dark:border-pure-white/5">
          <div className="flex justify-end space-x-3 mb-4">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light text-sm"
            >
              <Eye className="h-4 w-4" strokeWidth={1.5} />
              <span>{isPreview ? 'Editar' : 'Previsualizar'}</span>
            </button>
          </div>

          {!isPreview ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                Categoría Principal
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const newCategory = e.target.value;
                  const newSections = sectionsMap[newCategory];
                  setFormData({ 
                    ...formData, 
                    category: newCategory,
                    section: newSections[0]?.name || newSections[0], // Seleccionar la primera sección disponible
                    subsection: '' // Resetear subsección
                  });
                }}
                className="w-full px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-pure-white dark:bg-pure-black text-black dark:text-pure-white focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-pure-white dark:bg-pure-black">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                Sección
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value, subsection: '' })}
                className="w-full px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-pure-white dark:bg-pure-black text-black dark:text-pure-white focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                required
              >
                {/* Opción especial de Introducción solo para Aprendizaje Libre */}
                {formData.category === 'Aprendizaje Libre' && (
                  <option value="Introducción" className="bg-pure-white dark:bg-pure-black">
                    Introducción
                  </option>
                )}
                {getAvailableSections().map((section) => (
                  <option key={section} value={section} className="bg-pure-white dark:bg-pure-black">
                    {section}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Subsección (opcional) */}
            {formData.section !== 'Introducción' && (() => {
              const currentCategorySections = sectionsMap[formData.category] || [];
              const currentSection = currentCategorySections.find(s => s.name === formData.section);
              const subsections = currentSection?.subsections || [];
              
              return subsections.length > 0 ? (
                <div className="space-y-3">
                  <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                    Subsección (Opcional)
                  </label>
                  <select
                    value={formData.subsection || ''}
                    onChange={(e) => setFormData({ ...formData, subsection: e.target.value })}
                    className="w-full px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-pure-white dark:bg-pure-black text-black dark:text-pure-white focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                  >
                    <option value="" className="bg-pure-white dark:bg-pure-black">
                      -- Sin subsección --
                    </option>
                    {subsections.map((subsection, idx) => (
                      <option key={idx} value={subsection} className="bg-pure-white dark:bg-pure-black">
                        {subsection}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null;
            })()}
          </div>

          {/* Mensaje informativo para la sección Introducción */}
          {formData.section === 'Introducción' && (
            <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg">
              <p className="text-sm font-light text-black dark:text-pure-white">
                <strong>Introducción de /Aprende:</strong> Este contenido se mostrará cuando los usuarios seleccionen "Aprendizaje Libre" &gt; "Introducción" en la página /aprende.
              </p>
            </div>
          )}

          {/* Solo mostrar controles extra si NO es la sección Introducción */}
          {formData.section !== 'Introducción' && (
            <>
              <div>
                <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                  placeholder="Título del contenido"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                  PDF adjunto (opcional)
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="inline-flex items-center space-x-2 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-xs text-black dark:text-pure-white bg-transparent font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer w-fit">
                    <Upload className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span>{uploadingPdf ? 'Procesando...' : formData.pdfAttachment ? 'Cambiar PDF' : 'Adjuntar PDF'}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      className="hidden"
                    />
                  </label>

                  {formData.pdfAttachment && (
                    <div className="sm:ml-4 flex-1 border border-black/10 dark:border-pure-white/10 bg-black/5 dark:bg-pure-white/10 px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-black/60 dark:text-pure-white/70" strokeWidth={1.5} />
                        <div>
                          <p className="text-sm font-light text-black dark:text-pure-white">
                            {formData.pdfAttachment.name}
                          </p>
                          {formData.pdfAttachment.size ? (
                            <p className="text-xs text-black/50 dark:text-pure-white/60">
                              {Math.max(formData.pdfAttachment.size / (1024 * 1024), 0.01).toFixed(2)} MB
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePdf}
                        className="flex items-center space-x-1 bg-transparent text-xs font-light text-black/70 dark:text-pure-white/70 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="h-3 w-3" strokeWidth={1.5} />
                        <span>Quitar</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-light text-black dark:text-pure-white">
                Contenido
              </label>
              <label className="flex items-center space-x-2 px-3 py-1 border border-black/10 dark:border-pure-white/10 text-xs text-black dark:text-pure-white bg-transparent font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer">
                <Upload className="h-3 w-3" strokeWidth={1.5} />
                <span>{uploadingPhoto ? 'Subiendo...' : 'Añadir Foto'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, 'content')}
                  disabled={uploadingPhoto}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="w-full px-4 py-2 border border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-mono text-sm"
              placeholder="Contenido en Markdown o texto plano..."
              required
            />
          </div>
          </>
          ) : (
            <div className="border border-black/10 dark:border-pure-white/10 p-6">
              <h3 className="text-xl font-light text-black dark:text-pure-white mb-4">
                Previsualización
              </h3>
              <div className="mb-4 pb-4 border-b border-black/10 dark:border-pure-white/10">
                <h4 className="text-sm font-light text-black/60 dark:text-pure-white/60 mb-1">
                  {formData.section} {formData.category && `/ ${formData.category}`}
                </h4>
                <h2 className="text-2xl font-light text-black dark:text-pure-white">
                  {formData.title || 'Sin título'}
                </h2>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-light prose-p:font-light prose-li:font-light prose-code:font-mono">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                >
                  {formData.content || 'Sin contenido'}
                </ReactMarkdown>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setIsEditing(false);
                setEditingId(null);
              }}
              className="px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light"
            >
              <Save className="h-4 w-4" strokeWidth={1.5} />
              <span>{isEditing ? 'Actualizar' : 'Guardar'} Contenido</span>
            </button>
          </div>
        </form>
      )}

      {/* Formulario de reuniones */}
      {isCreating && activeTab === 'meetings' && (
        <form onSubmit={handleMeetingSubmit} className="space-y-6 py-6 border-t border-black/5 dark:border-pure-white/5">
          <div className="flex justify-end space-x-3 mb-4">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light text-sm"
            >
              <Eye className="h-4 w-4" strokeWidth={1.5} />
              <span>{isPreview ? 'Editar' : 'Previsualizar'}</span>
            </button>
          </div>

          {!isPreview ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                    Título de la Reunión
                  </label>
                  <input
                    type="text"
                    value={meetingData.title}
                    onChange={(e) => setMeetingData({ ...meetingData, title: e.target.value })}
                    className="w-full px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                    placeholder="Ej: Reunión Semanal 01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={meetingData.date}
                    onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                    className="w-full px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-pure-white dark:bg-pure-black text-black dark:text-pure-white focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-black dark:text-pure-white mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={meetingData.slug}
                  onChange={(e) => setMeetingData({ ...meetingData, slug: e.target.value })}
                  className="w-full px-4 py-2 border-b border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-light"
                  placeholder="reunion-semanal-01"
                  required
                />
                <p className="text-xs text-black/40 dark:text-pure-white/40 mt-1 font-light">
                  La URL será: /reuniones/{meetingData.slug || 'slug'}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-light text-black dark:text-pure-white">
                    Contenido
                  </label>
                  <label className="flex items-center space-x-2 px-3 py-1 border border-black/10 dark:border-pure-white/10 text-xs text-black dark:text-pure-white bg-transparent font-light transition-all hover:border-red-500 dark:hover:border-red-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer">
                    <Upload className="h-3 w-3" strokeWidth={1.5} />
                    <span>{uploadingPhoto ? 'Subiendo...' : 'Añadir Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'meeting')}
                      disabled={uploadingPhoto}
                      className="hidden"
                    />
                  </label>
                </div>
                <textarea
                  value={meetingData.content}
                  onChange={(e) => setMeetingData({ ...meetingData, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 border border-black/10 dark:border-pure-white/10 bg-transparent text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400 font-mono text-sm"
                  placeholder="Contenido de la reunión en Markdown..."
                  required
                />
                {meetingData.photos && meetingData.photos.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-black/10 dark:border-pure-white/10">
                    <p className="text-xs font-light text-black/60 dark:text-pure-white/60 mb-2">
                      Fotos añadidas: {meetingData.photos.length}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {meetingData.photos.map((photo, idx) => (
                        <img
                          key={idx}
                          src={photo}
                          alt={`Foto ${idx + 1}`}
                          className="h-16 w-16 object-cover border border-black/10 dark:border-pure-white/10"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="border border-black/10 dark:border-pure-white/10 p-6">
              <h3 className="text-xl font-light text-black dark:text-pure-white mb-4">
                Previsualización de Reunión
              </h3>
              <div className="mb-4 pb-4 border-b border-black/10 dark:border-pure-white/10">
                <h2 className="text-2xl font-light text-black dark:text-pure-white mb-1">
                  {meetingData.title || 'Sin título'}
                </h2>
                <p className="text-sm font-light text-black/60 dark:text-pure-white/60">
                  {meetingData.date || 'Sin fecha'}
                </p>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-light prose-p:font-light prose-li:font-light prose-code:font-mono">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                >
                  {meetingData.content || 'Sin contenido'}
                </ReactMarkdown>
              </div>
              {meetingData.photos && meetingData.photos.length > 0 && (
                <div className="mt-6 pt-6 border-t border-black/10 dark:border-pure-white/10">
                  <h4 className="text-sm font-light text-black/60 dark:text-pure-white/60 mb-3">
                    Galería de Fotos
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {meetingData.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={photo}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-32 object-cover border border-black/10 dark:border-pure-white/10"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 border border-black/10 dark:border-pure-white/10 text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors font-light"
            >
              <Save className="h-4 w-4" strokeWidth={1.5} />
              <span>Guardar Reunión</span>
            </button>
          </div>
        </form>
      )}

      {/* Lista de contenidos */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {contents.length === 0 ? (
            <div className="text-center py-12 border-t border-black/5 dark:border-pure-white/5">
              <p className="text-black/60 dark:text-pure-white/60 font-light">
                No hay contenidos creados aún. Haz click en "Nuevo Contenido" para empezar.
              </p>
            </div>
          ) : (
            orderedCategories.map((category) => {
              const sectionsForCategory = groupedContents[category] || {};
              const totalInCategory = Object.values(sectionsForCategory).reduce(
                (acc, items) => acc + items.length,
                0
              );

              return (
                <div key={category} className="space-y-4 border-t border-black/5 dark:border-pure-white/5 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-light text-black dark:text-pure-white">
                      {category}
                    </h3>
                    <span className="text-xs font-light text-black/50 dark:text-pure-white/50">
                      {totalInCategory} {totalInCategory === 1 ? 'contenido' : 'contenidos'}
                    </span>
                  </div>

                  {Object.entries(sectionsForCategory).map(([sectionName]) => {
                    const normalizedCategory = category || 'Aprendizaje Libre';
                    const sectionItems = getOrderedSectionContents(normalizedCategory, sectionName);
                    const blocks = buildSectionBlocks(normalizedCategory, sectionName);
                    const reorderableBlocks = blocks.filter(
                      (block) => block.type === 'content' || block.items.length > 0
                    );

                    return (
                      <div
                        key={`${category}-${sectionName}`}
                        className="border border-black/10 dark:border-pure-white/10"
                      >
                        <div className="flex items-center justify-between px-4 py-3 bg-black/5 dark:bg-pure-black/40">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-light text-black dark:text-pure-white">
                              {sectionName}
                            </span>
                            <span className="px-2 py-0.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black/60 dark:text-pure-white/60">
                              {sectionItems.length} {sectionItems.length === 1 ? 'entrada' : 'entradas'}
                            </span>
                          </div>
                        </div>
                        <div className="divide-y divide-black/5 dark:divide-pure-white/5">
                          {blocks.length === 0 ? (
                            <div className="px-4 py-4 text-sm font-light text-black/50 dark:text-pure-white/50">
                              No hay contenidos ni subsecciones con entradas en esta sección.
                            </div>
                          ) : (
                            blocks.map((block) => {
                              const blockKey =
                                block.type === 'content' ? block.item.id : `sub-${block.name}`;
                              const blockPosition = reorderableBlocks.indexOf(block);
                              const canMoveBlockUp = blockPosition > 0;
                              const canMoveBlockDown =
                                blockPosition !== -1 && blockPosition < reorderableBlocks.length - 1;

                              if (block.type === 'content') {
                                const item = block.item;
                                const isRenamingContent = contentRenameTarget === item.id;
                                const itemIndex = sectionItems.findIndex(
                                  (sectionItem) => sectionItem.id === item.id
                                );
                                const displayOrder =
                                  typeof item.order === 'number'
                                    ? item.order + 1
                                    : itemIndex + 1;

                                return (
                                  <div
                                    key={blockKey}
                                    className="flex flex-wrap items-start justify-between gap-4 px-4 py-4 hover:bg-black/5 dark:hover:bg-pure-white/5 transition-colors"
                                  >
                                    <div className="flex-1 min-w-[240px]">
                                      <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black/60 dark:text-pure-white/60">
                                          Orden #{displayOrder}
                                        </span>
                                        {item.pdfAttachment?.url && (
                                          <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black/70 dark:text-pure-white/70">
                                            <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                                            <span>PDF</span>
                                          </span>
                                        )}
                                      </div>

                                      {isRenamingContent ? (
                                        <div className="space-y-2">
                                          <input
                                            value={contentRenameValue}
                                            onChange={(e) => setContentRenameValue(e.target.value)}
                                            className="w-full px-3 py-2 border border-black/10 dark:border-pure-white/10 bg-transparent text-sm font-light text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400"
                                            placeholder="Nuevo título del contenido"
                                          />
                                          <div className="flex items-center gap-2">
                                            <button
                                              onClick={() => handleRenameContent(item.id, contentRenameValue)}
                                              className="flex items-center space-x-1 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                                            >
                                              <Save className="h-3 w-3" strokeWidth={1.5} />
                                              <span>Guardar</span>
                                            </button>
                                            <button
                                              onClick={() => {
                                                setContentRenameTarget(null);
                                                setContentRenameValue('');
                                              }}
                                              className="flex items-center space-x-1 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                                            >
                                              <X className="h-3 w-3" strokeWidth={1.5} />
                                              <span>Cancelar</span>
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          <h4 className="text-lg font-light text-black dark:text-pure-white">
                                            {item.title}
                                          </h4>
                                          <p className="text-sm text-black/60 dark:text-pure-white/60 mt-1 line-clamp-2 font-light">
                                            {item.content}
                                          </p>
                                        </>
                                      )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={() =>
                                            handleReorderBlock(normalizedCategory, sectionName, blockPosition, 'up')
                                          }
                                          disabled={!canMoveBlockUp}
                                          className={`p-2 bg-transparent transition-colors ${
                                            canMoveBlockUp
                                              ? 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                                              : 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                          }`}
                                          title="Mover arriba"
                                        >
                                          <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleReorderBlock(normalizedCategory, sectionName, blockPosition, 'down')
                                          }
                                          disabled={!canMoveBlockDown}
                                          className={`p-2 bg-transparent transition-colors ${
                                            canMoveBlockDown
                                              ? 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                                              : 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                          }`}
                                          title="Mover abajo"
                                        >
                                          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                                        </button>
                                      </div>

                                      {isRenamingContent ? null : (
                                        <button
                                          onClick={() => {
                                            setContentRenameTarget(item.id);
                                            setContentRenameValue(item.title);
                                            setSectionRenameTarget(null);
                                            setSectionRenameValue('');
                                            setSubsectionRenameTarget(null);
                                            setSubsectionRenameValue('');
                                          }}
                                          className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                          title="Renombrar contenido"
                                        >
                                          <Pencil className="h-4 w-4" strokeWidth={1.5} />
                                        </button>
                                      )}

                                      <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                        title="Editar"
                                      >
                                        <Edit className="h-4 w-4" strokeWidth={1.5} />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                        title="Eliminar"
                                      >
                                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              }

                              if (block.type === 'subsection') {
                                const isReorderableBlock = blockPosition !== -1;
                                const canMoveHeaderUp = isReorderableBlock && blockPosition > 0;
                                const canMoveHeaderDown =
                                  isReorderableBlock && blockPosition < reorderableBlocks.length - 1;

                                return (
                                  <div key={blockKey} className="bg-black/5 dark:bg-pure-black/40">
                                    <div className="flex items-center justify-between px-4 py-3 bg-black/10 dark:bg-pure-black/50">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-light text-black dark:text-pure-white">
                                          Subsección: {block.name}
                                        </span>
                                        <span className="px-2 py-0.5 border border-red-500/20 text-red-500 text-xs font-light">
                                          {block.items.length}{' '}
                                          {block.items.length === 1 ? 'entrada' : 'entradas'}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={() =>
                                            handleReorderBlock(normalizedCategory, sectionName, blockPosition, 'up')
                                          }
                                          disabled={!canMoveHeaderUp}
                                          className={`p-2 bg-transparent transition-colors ${
                                            canMoveHeaderUp
                                              ? 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                                              : 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                          }`}
                                          title="Mover subsección arriba"
                                        >
                                          <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
                                        </button>
                                        <button
                                          onClick={() =>
                                            handleReorderBlock(normalizedCategory, sectionName, blockPosition, 'down')
                                          }
                                          disabled={!canMoveHeaderDown}
                                          className={`p-2 bg-transparent transition-colors ${
                                            canMoveHeaderDown
                                              ? 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                                              : 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                          }`}
                                          title="Mover subsección abajo"
                                        >
                                          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                                        </button>
                                      </div>
                                    </div>

                                    {block.items.length === 0 ? (
                                      <div className="px-4 py-4 text-xs font-light text-black/50 dark:text-pure-white/50">
                                        Aún no hay contenidos dentro de esta subsección.
                                      </div>
                                    ) : (
                                      block.items.map((item) => {
                                        const isRenamingContent = contentRenameTarget === item.id;
                                        const itemIndex = sectionItems.findIndex(
                                          (sectionItem) => sectionItem.id === item.id
                                        );
                                        const prevItem = sectionItems[itemIndex - 1];
                                        const nextItem = sectionItems[itemIndex + 1];
                                        const canMoveItemUp =
                                          !!prevItem && prevItem.subsection === item.subsection;
                                        const canMoveItemDown =
                                          !!nextItem && nextItem.subsection === item.subsection;
                                        const displayOrder =
                                          typeof item.order === 'number'
                                            ? item.order + 1
                                            : itemIndex + 1;

                                        return (
                                          <div
                                            key={item.id}
                                            className="flex flex-wrap items-start justify-between gap-4 px-6 py-4 border-t border-black/5 dark:border-pure-white/5"
                                          >
                                            <div className="flex-1 min-w-[220px]">
                                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 border border-red-500/20 text-red-500 text-xs font-light">
                                                  {item.subsection}
                                                </span>
                                                <span className="px-2 py-0.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black/60 dark:text-pure-white/60">
                                                  Orden #{displayOrder}
                                                </span>
                                                {item.pdfAttachment?.url && (
                                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black/70 dark:text-pure-white/70">
                                                    <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />
                                                    <span>PDF</span>
                                                  </span>
                                                )}
                                              </div>

                                              {isRenamingContent ? (
                                                <div className="space-y-2">
                                                  <input
                                                    value={contentRenameValue}
                                                    onChange={(e) => setContentRenameValue(e.target.value)}
                                                    className="w-full px-3 py-2 border border-black/10 dark:border-pure-white/10 bg-transparent text-sm font-light text-black dark:text-pure-white placeholder-black/40 dark:placeholder-pure-white/40 focus:outline-none focus:border-red-500 dark:focus:border-red-400"
                                                    placeholder="Nuevo título del contenido"
                                                  />
                                                  <div className="flex items-center gap-2">
                                                    <button
                                                      onClick={() => handleRenameContent(item.id, contentRenameValue)}
                                                      className="flex items-center space-x-1 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                                                    >
                                                      <Save className="h-3 w-3" strokeWidth={1.5} />
                                                      <span>Guardar</span>
                                                    </button>
                                                    <button
                                                      onClick={() => {
                                                        setContentRenameTarget(null);
                                                        setContentRenameValue('');
                                                      }}
                                                      className="flex items-center space-x-1 px-3 py-1.5 border border-black/10 dark:border-pure-white/10 text-xs font-light text-black dark:text-pure-white bg-transparent hover:border-red-500 dark:hover:border-red-400 transition-colors"
                                                    >
                                                      <X className="h-3 w-3" strokeWidth={1.5} />
                                                      <span>Cancelar</span>
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <>
                                                  <h4 className="text-lg font-light text-black dark:text-pure-white">
                                                    {item.title}
                                                  </h4>
                                                  <p className="text-sm text-black/60 dark:text-pure-white/60 mt-1 line-clamp-2 font-light">
                                                    {item.content}
                                                  </p>
                                                </>
                                              )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                              <div className="flex items-center gap-1">
                                                <button
                                                  onClick={() =>
                                                    handleReorderContent(normalizedCategory, sectionName, item.id, 'up')
                                                  }
                                                  disabled={!canMoveItemUp}
                                                  className={`p-2 bg-transparent transition-colors ${
                                                    canMoveItemUp
                                                      ? 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                                                      : 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                                  }`}
                                                  title="Mover dentro de la subsección"
                                                >
                                                  <ChevronUp className="h-4 w-4" strokeWidth={1.5} />
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    handleReorderContent(normalizedCategory, sectionName, item.id, 'down')
                                                  }
                                                  disabled={!canMoveItemDown}
                                                  className={`p-2 bg-transparent transition-colors ${
                                                    canMoveItemDown
                                                      ? 'text-black dark:text-pure-white hover:text-red-500 dark:hover:text-red-400'
                                                      : 'text-black/20 dark:text-pure-white/20 cursor-not-allowed'
                                                  }`}
                                                  title="Mover dentro de la subsección"
                                                >
                                                  <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                                                </button>
                                              </div>

                                              {isRenamingContent ? null : (
                                                <button
                                                  onClick={() => {
                                                    setContentRenameTarget(item.id);
                                                    setContentRenameValue(item.title);
                                                    setSectionRenameTarget(null);
                                                    setSectionRenameValue('');
                                                    setSubsectionRenameTarget(null);
                                                    setSubsectionRenameValue('');
                                                  }}
                                                  className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                  title="Renombrar contenido"
                                                >
                                                  <Pencil className="h-4 w-4" strokeWidth={1.5} />
                                                </button>
                                              )}

                                              <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                title="Editar"
                                              >
                                                <Edit className="h-4 w-4" strokeWidth={1.5} />
                                              </button>
                                              <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                title="Eliminar"
                                              >
                                                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      })
                                    )}
                                  </div>
                                );
                              }

                              return null;
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Lista de reuniones */}
      {activeTab === 'meetings' && (
        <div className="space-y-0">
          {meetings.length === 0 ? (
            <div className="text-center py-12 border-t border-black/5 dark:border-pure-white/5">
              <p className="text-black/60 dark:text-pure-white/60 font-light">
                No hay reuniones creadas aún. Haz click en "Nueva Reunión" para empezar.
              </p>
            </div>
          ) : (
            meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-6 border-t border-black/5 dark:border-pure-white/5 hover:border-red-500/20 dark:hover:border-red-400/20 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 border border-black/10 dark:border-pure-white/10 text-black/60 dark:text-pure-white/60 text-xs font-light">
                      {meeting.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-light text-black dark:text-pure-white">
                    {meeting.title}
                  </h3>
                  <p className="text-xs text-black/40 dark:text-pure-white/40 mt-1 font-light">
                    /reuniones/{meeting.slug}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEditMeeting(meeting)}
                    className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    className="p-2 text-black dark:text-pure-white bg-transparent hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
