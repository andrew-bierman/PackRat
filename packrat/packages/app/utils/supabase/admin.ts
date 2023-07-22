import { createClient } from '@supabase/supabase-js'
import { Database } from '@my/supabase/types'

/**
 * only meant to be used on the server side.
 */
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
)
