import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface AuthError {
  message: string;
}

export const auth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },
};

export const database = {
  getItems: async <T>(table: string) => {
    const { data, error } = await supabase
      .from(table)
      .select('*');
    if (error) throw error;
    return data as T[];
  },

  getItemById: async <T>(table: string, id: string) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as T;
  },

  createItem: async <T>(table: string, item: Partial<T>) => {
    const { data, error } = await supabase
      .from(table)
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data as T;
  },

  updateItem: async <T>(table: string, id: string, updates: Partial<T>) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as T;
  },

  deleteItem: async (table: string, id: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

export default {
  auth,
  database,
  supabase,
}; 