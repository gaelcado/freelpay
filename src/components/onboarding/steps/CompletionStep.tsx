"use client"

import { CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type CompletionStepProps = {
  formData: any
}

export default function CompletionStep({ formData }: CompletionStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="rounded-full bg-primary/10 p-3">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">Félicitations !</h3>
        <p className="text-muted-foreground">
          Votre compte Freelpay est maintenant prêt. Vous pouvez commencer à financer vos factures.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif de votre compte</CardTitle>
          <CardDescription>
            Voici un résumé des informations que vous avez fournies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Informations personnelles</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Nom</div>
              <div>{formData.contactInfo?.firstName} {formData.contactInfo?.lastName}</div>
              <div className="text-muted-foreground">Email</div>
              <div>{formData.contactInfo?.email}</div>
              <div className="text-muted-foreground">Téléphone</div>
              <div>{formData.contactInfo?.phone}</div>
              <div className="text-muted-foreground">SIRET</div>
              <div>{formData.contactInfo?.siret}</div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Informations professionnelles</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Statut juridique</div>
              <div>{formData.legalStatus}</div>
              <div className="text-muted-foreground">Activité principale</div>
              <div>{formData.activity}</div>
              <div className="text-muted-foreground">Adresse professionnelle</div>
              <div>{formData.businessAddress}</div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Financement</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Montant de la facture</div>
              <div>{formData.invoiceAmount ? `${parseFloat(formData.invoiceAmount).toLocaleString('fr-FR')} €` : '-'}</div>
              <div className="text-muted-foreground">Client</div>
              <div>{formData.clientDetails?.name || '-'}</div>
              <div className="text-muted-foreground">Date d'échéance</div>
              <div>{formData.dueDate ? new Date(formData.dueDate).toLocaleDateString('fr-FR') : '-'}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 flex flex-col items-start">
          <p className="text-sm">
            <span className="font-medium">Note :</span> Vous pouvez modifier ces informations à tout moment dans les paramètres de votre compte.
          </p>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Prochaines étapes</h3>
        
        <div className="space-y-3">
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Accéder à votre tableau de bord</h4>
                <p className="text-xs text-muted-foreground">Visualisez vos factures et suivez vos financements</p>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Card>
          
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Soumettre votre première facture</h4>
                <p className="text-xs text-muted-foreground">Commencez à financer vos factures dès maintenant</p>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Card>
          
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Compléter votre profil</h4>
                <p className="text-xs text-muted-foreground">Ajoutez des informations supplémentaires pour améliorer votre expérience</p>
              </div>
            </div>
            <Button size="sm" variant="ghost">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Card>
        </div>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm">
          <span className="font-medium">Besoin d'aide ?</span> Notre équipe est disponible pour vous accompagner dans vos démarches. N'hésitez pas à nous contacter par email à <a href="mailto:support@freelpay.com" className="text-primary">support@freelpay.com</a> ou par téléphone au <span className="font-medium">01 23 45 67 89</span>.
        </p>
      </div>
    </div>
  )
} 