import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'

const BUCKET_NAME = 'images'

// POST - Cleanup unused images
export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const daysOld = body.daysOld || 7

    const supabase = createAdminClient()

    // Get unused images older than X days
    const { data: unusedImages, error: queryError } = await supabase
      .from('image_usage')
      .select('storage_path')
      .is('used_in_id', null)
      .lt('uploaded_at', new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000).toISOString())

    if (queryError) {
      console.error('Query error:', queryError)
      return NextResponse.json({ error: 'Failed to query unused images' }, { status: 500 })
    }

    if (!unusedImages || unusedImages.length === 0) {
      return NextResponse.json({
        message: 'No unused images to clean up',
        deletedCount: 0,
        deletedPaths: [],
      })
    }

    const paths = (unusedImages as { storage_path: string }[]).map(img => img.storage_path)

    // Delete from storage
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(paths)

    if (deleteError) {
      console.error('Storage delete error:', deleteError)
      // Continue to delete from tracking table anyway
    }

    // Delete from tracking table
    const { error: trackingError } = await supabase
      .from('image_usage')
      .delete()
      .in('storage_path', paths)

    if (trackingError) {
      console.error('Tracking delete error:', trackingError)
    }

    return NextResponse.json({
      message: `Cleaned up ${paths.length} unused images`,
      deletedCount: paths.length,
      deletedPaths: paths,
    })
  } catch (error) {
    console.error('Error cleaning up images:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET - Get stats about unused images
export async function GET() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()

    // Count unused images
    const { count: unusedCount } = await supabase
      .from('image_usage')
      .select('*', { count: 'exact', head: true })
      .is('used_in_id', null)

    // Count total images
    const { count: totalCount } = await supabase
      .from('image_usage')
      .select('*', { count: 'exact', head: true })

    // Get unused images older than 7 days
    const { count: oldUnusedCount } = await supabase
      .from('image_usage')
      .select('*', { count: 'exact', head: true })
      .is('used_in_id', null)
      .lt('uploaded_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    return NextResponse.json({
      totalImages: totalCount || 0,
      unusedImages: unusedCount || 0,
      unusedOlderThan7Days: oldUnusedCount || 0,
    })
  } catch (error) {
    console.error('Error getting image stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
