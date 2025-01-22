import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://scfszvrzxrieerdgbwbr.supabase.co'
const supabaseKey = process.env.API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)