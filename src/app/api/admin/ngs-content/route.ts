import { NextRequest, NextResponse } from 'next/server';
import { getNgsContentAdmin, updateNgsContent } from '@/lib/data';

export async function GET() {
  try {
    const content = await getNgsContentAdmin();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching NGS content:', error);
    return NextResponse.json({ error: 'Failed to fetch NGS content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updates } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const content = await updateNgsContent(id, updates);

    if (!content) {
      return NextResponse.json({ error: 'Failed to update NGS content' }, { status: 500 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating NGS content:', error);
    return NextResponse.json({ error: 'Failed to update NGS content' }, { status: 500 });
  }
}
