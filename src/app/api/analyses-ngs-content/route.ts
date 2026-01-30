import { NextResponse } from 'next/server';
import { getAnalysesNgsContent } from '@/lib/data';

export async function GET() {
  try {
    const content = await getAnalysesNgsContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching analyses NGS content:', error);
    return NextResponse.json({ error: 'Failed to fetch analyses NGS content' }, { status: 500 });
  }
}
