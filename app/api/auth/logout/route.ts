import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Успешный выход из системы.' });

  response.cookies.set('session', '', { maxAge: 0 });

  return response;
}
