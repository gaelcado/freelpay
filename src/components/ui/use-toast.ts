"use client";

// Simplified version that doesn't rely on the toast component
import { useState, useEffect, ReactNode, ReactElement } from 'react';

export type Toast = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactElement;
  variant?: "default" | "destructive";
};

type ToasterToast = Toast & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

const toastStore = {
  toasts: [] as ToasterToast[],
  listeners: new Set<() => void>(),
  
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  
  notify(toast: Omit<Toast, "id">) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = {
      ...toast,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) this.dismiss(id);
      },
    };
    
    this.toasts = [newToast, ...this.toasts].slice(0, TOAST_LIMIT);
    this.listeners.forEach((listener) => listener());

    setTimeout(() => {
      this.dismiss(id);
    }, TOAST_REMOVE_DELAY);

    return id;
  },
  
  dismiss(id: string) {
    this.toasts = this.toasts.map((toast) =>
      toast.id === id ? { ...toast, open: false } : toast
    );
    
    this.listeners.forEach((listener) => listener());

    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
      this.listeners.forEach((listener) => listener());
    }, 300);
  },
};

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  useEffect(() => {
    const unsubscribe = toastStore.subscribe(() => {
      setToasts([...toastStore.toasts]);
    });
    
    return unsubscribe;
  }, []);

  return {
    toast: (props: Omit<Toast, "id">) => toastStore.notify(props),
    dismiss: (id: string) => toastStore.dismiss(id),
    toasts,
  };
} 