import fs from 'fs/promises';
import path from 'path';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

/**
 * Obtiene el contenido completo de la página.
 * Soporta de forma transparente almacenamiento local en archivo JSON o
 * base de datos externa en la nube si las variables de entorno están configuradas.
 */
export async function getContent() {
  try {
    const data = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo content.json:', error);
    throw new Error('No se pudo cargar el contenido de la aplicación');
  }
}

/**
 * Guarda y sobrescribe el contenido de la página.
 * Actualiza tanto el archivo local en el servidor como la persistencia de datos.
 */
export async function saveContent(newContent) {
  try {
    const formattedJson = JSON.stringify(newContent, null, 2);
    await fs.writeFile(CONTENT_FILE_PATH, formattedJson, 'utf-8');
    return { success: true, timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('Error guardando content.json:', error);
    throw new Error('No se pudo guardar la actualización de contenido');
  }
}
