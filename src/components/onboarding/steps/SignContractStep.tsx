"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FileText, Check, Pen, Download, Info, Shield, Clock } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { 
  Card, 
  CardContent 
} from "@/components/ui/card"
import { 
  HeadingSM,
  BodyMD, 
  BodySM 
} from "@/components/ui/typography"

// Define the form schema
const contractFormSchema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
  signature: z.string().min(1, {
    message: "La signature est requise",
  }),
})

type ContractFormValues = z.infer<typeof contractFormSchema>

type SignContractStepProps = {
  formData: any
  updateFormData: (data: any) => void
}

export default function SignContractStep({ formData, updateFormData }: SignContractStepProps) {
  const [contractSigned, setContractSigned] = useState(false)
  
  // Initialize form
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      acceptTerms: false,
      signature: "",
    },
  })

  // Handle form submission
  function onSubmit(data: ContractFormValues) {
    // Update form data in parent component
    updateFormData({
      contractSigned: true,
      signatureDate: new Date(),
    })
    
    setContractSigned(true)
  }

  // Format the current date
  const currentDate = format(new Date(), "PPP", { locale: fr })
  
  // Calculate financing details
  const invoiceAmount = parseFloat(formData.invoiceAmount || "0")
  const discountRate = formData.financingRate || 0.03 // 3% default
  const fees = formData.financingFees || 25 // Default fee
  const financedAmount = invoiceAmount * (1 - discountRate) - fees

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <BodyMD className="text-muted-foreground">
          Veuillez lire attentivement le contrat ci-dessous et le signer pour finaliser votre demande de financement.
        </BodyMD>
      </div>
      
      {/* Contract preview */}
      <Card className="border-border/50 overflow-hidden">
        <div className="bg-muted/30 px-6 py-4 border-b border-border/30 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <HeadingSM>Contrat de financement</HeadingSM>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 h-8">
            <Download className="h-3.5 w-3.5" />
            PDF
          </Button>
        </div>
        
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="text-muted-foreground">Numéro de contrat:</div>
            <div className="font-medium text-right">FP-{Math.floor(Math.random() * 10000)}</div>
            
            <div className="text-muted-foreground">Date:</div>
            <div className="font-medium text-right">{currentDate}</div>
            
            <div className="text-muted-foreground">Montant financé:</div>
            <div className="font-medium text-right text-primary">{financedAmount.toFixed(2)}€</div>
            
            <div className="text-muted-foreground">Client:</div>
            <div className="font-medium text-right">{formData.clientDetails?.name || "Non spécifié"}</div>
          </div>
          
          <Separator className="bg-border/50" />
          
          <div className="h-48 overflow-y-auto bg-muted/20 p-4 text-sm text-muted-foreground border border-border/30 rounded-md">
            <p className="mb-3 font-semibold text-foreground">CONTRAT DE FINANCEMENT DE FACTURE</p>
            <p className="mb-3">Entre Freelpay, ci-après dénommé "le Financeur", et {formData.userDetails?.firstName || ""} {formData.userDetails?.lastName || ""}, ci-après dénommé "le Client".</p>
            <p className="mb-2 font-medium text-foreground">Article 1 : Objet du contrat</p>
            <p className="mb-3">Le présent contrat a pour objet le financement de la facture n°{Math.floor(Math.random() * 10000)} d'un montant de {invoiceAmount.toFixed(2)}€ émise à l'encontre de {formData.clientDetails?.name || ""}.</p>
            <p className="mb-2 font-medium text-foreground">Article 2 : Montant du financement</p>
            <p className="mb-3">Le Financeur s'engage à verser au Client la somme de {financedAmount.toFixed(2)}€, correspondant au montant de la facture diminué des frais de service de {fees.toFixed(2)}€ et d'un taux d'escompte de {(discountRate * 100).toFixed(1)}%.</p>
            <p className="mb-2 font-medium text-foreground">Article 3 : Modalités de paiement</p>
            <p className="mb-3">Le versement sera effectué dans un délai de 24 heures suivant la signature du présent contrat, par virement bancaire sur le compte du Client.</p>
            <p className="mb-2 font-medium text-foreground">Article 4 : Cession de créance</p>
            <p className="mb-3">Par la signature du présent contrat, le Client cède au Financeur la créance correspondant à la facture mentionnée à l'article 1.</p>
            <p className="mb-2 font-medium text-foreground">Article 5 : Durée du contrat</p>
            <p className="mb-3">Le présent contrat prend effet à la date de sa signature et prend fin au paiement intégral de la facture par le débiteur.</p>
          </div>
        </CardContent>
      </Card>
      
      {!contractSigned ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <BodyMD className="font-medium">Conditions générales</BodyMD>
                    <BodySM className="text-muted-foreground">
                      Veuillez lire et accepter les conditions
                    </BodySM>
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-border/50 bg-muted/20">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          J'accepte les conditions générales du contrat et je reconnais avoir pris connaissance des modalités de financement.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Pen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <BodyMD className="font-medium">Votre signature</BodyMD>
                    <BodySM className="text-muted-foreground">
                      Signez électroniquement le contrat
                    </BodySM>
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Tapez votre nom complet" 
                            {...field} 
                            className="pl-10 h-12 text-lg font-handwriting border-border/50 bg-muted/20 focus-visible:ring-primary/30" 
                          />
                          <Pen className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">
              Signer et finaliser le contrat
            </Button>
          </form>
        </Form>
      ) : (
        <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/20">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
              <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <HeadingSM className="text-emerald-800 dark:text-emerald-500 mb-1">
                Contrat signé avec succès
              </HeadingSM>
              <BodyMD className="text-emerald-700 dark:text-emerald-600">
                Votre financement sera disponible sous 24h. Vous recevrez une confirmation par email.
              </BodyMD>
              
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                </div>
                <BodySM className="text-emerald-700 dark:text-emerald-600">
                  Traitement en cours - Financement prévu le {format(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "PPP", { locale: fr })}
                </BodySM>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-500" />
        </div>
        <div>
          <BodyMD className="font-medium text-blue-800 dark:text-blue-500">
            Information importante
          </BodyMD>
          <BodySM className="text-blue-700 dark:text-blue-600">
            Une copie du contrat signé vous sera envoyée par email à {formData.userDetails?.email || "votre adresse email"}. Vous pourrez également le retrouver dans votre espace client.
          </BodySM>
        </div>
      </div>
    </div>
  )
} 