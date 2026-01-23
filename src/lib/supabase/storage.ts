import { createClient } from './server'
import { createAdminClient } from './admin'

const BUCKET_NAME = 'images'

export interface UploadResult {
  path: string
  url: string
}

// Generate a unique filename
function generateFilename(originalName: string): string {
  const ext = originalName.split('.').pop() || 'jpg'
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}.${ext}`
}

// Upload image to Supabase Storage
export async function uploadImage(
  file: File,
  folder: string = 'uploads'
): Promise<UploadResult | null> {
  const supabase = await createClient()

  const filename = generateFilename(file.name)
  const path = `${folder}/${filename}`

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path)

  // Track the upload in image_usage table
  await supabase
    .from('image_usage')
    .insert({
      storage_path: path,
      used_in_table: null,
      used_in_id: null,
    } as never)

  return {
    path,
    url: urlData.publicUrl,
  }
}

// Delete image from Storage
export async function deleteImage(path: string): Promise<boolean> {
  const supabase = createAdminClient()

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) {
    console.error('Error deleting image:', error)
    return false
  }

  // Remove from tracking table
  await supabase
    .from('image_usage')
    .delete()
    .eq('storage_path', path)

  return true
}

// Get public URL for an image
export function getImageUrl(path: string): string {
  if (!path) return ''

  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${path}`
}

// Cleanup unused images (call this periodically)
export async function cleanupUnusedImages(daysOld: number = 7): Promise<string[]> {
  const supabase = createAdminClient()

  // Get list of unused images from the cleanup function
  const { data, error: queryError } = await supabase
    .rpc('cleanup_unused_images', { days_old: daysOld } as never)

  if (queryError) {
    console.error('Error getting unused images:', queryError)
    return []
  }

  const unusedImages = data as { deleted_path: string }[] | null

  if (!unusedImages || unusedImages.length === 0) {
    return []
  }

  // Delete the actual files from storage
  const paths = unusedImages.map(img => img.deleted_path)

  const { error: deleteError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(paths)

  if (deleteError) {
    console.error('Error deleting images from storage:', deleteError)
  }

  return paths
}

// List all images in a folder
export async function listImages(folder: string = 'uploads'): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(folder, {
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (error) {
    console.error('Error listing images:', error)
    return []
  }

  return data.map(file => `${folder}/${file.name}`)
}
