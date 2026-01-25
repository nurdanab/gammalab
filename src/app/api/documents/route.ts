import { NextRequest, NextResponse } from 'next/server';
import { getDocuments } from '@/lib/data';

// Disable caching for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;

    const documents = await getDocuments(type);

    return NextResponse.json(documents, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
