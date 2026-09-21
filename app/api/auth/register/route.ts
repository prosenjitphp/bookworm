import { NextRequest, NextResponse } from 'next/server';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, password, passwordConfirm } = body as {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };

  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ success: false, message: 'Full name is required.' }, { status: 400 });
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json({ success: false, message: 'A valid email address is required.' }, { status: 400 });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ success: false, message: 'Password must be at least 8 characters.' }, { status: 400 });
  }

  if (password !== passwordConfirm) {
    return NextResponse.json({ success: false, message: 'Passwords do not match.' }, { status: 400 });
  }

  // TODO: persist user when real API is integrated

  return NextResponse.json({ success: true, message: 'Registration successful' });
}
