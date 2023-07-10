import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://zkrfeboouyzzgdooikkh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprcmZlYm9vdXl6emdkb29pa2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg3NDIzMjcsImV4cCI6MjAwNDMxODMyN30.xJ0Q8EgYsAhBOL4zO-1dfuBbb71PuTA53buLMixtFXE'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}
