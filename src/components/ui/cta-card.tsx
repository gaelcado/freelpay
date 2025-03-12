"use client";

import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";

export function CtaCard() {
  return (
    <Card className="flex-row w-full h-fit overflow-hidden shadow-md">
      {/* Top image section with background and logo */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/branding/6.webp" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/branding/logo.svg" alt="Brand Logo" className="w-16 h-16" />
        </div>
      </div>
      
      {/* Content section with title and subtitle */}
      <CardContent className="p-4">
        <h4 className={`${typography("special", "cardTitle")} mb-0`}>Financer une facture</h4>
        <p className="text-sm text-muted-foreground">Faites vous payer en 24h</p>
      </CardContent>
      
      {/* Footer with CTA button */}
      <CardFooter className="px-4 pb-4">
        <Button variant="default" size="sm" className="w-full flex items-center justify-center gap-2">
          <RocketIcon className="w-2 h-2" />
          <span>Financer une facture</span>
        </Button>
      </CardFooter>
    </Card>
  );
} 