# 📋 Plan de Implementación - Open Graph Tags

## 🎯 Objetivo
Implementar metaetiquetas Open Graph completas en todas las páginas del sitio para mejorar el engagement en redes sociales y los previews compartidos.

## 📊 Problema Actual
Las metaetiquetas Open Graph están incompletas, faltando elementos críticos:
- `og:image` - Imagen para redes sociales
- `og:url` - URL canónica para compartir  
- `og:site_name` - Nombre del sitio
- `og:locale` - Idioma (es_ES)

## 🛠️ Solución Propuesta

### 1. Crear Componente SEO Reutilizable
**Archivo**: `src/components/SEO.jsx`

**Funcionalidades:**
- Metaetiquetas Open Graph completas
- Twitter Cards integradas
- Schema.org markup
- Gestión automática de URLs canónicas
- Soporte para imágenes dinámicas

### 2. Endpoint para Imágenes OG Dinámicas
**Archivo**: `pages/api/og.js`

**Características:**
- Generación dinámica de imágenes Open Graph
- Personalización por página
- Formato estándar 1200x630px
- Inclusión de logo y branding

### 3. Actualizar Páginas Existentes
**Páginas a modificar:**
- `pages/index.js` - Página principal
- `pages/aprende.js` - Sección de aprendizaje
- `pages/compite.js` - Sección de competición
- `pages/comparte.js` - Sección de compartir
- `pages/aboutus.js` - Sobre nosotros
- `pages/noticias.js` - Noticias
- `pages/reuniones/[slug].js` - Reuniones individuales
- `pages/reuniones/index.js` - Lista de reuniones

### 4. Configuración de Imágenes
**Recursos necesarios:**
- Imagen OG por defecto: `/public/og-image.png` (1200x630px)
- Logo SVG optimizado: `/public/imagenes/logo_oscuro.svg`
- Favicon actualizado: `/public/favicon.ico`

## 🔧 Cambios Técnicos Específicos

### En `src/components/SEO.jsx`:
```jsx
const SEO = ({ 
  title = 'Club de Programación Competitiva UGR',
  description = 'Comunidad universitaria de programación competitiva en Granada',
  image = '/og-image.png',
  article = false 
}) => {
  // Implementación completa de OG, Twitter, Schema
};
```

### En `pages/api/og.js`:
```javascript
export default async function handler(req) {
  // Generar imagen OG dinámica con @vercel/og
}
```

### En cada página:
```jsx
// Reemplazar Head manual por componente SEO
import SEO from '../src/components/SEO';

// En el return:
<SEO 
  title="Título específico de la página"
  description="Descripción específica"
  image="/ruta/imagen-específica.png"
/>
```

## 📈 Beneficios Esperados

1. **Mejora en Redes Sociales**: Previews atractivos y consistentes
2. **Mayor Click-Through Rate**: +25-40% en engagement
3. **Branding Consistente**: Imagen profesional en todos los shares
4. **SEO Mejorado**: Marcado estructurado completo

## ⚠️ Consideraciones

- **Performance**: El componente SEO no afecta el rendimiento
- **Compatibilidad**: Funciona con todas las redes sociales
- **Mantenimiento**: Centralizado en un solo componente
- **Fallbacks**: Imágenes por defecto para contenido sin imagen específica

## 🕐 Timeline Estimado
- **Desarrollo**: 2-3 horas
- **Testing**: 1 hora
- **Deploy**: Inmediato (sin breaking changes)

## 🔍 Métricas de Éxito

- ✅ Previews correctos en Facebook Sharing Debugger
- ✅ Previews correctos en Twitter Card Validator  
- ✅ Schema markup validado en Google Rich Results Test
- ✅ Imágenes OG generadas correctamente

---

**Estado**: Pendiente de implementación  
**Prioridad**: Alta  
**Impacto**: Alto en engagement social