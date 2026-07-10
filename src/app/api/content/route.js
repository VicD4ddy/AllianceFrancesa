import { NextResponse } from 'next/server';
import { getContent, saveContent, resetContent } from '@/lib/cmsService';

const ADMIN_PIN = process.env.ADMIN_PIN || 'AFV-2026';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error cargando contenido' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { pin, content } = body;

    if (pin !== ADMIN_PIN) {
      return NextResponse.json(
        { error: 'PIN de Administrador incorrecto. No autorizado.' },
        { status: 401 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Falta el objeto content en la solicitud' },
        { status: 400 }
      );
    }

    const result = await saveContent(content);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Error en PUT /api/content:', error);
    return NextResponse.json(
      { error: 'Error guardando el contenido' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (pin !== ADMIN_PIN) {
      return NextResponse.json(
        { error: 'PIN de Administrador incorrecto. No autorizado.' },
        { status: 401 }
      );
    }

    const result = await resetContent();
    const updatedContent = await getContent();
    return NextResponse.json({ success: true, content: updatedContent, ...result });
  } catch (error) {
    console.error('Error en DELETE /api/content:', error);
    return NextResponse.json(
      { error: 'Error restaurando el contenido' },
      { status: 500 }
    );
  }
}
