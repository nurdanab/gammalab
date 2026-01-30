import { NextResponse } from 'next/server';
import { getNgsContent } from '@/lib/data';

export async function GET() {
  try {
    const content = await getNgsContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching NGS content:', error);
    return NextResponse.json({ error: 'Failed to fetch NGS content' }, { status: 500 });
  }
}
