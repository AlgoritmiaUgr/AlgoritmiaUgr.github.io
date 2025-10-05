import { IncomingForm } from 'formidable';
import { put } from '@vercel/blob';
import fs from 'fs';

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
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }

    const file = files.photo;
    if (!file) {
      return res.status(400).json({ error: 'No se encontró ninguna imagen' });
    }

    try {
      // Get the file object (can be array or single object)
      const uploadedFile = Array.isArray(file) ? file[0] : file;
      
      // Leer el archivo temporal
      const fileBuffer = fs.readFileSync(uploadedFile.filepath);
      const originalName = uploadedFile.originalFilename || 'photo.jpg';
      
      // Subir a Vercel Blob
      const blob = await put(originalName, fileBuffer, {
        access: 'public',
        contentType: uploadedFile.mimetype || 'image/jpeg',
      });

      // Limpiar el archivo temporal
      fs.unlinkSync(uploadedFile.filepath);

      // Retornar la URL pública de Vercel Blob
      res.status(200).json({ success: true, url: blob.url });
    } catch (error) {
      console.error('Error subiendo imagen a Blob:', error);
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }
  });
}
