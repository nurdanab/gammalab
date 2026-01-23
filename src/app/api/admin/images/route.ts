import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'

const BUCKET_NAME = 'images'

// POST - Upload image
export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const filename = `${timestamp}-${random}.${ext}`
    const path = `${folder}/${filename}`

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload' }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path)

    // Track in image_usage
    await supabase
      .from('image_usage')
      .insert({
        storage_path: path,
        used_in_table: null,
        used_in_id: null,
      } as never)

    return NextResponse.json({
      path,
      url: urlData.publicUrl,
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete specific image
export async function DELETE(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { path } = await request.json()

    if (!path) {
      return NextResponse.json({ error: 'No path provided' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Delete from storage
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }

    // Remove from tracking
    await supabase
      .from('image_usage')
      .delete()
      .eq('storage_path', path)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
