import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET all blocks (optionally filtered by section_id)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('section_id');

    let query = supabase
      .from('patients_blocks')
      .select('*')
      .order('order_index', { ascending: true });

    if (sectionId) {
      query = query.eq('section_id', sectionId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: 500 });
  }
}

// POST - create new block
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section_id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings } = body;

    // Get max order_index for this section
    const { data: maxOrder } = await supabase
      .from('patients_blocks')
      .select('order_index')
      .eq('section_id', section_id)
      .order('order_index', { ascending: false })
      .limit(1)
      .single();

    const newOrderIndex = (maxOrder?.order_index ?? -1) + 1;

    const { data, error } = await supabase
      .from('patients_blocks')
      .insert({
        section_id,
        block_type,
        title_ru: title_ru || '',
        title_kz: title_kz || title_ru || '',
        title_en: title_en || title_ru || '',
        content_ru: content_ru || {},
        content_kz: content_kz || content_ru || {},
        content_en: content_en || content_ru || {},
        settings: settings || {},
        order_index: newOrderIndex
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating block:', error);
    return NextResponse.json({ error: 'Failed to create block' }, { status: 500 });
  }
}

// PUT - update block
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, block_type, title_ru, title_kz, title_en, content_ru, content_kz, content_en, settings, order_index, section_id } = body;

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (block_type !== undefined) updateData.block_type = block_type;
    if (title_ru !== undefined) updateData.title_ru = title_ru;
    if (title_kz !== undefined) updateData.title_kz = title_kz;
    if (title_en !== undefined) updateData.title_en = title_en;
    if (content_ru !== undefined) updateData.content_ru = content_ru;
    if (content_kz !== undefined) updateData.content_kz = content_kz;
    if (content_en !== undefined) updateData.content_en = content_en;
    if (settings !== undefined) updateData.settings = settings;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (section_id !== undefined) updateData.section_id = section_id;

    const { data, error } = await supabase
      .from('patients_blocks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating block:', error);
    return NextResponse.json({ error: 'Failed to update block' }, { status: 500 });
  }
}

// DELETE - delete block
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Block ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('patients_blocks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting block:', error);
    return NextResponse.json({ error: 'Failed to delete block' }, { status: 500 });
  }
}
