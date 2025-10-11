/**
 * API Endpoint para verificación de Do Not Track (DNT)
 * 
 * Este endpoint permite verificar si el navegador del usuario tiene activado
 * el header DNT y detecta navegadores enfocados en privacidad.
 * 
 * Propósito:
 * - Respetar la preferencia de no seguimiento de usuarios
 * - Detectar navegadores privacy-focused (Brave, DuckDuckGo, etc.)
 * - Proporcionar información para ajustar el comportamiento del sitio
 * 
 * Uso: GET /api/dnt
 * Headers: DNT, User-Agent
 * 
 * @returns {Object} Información sobre DNT y tipo de navegador
 */
export default function handler(req, res) {
  const dntHeader = req.headers.dnt || req.headers['dnt'];
  const userAgent = req.headers['user-agent'] || '';
  
  // Navegadores privacy-focused comunes
  const privacyBrowsers = [
    'brave',
    'duckduckgo',
    'firefox focus',
    'safari',
    'librewolf',
    'waterfox',
    'pale moon'
  ];
  
  const isPrivacyBrowser = privacyBrowsers.some(browser => 
    userAgent.toLowerCase().includes(browser)
  );
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'DNT, User-Agent');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({
    dnt: dntHeader === '1',
    privacyBrowser: isPrivacyBrowser,
    userAgent: userAgent,
    message: dntHeader === '1' ? 
      'DNT respected - no tracking' : 
      'Standard privacy mode',
    timestamp: new Date().toISOString()
  });
}