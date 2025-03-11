import { supabase } from '@/lib/supabase';

// Type pour les données utilisateur
interface UserCreate {
  id: string;
  username: string;
  email: string;
  password?: string;
  siren_number?: string;
  phone?: string;
  address?: string;
}

/**
 * Inscription avec email et mot de passe
 */
export const signUpWithEmail = async (user: UserCreate, captchaToken: string) => {
  console.log('Démarrage du processus d\'inscription...');
  try {
    // 1. Créer l'utilisateur dans Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password!,
      options: {
        data: {
          username: user.username,
          siren_number: user.siren_number,
          phone: user.phone,
          address: user.address,
          registration_incomplete: true,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        captchaToken: captchaToken,
      },
    });

    if (authError) {
      if (authError.message.includes('User already registered')) {
        throw new Error('Un compte existe déjà avec cette adresse email. Veuillez vous connecter.');
      }
      throw authError;
    }

    // 2. Créer l'enregistrement utilisateur dans notre backend
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erreur lors de la création du compte');
    }

    // 3. Connecter l'utilisateur immédiatement après l'inscription
    if (data.user && data.session) {
      return { session: data.session, user: data.user };
    } else {
      throw new Error("Erreur d'authentification, aucun utilisateur retourné.");
    }
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    throw error;
  }
};

/**
 * Connexion avec email et mot de passe
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
};

/**
 * Demande de réinitialisation de mot de passe
 */
export const requestPasswordReset = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erreur de demande de réinitialisation:', error);
    throw error;
  }
};

/**
 * Mise à jour du mot de passe
 */
export const updatePassword = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erreur de mise à jour du mot de passe:', error);
    throw error;
  }
};

/**
 * Déconnexion
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    throw error;
  }
}; 