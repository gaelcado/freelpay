"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ModeToggle } from "@/components/theme-switch"
import { InfoIcon, AlertCircleIcon, CheckCircleIcon, XCircleIcon, PaletteIcon, LayoutIcon, ComponentIcon, TextIcon, BoxIcon, CircleIcon } from "lucide-react"
import { TypographyShowcase } from "./typography-showcase"

export default function StyleGuidePage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Design System</CardTitle>
          <p className="text-sm text-muted-foreground">Explore our design system elements and components</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PaletteIcon className="h-6 w-6" />
                    <CardTitle>Theme Overview</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Our design system uses a clean, modern aesthetic with a focus on readability and usability. The color palette is designed to be accessible and provide clear visual hierarchy.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-medium mb-2">Light Theme</h3>
                        <p className="text-sm text-muted-foreground">
                          The light theme uses a white background with dark text for maximum readability in well-lit environments.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md bg-zinc-950 text-white">
                        <h3 className="text-lg font-medium mb-2">Dark Theme</h3>
                        <p className="text-sm text-zinc-400">
                          The dark theme uses a dark background with light text to reduce eye strain in low-light environments.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="mt-6 space-y-6">
              <TypographyShowcase />
            </TabsContent>

            <TabsContent value="colors" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PaletteIcon className="h-6 w-6" />
                    <CardTitle>Color Palette</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Primary Colors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-primary rounded-md flex items-center justify-center text-primary-foreground">Primary</div>
                          <p className="text-sm font-medium">Primary</p>
                          <p className="text-xs text-muted-foreground">--primary</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-secondary rounded-md flex items-center justify-center text-secondary-foreground">Secondary</div>
                          <p className="text-sm font-medium">Secondary</p>
                          <p className="text-xs text-muted-foreground">--secondary</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-accent rounded-md flex items-center justify-center text-accent-foreground">Accent</div>
                          <p className="text-sm font-medium">Accent</p>
                          <p className="text-xs text-muted-foreground">--accent</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-destructive rounded-md flex items-center justify-center text-destructive-foreground">Destructive</div>
                          <p className="text-sm font-medium">Destructive</p>
                          <p className="text-xs text-muted-foreground">--destructive</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-4">UI Colors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-background border rounded-md flex items-center justify-center">Background</div>
                          <p className="text-sm font-medium">Background</p>
                          <p className="text-xs text-muted-foreground">--background</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-card border rounded-md flex items-center justify-center">Card</div>
                          <p className="text-sm font-medium">Card</p>
                          <p className="text-xs text-muted-foreground">--card</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-popover border rounded-md flex items-center justify-center">Popover</div>
                          <p className="text-sm font-medium">Popover</p>
                          <p className="text-xs text-muted-foreground">--popover</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 w-full bg-muted border rounded-md flex items-center justify-center">Muted</div>
                          <p className="text-sm font-medium">Muted</p>
                          <p className="text-xs text-muted-foreground">--muted</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spacing" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BoxIcon className="h-6 w-6" />
                    <CardTitle>Spacing & Radius</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Border Radius</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="components" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ComponentIcon className="h-6 w-6" />
                    <CardTitle>Components</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Our component library is built on top of shadcn/ui, providing a consistent and accessible user interface. Components are designed to be flexible, reusable, and easy to customize.
                    </p>
                    <p>
                      Explore the components in the application to see them in action.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}