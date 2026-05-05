import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://diego-react-week1-mpe8r780o-difepares-projects.vercel.app/'
const supabaseAnonKey = 'sb_publishable_oHIb4YKiUxse9vWQ1Vj8ZA_Mt38IkR2'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)