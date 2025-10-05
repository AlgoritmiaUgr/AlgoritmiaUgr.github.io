import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public', 'fotos'),
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  // Asegurar que el directorio existe
  const uploadDir = path.join(process.cwd(), 'public', 'fotos');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }

    const file = files.photo;
    if (!file) {
      return res.status(400).json({ error: 'No se encontró ninguna imagen' });
    }

    // Get the file object (can be array or single object)
    const uploadedFile = Array.isArray(file) ? file[0] : file;
    
    const filename = path.basename(uploadedFile.filepath);
    const url = `/fotos/${filename}`;

    res.status(200).json({ success: true, url });
  });
}
