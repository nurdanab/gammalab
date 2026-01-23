import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Admin client with service_role key for full database access
// IMPORTANT: Only use this on the server side (API routes, Server Components)
// Never expose the service_role key to the client
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase admin credentials')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
