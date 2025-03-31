import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export const userService = {
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateUserProfile(userId: string, profile: Partial<User>) {
    const { error } = await supabase
      .from('users')
      .update(profile)
      .eq('id', userId);

    if (error) throw error;
  }
};