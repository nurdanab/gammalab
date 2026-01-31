import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Get all visible sections with their blocks
    const { data: sections, error: sectionsError } = await supabase
      .from('patients_sections')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true });

    if (sectionsError) {
      console.error('Error fetching sections:', sectionsError);
      return NextResponse.json({ sections: [], blocks: [] });
    }

    // Get all blocks
    const { data: blocks, error: blocksError } = await supabase
      .from('patients_blocks')
      .select('*')
      .order('order_index', { ascending: true });

    if (blocksError) {
      console.error('Error fetching blocks:', blocksError);
      return NextResponse.json({ sections: sections || [], blocks: [] });
    }

    return NextResponse.json({
      sections: sections || [],
      blocks: blocks || []
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ sections: [], blocks: [] });
  }
}
