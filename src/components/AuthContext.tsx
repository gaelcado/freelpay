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
  const [showBanner, setShowBanner] = useState(true);
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
      {isMockMode && showBanner && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black p-2 flex items-center justify-center text-sm z-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Mode développement: Backend désactivé - Fonctionnalités limitées</span>
          <button 
            onClick={() => setShowBanner(false)}
            className="ml-4 p-1 hover:bg-yellow-600 rounded-full"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
} 