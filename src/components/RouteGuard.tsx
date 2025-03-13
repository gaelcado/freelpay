"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, isMockMode } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // Ne rediriger que si le chargement est terminé et que l'utilisateur n'est pas authentifié
    if (!loading && !isAuthenticated && !isMockMode) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router, isMockMode]);

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <div
        className="flex h-screen w-full items-center justify-center"
        data-oid="t114xil"
      >
        <div
          className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"
          data-oid="xq8vr65"
        ></div>
      </div>
    );
  }

  // En mode mock, on permet l'accès même sans authentification
  if (isMockMode) {
    return <>{children}</>;
  }

  // Rendre les enfants uniquement si l'utilisateur est authentifié
  return isAuthenticated ? <>{children}</> : null;
}
