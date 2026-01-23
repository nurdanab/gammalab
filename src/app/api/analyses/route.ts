import { NextResponse } from 'next/server';
import { getAnalyses, getCategories } from '@/lib/data';

export async function GET() {
  try {
    const [analyses, categories] = await Promise.all([
      getAnalyses(),
      getCategories(),
    ]);

    return NextResponse.json({ analyses, categories });
  } catch (error) {
    console.error('Error fetching analyses:', error);
    return NextResponse.json({ error: 'Failed to fetch analyses' }, { status: 500 });
  }
}
