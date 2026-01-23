import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getNewsById, updateNews, deleteNews } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const newsItem = await getNewsById(id);

    if (!newsItem) {
      return NextResponse.json({ error: 'Новость не найдена' }, { status: 404 });
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error('Error fetching news item:', error);
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

    const updated = await updateNews(id, data);

    if (!updated) {
      return NextResponse.json({ error: 'Новость не найдена' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating news:', error);
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
    const deleted = await deleteNews(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Новость не найдена' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
