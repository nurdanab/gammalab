export { createClient as createBrowserClient } from './client'
export { createClient as createServerClient } from './server'
export { createAdminClient } from './admin'
export { updateSession } from './middleware'
export type { Database } from './database.types'

// Re-export all queries
export * from './queries'

// Re-export storage functions
export * from './storage'
