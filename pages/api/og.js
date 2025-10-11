/**
 * API Endpoint para generación de imágenes Open Graph
 * 
 * Este endpoint genera imágenes dinámicas para redes sociales usando @vercel/og.
 * Las imágenes son de 1200x630px (formato estándar Open Graph) y se personalizan
 * con el título y descripción proporcionados como parámetros.
 * 
 * Propósito:
 * - Crear imágenes atractivas para compartir en redes sociales
 * - Mejorar el engagement y click-through rate
 * - Mantener branding consistente en todos los shares
 * 
 * Uso: GET /api/og?title=Título&description=Descripción&type=website
 * 
 * @returns {ImageResponse} Imagen PNG optimizada para Open Graph
 */
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Parámetros con valores por defecto
    const title = searchParams.get('title') || 'Club de Programación Competitiva UGR';
    const description = searchParams.get('description') || 'Aprende algoritmos y estructuras de datos';
    const type = searchParams.get('type') || 'website';

    // Fuente Inter (misma que usa el sitio) con manejo de errores
    let fontData;
    try {
      const fontResponse = await fetch(
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
      );
      if (fontResponse.ok) {
        fontData = await fontResponse.arrayBuffer();
      } else {
        console.warn('Error fetching font, using fallback');
        fontData = null;
      }
    } catch (error) {
      console.warn('Font fetch failed, using fallback:', error);
      fontData = null;
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
            padding: '60px 80px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Logo y branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#3b82f6',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              CPC
            </div>
            <div
              style={{
                color: '#888',
                fontSize: '24px',
                fontWeight: '600',
              }}
            >
              Universidad de Granada
            </div>
          </div>
          
          {/* Título principal */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              margin: '0 0 20px 0',
              maxWidth: '900px',
              lineHeight: '1.1',
            }}
          >
            {title}
          </h1>
          
          {/* Descripción */}
          <p
            style={{
              fontSize: '32px',
              color: '#ccc',
              textAlign: 'center',
              margin: '0 0 40px 0',
              maxWidth: '700px',
              lineHeight: '1.4',
              fontWeight: '400',
            }}
          >
            {description}
          </p>
          
          {/* Footer con URL y tipo */}
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <span
              style={{
                color: '#666',
                fontSize: '22px',
                fontWeight: '400',
              }}
            >
              cpcugr.vercel.app • {type}
            </span>
          </div>
          
          {/* Elemento decorativo */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              opacity: '0.3',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: fontData ? [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ] : [],
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}