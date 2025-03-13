"use client";

import React from "react";
import { useToast } from "./use-toast";
export function ToastProvider() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-md border p-4 shadow-md transition-all ${toast.variant === "destructive" ? "bg-destructive text-destructive-foreground border-destructive" : "bg-background text-foreground border-border"} ${toast.open ? "animate-in fade-in-0 slide-in-from-top-5" : "animate-out fade-out-0 slide-out-to-right-5"}`}
        >
          {toast.title && (
            <div className="font-semibold mb-1">{toast.title}</div>
          )}
          {toast.description && <div>{toast.description}</div>}
          {toast.action}
          <button
            onClick={() => toast.onOpenChange(false)}
            className="absolute top-2 right-2 text-sm opacity-70 hover:opacity-100"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
