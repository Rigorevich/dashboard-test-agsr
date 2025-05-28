import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const isValidUser = email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD;

  if (!isValidUser) {
    return NextResponse.json({ message: 'Неверный логин или пароль.' }, { status: 401 });
  }

  const response = NextResponse.json({
    message: 'Успешная авторизация!',
    user: {
      email,
    },
  });

  response.cookies.set('session', email, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
  });

  return response;
}
