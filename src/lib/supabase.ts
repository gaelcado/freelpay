import { createClient } from '@supabase/supabase-js';

// Récupérer les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Flag pour désactiver Supabase temporairement
const MOCK_SUPABASE = !supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url';

// Créer un client mock si les identifiants ne sont pas disponibles
const mockSupabase = {
  auth: {
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: null }),
    updateUser: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getUser: () => Promise.resolve({ user: null, error: null }),
  },
  table: () => ({
    select: () => ({
      eq: () => ({
        execute: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
    insert: () => ({
      execute: () => Promise.resolve({ data: [], error: null }),
    }),
  }),
};

// Créer le client Supabase ou utiliser le mock
export const supabase = MOCK_SUPABASE 
  ? mockSupabase 
  : createClient(supabaseUrl, supabaseAnonKey);

// Fonction utilitaire pour vérifier si Supabase est en mode mock
export const isSupabaseMocked = () => MOCK_SUPABASE; 