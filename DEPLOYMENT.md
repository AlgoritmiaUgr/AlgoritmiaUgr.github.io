# 🚀 Guía de Deployment en Vercel

## Variables de entorno requeridas

Antes de hacer deploy, configura estas variables de entorno en el dashboard de Vercel:

### 1. Redis Database (Upstash)

```bash
KV_REST_API_URL=https://tu-proyecto.upstash.io
KV_REST_API_TOKEN=tu_token_de_upstash
```

**O alternativamente:**

```bash
UPSTASH_REDIS_REST_URL=https://tu-proyecto.upstash.io
UPSTASH_REDIS_REST_TOKEN=tu_token_de_upstash
```

### 2. Credenciales de Admin

```bash
ADMIN_EMAIL=tu_email@ejemplo.com
ADMIN_PASSWORD=tu_contraseña_segura
```

⚠️ **IMPORTANTE**: Usa una contraseña segura y única para producción.

## Pasos para deployment

1. **Conectar repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Selecciona el framework: Next.js

2. **Configurar variables de entorno**
   - En Settings → Environment Variables
   - Añade todas las variables listadas arriba
   - Aplica a: Production, Preview, Development

3. **Configurar Upstash Redis**
   - Opción A: Usar Vercel KV (integración automática)
   - Opción B: Crear cuenta en [Upstash](https://upstash.com) y copiar credenciales

4. **Deploy**
   - Vercel detectará automáticamente Next.js
   - El build se ejecutará automáticamente
   - Tu sitio estará en: `tu-proyecto.vercel.app`

## Post-deployment

### Acceso al panel de administración
- URL: `https://tu-dominio.vercel.app/admin`
- Login con las credenciales configuradas en variables de entorno

### Verificaciones
- ✅ Las páginas públicas cargan correctamente
- ✅ El login de admin funciona
- ✅ Se pueden crear/editar contenidos
- ✅ Las imágenes y PDFs se guardan correctamente

## Límites de Vercel (Plan Hobby/Free)

- **Tamaño de función**: 50MB
- **Timeout de función**: 10s
- **Body size**: 4.5MB (PDFs grandes podrían fallar)
- **Bandwidth**: 100GB/mes

💡 **Tip**: Si subes PDFs muy grandes (>4MB), considera usar Vercel Blob Storage o reducir el tamaño.

## Troubleshooting

### Error: Variables de entorno no configuradas
```
ERROR: Variables de entorno ADMIN_EMAIL y ADMIN_PASSWORD no configuradas
```
**Solución**: Añade las variables en Vercel Dashboard → Settings → Environment Variables

### Error: Cannot connect to Redis
```
Error obteniendo contenido
```
**Solución**: Verifica que las credenciales de Upstash/KV estén correctamente configuradas

### PDF upload falla
**Solución**: Reduce el tamaño del PDF a menos de 4MB o considera Blob Storage

## Seguridad

✅ **Lo que YA está protegido:**
- Credenciales en variables de entorno (no en código)
- `.env.local` en `.gitignore`
- No hay tokens hardcodeados
- Logs de debug eliminados

⚠️ **Mejoras recomendadas para producción:**
- Implementar rate limiting en `/api/auth/login`
- Usar JWT tokens en lugar de tokens simples
- Añadir HTTPS-only cookies
- Implementar CSRF protection
- Añadir logging y monitoring (Sentry, LogRocket)

## Dominio custom (opcional)

1. En Vercel: Settings → Domains
2. Añade tu dominio: `algoritmia.ugr.es`
3. Configura DNS según instrucciones de Vercel
4. Certificado SSL se genera automáticamente

---

**¿Preguntas?** Revisa la [documentación de Vercel](https://vercel.com/docs)
