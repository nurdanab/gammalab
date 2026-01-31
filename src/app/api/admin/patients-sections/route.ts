import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET all sections (including hidden)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('patients_sections')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}

// POST - create new section
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title_ru, title_kz, title_en, slug } = body;

    // Get max order_index
    const { data: maxOrder } = await supabase
      .from('patients_sections')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1)
      .single();

    const newOrderIndex = (maxOrder?.order_index ?? -1) + 1;

    const { data, error } = await supabase
      .from('patients_sections')
      .insert({
        title_ru,
        title_kz: title_kz || title_ru,
        title_en: title_en || title_ru,
        slug: slug || title_ru.toLowerCase().replace(/\s+/g, '-'),
        order_index: newOrderIndex,
        is_visible: true
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}

// PUT - update section
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title_ru, title_kz, title_en, slug, order_index, is_visible } = body;

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (title_ru !== undefined) updateData.title_ru = title_ru;
    if (title_kz !== undefined) updateData.title_kz = title_kz;
    if (title_en !== undefined) updateData.title_en = title_en;
    if (slug !== undefined) updateData.slug = slug;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (is_visible !== undefined) updateData.is_visible = is_visible;

    const { data, error } = await supabase
      .from('patients_sections')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}

// DELETE - delete section
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Section ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('patients_sections')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting section:', error);
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
  }
}
