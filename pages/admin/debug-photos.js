import { useState, useEffect } from 'react';

export default function DebugPhotos() {
  const [meetings, setMeetings] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const response = await fetch('/api/meetings');
      const data = await response.json();
      if (data.success) {
        setMeetings(data.data);
      }
    } catch (error) {
      console.error('Error cargando reuniones:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Base64 copiado al portapapeles');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Debug - Fotos en Base64</h1>
      
      {meetings.map((meeting) => (
        <div key={meeting.id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
          <h2>{meeting.title}</h2>
          <p><strong>Fecha:</strong> {meeting.date}</p>
          <p><strong>Total fotos:</strong> {meeting.photos?.length || 0}</p>
          
          {meeting.photos?.map((photo, index) => (
            <div key={index} style={{ marginTop: '15px', border: '1px dashed #999', padding: '10px' }}>
              <p><strong>Foto {index + 1}:</strong></p>
              
              {/* Mostrar la imagen */}
              <img 
                src={photo} 
                alt={`Foto ${index + 1}`}
                style={{ maxWidth: '300px', display: 'block', marginBottom: '10px' }}
              />
              
              {/* Mostrar info del base64 */}
              <p><strong>Tipo:</strong> {photo.substring(5, photo.indexOf(';'))}</p>
              <p><strong>Tamaño del string:</strong> {photo.length.toLocaleString()} caracteres</p>
              <p><strong>Tamaño aprox:</strong> {Math.round(photo.length * 0.75 / 1024)} KB</p>
              
              {/* Botones de acción */}
              <button 
                onClick={() => setSelectedPhoto(photo)}
                style={{ marginRight: '10px', padding: '5px 10px' }}
              >
                Ver completo
              </button>
              <button 
                onClick={() => copyToClipboard(photo)}
                style={{ padding: '5px 10px' }}
              >
                Copiar base64
              </button>
              
              {/* Mostrar preview del base64 */}
              <details style={{ marginTop: '10px' }}>
                <summary style={{ cursor: 'pointer', color: '#0066cc' }}>
                  Ver base64 (primeros 200 caracteres)
                </summary>
                <pre style={{ 
                  background: '#f5f5f5', 
                  padding: '10px', 
                  overflow: 'auto',
                  fontSize: '10px'
                }}>
                  {photo.substring(0, 200)}...
                </pre>
              </details>
            </div>
          ))}
        </div>
      ))}

      {/* Modal para ver foto completa */}
      {selectedPhoto && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div style={{ maxWidth: '90%', maxHeight: '90%', position: 'relative' }}>
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ✕ Cerrar
            </button>
            <img 
              src={selectedPhoto} 
              alt="Foto completa"
              style={{ maxWidth: '100%', maxHeight: '90vh' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
