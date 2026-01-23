import { NextRequest, NextResponse } from 'next/server';
import { getHomepageServices, createHomepageService } from '@/lib/data';

export async function GET() {
  try {
    const services = await getHomepageServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const service = await createHomepageService(data);
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
