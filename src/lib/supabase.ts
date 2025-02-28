
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// These environment variables are set in your project's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper function to check if a user is an admin
export async function isAdmin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return !!data;
}
