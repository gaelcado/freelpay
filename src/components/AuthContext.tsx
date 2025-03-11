"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseMocked } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

// Définir le type pour le contexte
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  session: Session | null;
  loading: boolean;
  isMockMode: boolean;
}

// Créer le contexte avec des valeurs par défaut
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  session: null,
  loading: true,
  isMockMode: false,
});

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Fournisseur du contexte
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const isMockMode = isSupabaseMocked();

  useEffect(() => {
    // En mode mock, on peut simuler une authentification
    if (isMockMode) {
      console.log('Mode développement: Supabase est en mode mock');
      // Optionnel: simuler un délai de chargement
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Vérifier si un token existe dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    // Configurer l'écouteur de changement de session Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setIsAuthenticated(!!currentSession);
        setLoading(false);

        // Mettre à jour le token dans localStorage
        if (currentSession?.access_token) {
          localStorage.setItem('token', currentSession.access_token);
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem('token');
        }
      }
    );

    // Vérifier la session actuelle au chargement
    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setIsAuthenticated(!!currentSession);
      setLoading(false);
    };
    
    checkSession();

    // Nettoyer l'écouteur lors du démontage
    return () => {
      subscription.unsubscribe();
    };
  }, [isMockMode]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, session, loading, isMockMode }}>
      {isMockMode && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black p-2 text-center text-sm z-50">
          Mode développement: Backend désactivé - Fonctionnalités limitées
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
} 