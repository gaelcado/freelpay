"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { HeadingLG, BodyMD } from "@/components/ui/typography"
import { Building, User } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <HeadingLG>Paramètres</HeadingLG>
        <BodyMD className="text-muted-foreground">
          Gérez vos préférences et informations personnelles
        </BodyMD>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profil</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Entreprise</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card variant="default" elevation="medium">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Prénom</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Nom</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@freelpay.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" defaultValue="+33 1 23 45 67 89" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sauvegarder</Button>
            </CardFooter>
          </Card>
          
          <Card variant="default" elevation="medium">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Notifications par email</Label>
                  <BodyMD className="text-muted-foreground">
                    Recevez des notifications par email pour les mises à jour importantes
                  </BodyMD>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                  <BodyMD className="text-muted-foreground">
                    Recevez des notifications par SMS pour les mises à jour urgentes
                  </BodyMD>
                </div>
                <Switch id="sms-notifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-notifications">Communications marketing</Label>
                  <BodyMD className="text-muted-foreground">
                    Recevez des informations sur nos nouveaux services et offres
                  </BodyMD>
                </div>
                <Switch id="marketing-notifications" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sauvegarder</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="mt-6 space-y-6">
          <Card variant="default" elevation="medium">
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>
                Mettez à jour les informations de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nom de l'entreprise</Label>
                <Input id="company-name" defaultValue="Freelance Pro" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siret">Numéro SIRET</Label>
                <Input id="siret" defaultValue="12345678901234" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vat">Numéro de TVA</Label>
                <Input id="vat" defaultValue="FR12345678901" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" defaultValue="123 Rue de Paris&#10;75001 Paris&#10;France" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sauvegarder</Button>
            </CardFooter>
          </Card>
          
          <Card variant="default" elevation="medium">
            <CardHeader>
              <CardTitle>Coordonnées bancaires</CardTitle>
              <CardDescription>
                Mettez à jour vos coordonnées bancaires pour les paiements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Nom de la banque</Label>
                <Input id="bank-name" defaultValue="Banque Nationale" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input id="iban" defaultValue="FR76 1234 5678 9012 3456 7890 123" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bic">BIC</Label>
                <Input id="bic" defaultValue="BNPAFRPP" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sauvegarder</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 