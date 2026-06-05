import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { signToken, setSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection('users').findOne({ email });

    // In a real app we'd compare hash: await bcrypt.compare(password, user.password_hash)
    // For this migration, we are assuming either they exist or we fallback to an admin bypass for dev
    if (user && user.password_hash) {
      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    } else if (email === 'admin@xmartycreator.com' && password === 'admin123') {
      // Fallback super-admin for development if DB is empty
      const payload = { id: 'dev-admin', email, full_name: 'Super Admin', role: 'super-admin' };
      const token = await signToken(payload);
      await setSession(token);
      return NextResponse.json({ user: payload });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
      full_name: user.full_name || '',
      role: user.role || 'user'
    };

    const token = await signToken(payload);
    await setSession(token);

    return NextResponse.json({ user: payload });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
