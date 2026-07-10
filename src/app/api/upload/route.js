import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ADMIN_PIN = process.env.ADMIN_PIN || 'AFV-2026';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const pinValue = formData.get('pin');
    const file = formData.get('file');
    const filename = formData.get('filename') || 'hero.png';

    // Verificar PIN de administrador
    if (pinValue !== ADMIN_PIN) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }

    // Leer los bytes del archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Guardar en public/ con el nombre indicado
    const publicDir = path.join(process.cwd(), 'public');
    const ext = path.extname(file.name) || '.png';
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const finalName = safeName.endsWith(ext) ? safeName : safeName + ext;
    const filePath = path.join(publicDir, finalName);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: '/' + finalName,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en POST /api/upload:', error);
    return NextResponse.json(
      { error: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
}
