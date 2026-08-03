import { createClient } from '@supabase/supabase-js';
import { env } from '@/config/env';

export const supabase = env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY
  ? createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)
  : null;

export function requireSupabase() {
  if (!supabase) throw new Error('Supabase no está configurado. Revisá VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.');
  return supabase;
}
