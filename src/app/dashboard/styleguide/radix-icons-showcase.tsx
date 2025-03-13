"use client";

import * as React from "react";
import * as RadixIcons from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
export function RadixIconsShowcase() {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Get all icons from RadixIcons
  const iconEntries = Object.entries(RadixIcons).filter(
    ([name]) =>
      name.endsWith("Icon") &&
      name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <Card variant="default" elevation="medium">
      <CardHeader>
        <div className="flex items-center gap-2">
          <RadixIcons.SymbolIcon className="h-5 w-5 text-primary" />

          <CardTitle>Radix Icons</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          A collection of icons from @radix-ui/react-icons package
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {iconEntries.map(([name, Icon]) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-muted transition-colors"
                >
                  <Icon className="h-8 w-8 mb-2" name={name} />

                  <p
                    className="text-xs text-center font-mono truncate w-full"
                    title={name}
                  >
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
