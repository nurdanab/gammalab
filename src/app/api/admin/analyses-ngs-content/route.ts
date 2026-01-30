import { NextRequest, NextResponse } from 'next/server';
import { getAnalysesNgsContentAdmin, updateAnalysesNgsContent } from '@/lib/data';

export async function GET() {
  try {
    const content = await getAnalysesNgsContentAdmin();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching analyses NGS content:', error);
    return NextResponse.json({ error: 'Failed to fetch analyses NGS content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updates } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const content = await updateAnalysesNgsContent(id, updates);

    if (!content) {
      return NextResponse.json({ error: 'Failed to update analyses NGS content' }, { status: 500 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating analyses NGS content:', error);
    return NextResponse.json({ error: 'Failed to update analyses NGS content' }, { status: 500 });
  }
}
