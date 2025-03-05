"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!isDashboard && (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      )}
      {children}
    </ThemeProvider>
  );
}