import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getSubmissions, deleteSubmission } from '@/lib/data';

export async function GET() {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const submissions = await getSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID обязателен' }, { status: 400 });
    }

    const deleted = await deleteSubmission(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Заявка не найдена' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
