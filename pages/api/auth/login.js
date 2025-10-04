// API Route para autenticación de administrador
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validar que se enviaron credenciales
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    // Obtener credenciales de variables de entorno (más seguro)
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'cpcugr@gmail.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EANg#f*HHs^Bg6hDfChdKNo2';

    // Verificar credenciales
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // En producción, aquí generarías un JWT o token de sesión
      return res.status(200).json({ 
        success: true,
        message: 'Autenticación exitosa',
        // Por ahora enviamos un token simple (en producción usar JWT)
        token: Buffer.from(`${email}:${Date.now()}`).toString('base64')
      });
    } else {
      // Credenciales incorrectas
      return res.status(401).json({ 
        success: false,
        error: 'Credenciales incorrectas' 
      });
    }
  } catch (error) {
    console.error('Error en autenticación:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
}
