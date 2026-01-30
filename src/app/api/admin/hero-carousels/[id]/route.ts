import { NextRequest, NextResponse } from 'next/server';
import { getHeroCarouselById, updateHeroCarousel, deleteHeroCarousel } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const carousel = await getHeroCarouselById(id);
    if (!carousel) {
      return NextResponse.json({ error: 'Hero carousel not found' }, { status: 404 });
    }
    return NextResponse.json(carousel);
  } catch (error) {
    console.error('Error fetching hero carousel:', error);
    return NextResponse.json({ error: 'Failed to fetch hero carousel' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const carousel = await updateHeroCarousel(id, data);
    if (!carousel) {
      return NextResponse.json({ error: 'Hero carousel not found' }, { status: 404 });
    }
    return NextResponse.json(carousel);
  } catch (error) {
    console.error('Error updating hero carousel:', error);
    return NextResponse.json({ error: 'Failed to update hero carousel' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteHeroCarousel(id);
    if (!success) {
      return NextResponse.json({ error: 'Hero carousel not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero carousel:', error);
    return NextResponse.json({ error: 'Failed to delete hero carousel' }, { status: 500 });
  }
}
