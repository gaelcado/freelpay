\"use client";

import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon, AlertCircleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";

export default function StyleGuidePage() {
  return (
    <div className="container py-10 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Freelpay Style Guide</h1>
        <p className="text-muted-foreground text-lg">A comprehensive guide to the design system and UI components</p>
      </div>

      {/* Typography Section */}
      <section id="typography" className="space-y-6">
        <h2 className="text-3xl font-semibold border-b pb-2">Typography</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium">Font Families</h3>
            <div className="mt-2 space-y-2">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Geist Sans (Primary)</p>
                <p className="text-2xl">The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="p-4 border rounded-md font-mono">
                <p className="text-sm text-muted-foreground">Geist Mono</p>
                <p className="text-2xl">The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium">Headings</h3>
            <div className="mt-2 space-y-2">
              <div className="p-2 border-l-4 border-primary">
                <h1 className="text-5xl font-bold">Heading 1</h1>
              </div>
              <div className="p-2 border-l-4 border-primary">
                <h2 className="text-4xl font-bold">Heading 2</h2>
              </div>
              <div className="p-2 border-l-4 border-primary">
                <h3 className="text-3xl font-bold">Heading 3</h3>
              </div>
              <div className="p-2 border-l-4 border-primary">
                <h4 className="text-2xl font-bold">Heading 4</h4>
              </div>
              <div className="p-2 border-l-4 border-primary">
                <h5 className="text-xl font-bold">Heading 5</h5>
              </div>
              <div className="p-2 border-l-4 border-primary">
                <h6 className="text-lg font-bold">Heading 6</h6>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium">Text Sizes</h3>
            <div className="mt-2 space-y-2">
              <div className="p-2">
                <p className="text-xs">Extra Small: The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="p-2">
                <p className="text-sm">Small: The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="p-2">
                <p className="text-base">Base: The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="p-2">
                <p className="text-lg">Large: The quick brown fox jumps over the lazy dog</p>
              </div>
              <div className="p-2">
                <p className="text-xl">Extra Large: The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section id="colors" className="space-y-6">
        <h2 className="text-3xl font-semibold border-b pb-2">Colors</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium">Primary Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="space-y-2">
                <div className="h-20 w-full bg-primary rounded-md"></div>
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">--primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-primary-foreground rounded-md"></div>
                <p className="text-sm font-medium">Primary Foreground</p>
                <p className="text-xs text-muted-foreground">--primary-foreground</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-secondary rounded-md"></div>
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-muted-foreground">--secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-secondary-foreground rounded-md"></div>
                <p className="text-sm font-medium">Secondary Foreground</p>
                <p className="text-xs text-muted-foreground">--secondary-foreground</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium">UI Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="space-y-2">
                <div className="h-20 w-full bg-background rounded-md border"></div>
                <p className="text-sm font-medium">Background</p>
                <p className="text-xs text-muted-foreground">--background</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-foreground rounded-md"></div>
                <p className="text-sm font-medium">Foreground</p>
                <p className="text-xs text-muted-foreground">--foreground</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-muted rounded-md"></div>
                <p className="text-sm font-medium">Muted</p>
                <p className="text-xs text-muted-foreground">--muted</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-muted-foreground rounded-md"></div>
                <p className="text-sm font-medium">Muted Foreground</p>
                <p className="text-xs text-muted-foreground">--muted-foreground</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium">Accent & Destructive</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="space-y-2">
                <div className="h-20 w-full bg-accent rounded-md"></div>
                <p className="text-sm font-medium">Accent</p>
                <p className="text-xs text-muted-foreground">--accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-accent-foreground rounded-md"></div>
                <p className="text-sm font-medium">Accent Foreground</p>
                <p className="text-xs text-muted-foreground">--accent-foreground</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-destructive rounded-md"></div>
                <p className="text-sm font-medium">Destructive</p>
                <p className="text-xs text-muted-foreground">--destructive</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-destructive-foreground rounded-md"></div>
                <p className="text-sm font-medium">Destructive Foreground</p>
                <p className="text-xs text-muted-foreground">--destructive-foreground</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium">Border & Surface</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="space-y-2">
                <div className="h-20 w-full bg-border rounded-md"></div>
                <p className="text-sm font-medium">Border</p>
                <p className="text-xs text-muted-foreground">--border</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-input rounded-md"></div>
                <p className="text-sm font-medium">Input</p>
                <p className="text-xs text-muted-foreground">--input</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-ring rounded-md"></div>
                <p className="text-sm font-medium">Ring</p>
                <p className="text-xs text-muted-foreground">--ring</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-card rounded-md"></div>
                <p className="text-sm font-medium">Card</p>
                <p className="text-xs text-muted-foreground">--card</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium">Chart Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="space-y-2">
                  <div className={`h-20 w-full rounded-md bg-[var(--chart-${num})]`}></div>
                  <p className="text-sm font-medium">Chart {num}</p>
                  <p className="text-xs text-muted-foreground">--chart-{num}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spacing & Radius Section */}
      <section id="spacing-radius" className="space-y-6">
        <h2 className="text-3xl font-semibold border-b pb-2">Spacing & Radius</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium">Border Radius</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="space-y-2">
                <div className="h-20 w-full bg-primary rounded-sm flex items-center justify-center text-primary-foreground">sm</div>
                <p className="text-sm font-medium">Small</p>
                <p className="text-xs text-muted-foreground">--radius-sm</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-primary rounded-md flex items-center justify-center text-primary-foreground">md</div>
                <p className="text-sm font-medium">Medium</p>
                <p className="text-xs text-muted-foreground">--radius-md</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-primary rounded-lg flex items-center justify-center text-primary-foreground">lg</div>
                <p className="text-sm font-medium">Large</p>
                <p className="text-xs text-muted-foreground">--radius-lg</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 w-full bg-primary rounded-xl flex items-center justify-center text-primary-foreground">xl</div>
                <p className="text-sm font-medium">Extra Large</p>
                <p className="text-xs text-muted-foreground">--radius-xl</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section id="components" className="space-y-6">
        <h2 className="text-3xl font-semibold border-b pb-2">Components</h2>
        
        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
            <TabsTrigger value="buttons">Buttons