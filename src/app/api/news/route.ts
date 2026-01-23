import { NextResponse } from 'next/server';
import { getAllNewsAndPromotions, getFeaturedPromotions } from '@/lib/data';

export async function GET() {
  try {
    const [allNews, promotions] = await Promise.all([
      getAllNewsAndPromotions(),
      getFeaturedPromotions(6),
    ]);
    return NextResponse.json({ news: allNews, promotions });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
