"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu data-oid="dy8hq.p">
      <DropdownMenuTrigger asChild data-oid="movl_po">
        <Button
          variant="ghost"
          size="icon"
          suppressHydrationWarning
          data-oid=".jb6hg_"
        >
          <SunIcon
            className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-none dark:-rotate-90 dark:scale-0"
            data-oid="knu:5d9"
          />

          <MoonIcon
            className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-none dark:rotate-0 dark:scale-100"
            data-oid="-niufjf"
          />

          <span className="sr-only" data-oid="6m_2puf">
            Toggle theme
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid="wd3u3z0">
        <DropdownMenuItem onClick={() => setTheme("light")} data-oid=".1:p:as">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} data-oid="106z5ke">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} data-oid="n9304tq">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
