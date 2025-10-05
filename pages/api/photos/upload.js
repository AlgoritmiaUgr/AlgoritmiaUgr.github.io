import { IncomingForm } from 'formidable';
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
      
      // Leer el archivo y convertirlo a base64
      const fileBuffer = fs.readFileSync(uploadedFile.filepath);
      const base64Data = fileBuffer.toString('base64');
      const mimeType = uploadedFile.mimetype || 'image/jpeg';
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      // Limpiar el archivo temporal
      fs.unlinkSync(uploadedFile.filepath);

      // Retornar la data URL para que se guarde en Redis junto con el contenido
      res.status(200).json({ success: true, url: dataUrl });
    } catch (error) {
      console.error('Error procesando imagen:', error);
      return res.status(500).json({ error: 'Error al procesar la imagen' });
    }
  });
}
