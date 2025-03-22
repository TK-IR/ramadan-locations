
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// These environment variables are set in your project's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
  // You can find these values in your Supabase project settings
}

// Create the Supabase client with better error handling
export const supabase = createClient<Database>(
  supabaseUrl || '',  // Using empty string instead of placeholder to make the error more obvious
  supabaseAnonKey || ''
);

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
