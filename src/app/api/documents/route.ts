import { NextRequest, NextResponse } from 'next/server';
import { getDocuments } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;

    const documents = await getDocuments(type);
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
