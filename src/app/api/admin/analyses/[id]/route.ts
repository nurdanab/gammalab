import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAnalysisById, updateAnalysis, deleteAnalysis } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const analysis = await getAnalysisById(id);

    if (!analysis) {
      return NextResponse.json({ error: 'Анализ не найден' }, { status: 404 });
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    const updated = await updateAnalysis(id, data);

    if (!updated) {
      return NextResponse.json({ error: 'Анализ не найден' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating analysis:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteAnalysis(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Анализ не найден' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting analysis:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
