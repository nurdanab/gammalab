import { NextRequest, NextResponse } from 'next/server';
import { getAllHeroCarousels, createHeroCarousel } from '@/lib/data';

export async function GET() {
  try {
    const carousels = await getAllHeroCarousels();
    return NextResponse.json(carousels);
  } catch (error) {
    console.error('Error fetching hero carousels:', error);
    return NextResponse.json({ error: 'Failed to fetch hero carousels' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const carousel = await createHeroCarousel(data);
    return NextResponse.json(carousel, { status: 201 });
  } catch (error) {
    console.error('Error creating hero carousel:', error);
    return NextResponse.json({ error: 'Failed to create hero carousel' }, { status: 500 });
  }
}
