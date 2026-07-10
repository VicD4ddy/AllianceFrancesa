import { NextResponse } from 'next/server';

const ADMIN_PIN = process.env.ADMIN_PIN || 'AFV-2026';

export async function POST(request) {
  try {
    const { pin } = await request.json();

    if (pin === ADMIN_PIN) {
      return NextResponse.json({ authorized: true });
    }

    return NextResponse.json(
      { authorized: false, error: 'PIN incorrecto' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Solicitud inválida' },
      { status: 400 }
    );
  }
}
