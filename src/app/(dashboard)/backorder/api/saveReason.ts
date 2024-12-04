// pages/api/saveData.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Aquí definimos la respuesta que esperaremos en la request
interface Data {
  message: string;
  success: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      console.log('llegamos')
      const { value } = req.body;

      // Lógica para guardar el dato (en este caso solo lo mostramos en consola)
      console.log('Valor recibido:', value);

      // Aquí podrías guardar el valor en una base de datos o archivo
      // Simularemos una respuesta exitosa
      return res.status(200).json({ message: 'Datos guardados correctamente', success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Error al guardar los datos', success: false });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido', success: false });
  }
}
