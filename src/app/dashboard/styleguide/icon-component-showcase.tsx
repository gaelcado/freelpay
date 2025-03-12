"use client"

import * as React from "react"
import * as RadixIcons from "@radix-ui/react-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icon } from "@/components/ui/icon"

export function IconComponentShowcase() {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  // Get all icons from RadixIcons
  const iconNames = Object.keys(RadixIcons)
    .filter(name => 
      name.endsWith('Icon') && name.toLowerCase().includes(searchTerm.toLowerCase())
    ) as Array<keyof typeof RadixIcons>

  return (
    <Card variant="default" elevation="medium">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon name="SymbolIcon" className="text-primary" />
          <CardTitle>Icon Component</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Our new Icon component that wraps Radix icons with consistent styling
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
          
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Icon Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" size="xs" />
                    <span className="text-xs mt-1">xs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" size="sm" />
                    <span className="text-xs mt-1">sm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" size="md" />
                    <span className="text-xs mt-1">md</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" size="lg" />
                    <span className="text-xs mt-1">lg</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" size="xl" />
                    <span className="text-xs mt-1">xl</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Icon Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" className="text-primary" />
                    <span className="text-xs mt-1">primary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" className="text-secondary" />
                    <span className="text-xs mt-1">secondary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" className="text-muted-foreground" />
                    <span className="text-xs mt-1">muted</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Icon name="HomeIcon" className="text-destructive" />
                    <span className="text-xs mt-1">destructive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {iconNames.map((name) => (
                <div 
                  key={name} 
                  className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-muted transition-colors"
                >
                  <Icon name={name} size="lg" className="mb-2" />
                  <p className="text-xs text-center font-mono truncate w-full" title={name}>
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
} 