import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getStats } from '@/lib/data';

export async function GET() {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
