"use client"

import { useState, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Define the form schema
const registrationFormSchema = z.object({
  email: z.string().email({
    message: "Email invalide",
  }),
  phone: z.string().min(1, {
    message: "Le numéro de téléphone est requis",
  }),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    })
    .regex(/[A-Z]/, {
      message: "Le mot de passe doit contenir au moins une majuscule",
    })
    .regex(/[0-9]/, {
      message: "Le mot de passe doit contenir au moins un chiffre",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Le mot de passe doit contenir au moins un caractère spécial",
    }),
  confirmPassword: z.string(),
  legalStatus: z.string({
    required_error: "Le statut juridique est requis",
  }),
  siret: z.string().min(14, {
    message: "Le numéro SIRET doit contenir 14 chiffres",
  }).max(14, {
    message: "Le numéro SIRET doit contenir 14 chiffres",
  }),
  businessAddress: z.string().min(1, {
    message: "L'adresse professionnelle est requise",
  }),
  activity: z.string({
    required_error: "L'activité principale est requise",
  }),
  monthlyInvoicing: z.string({
    required_error: "Le volume mensuel de facturation est requis",
  }),
  paymentTerms: z.string({
    required_error: "Les délais de paiement habituels sont requis",
  }),
  clientTypes: z.string({
    required_error: "Le type de clients est requis",
  }),
  financingPurpose: z.string({
    required_error: "L'objectif du financement est requis",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})

type RegistrationFormValues = z.infer<typeof registrationFormSchema>

// Legal status options
const LEGAL_STATUS = [
  { value: "freelance", label: "Freelance" },
  { value: "auto-entrepreneur", label: "Auto-entrepreneur" },
  { value: "eurl", label: "EURL" },
  { value: "sasu", label: "SASU" },
  { value: "sarl", label: "SARL" },
  { value: "sas", label: "SAS" },
  { value: "autre", label: "Autre" },
]

// Activity options
const ACTIVITIES = [
  { value: "tech", label: "Développement informatique" },
  { value: "design", label: "Design & Création" },
  { value: "marketing", label: "Marketing & Communication" },
  { value: "consulting", label: "Conseil & Stratégie" },
  { value: "formation", label: "Formation & Coaching" },
  { value: "traduction", label: "Traduction & Rédaction" },
  { value: "autre", label: "Autre" },
]

// Monthly invoicing options
const MONTHLY_INVOICING = [
  { value: "less-5k", label: "Moins de 5 000€" },
  { value: "5k-10k", label: "5 000€ - 10 000€" },
  { value: "10k-20k", label: "10 000€ - 20 000€" },
  { value: "20k-50k", label: "20 000€ - 50 000€" },
  { value: "more-50k", label: "Plus de 50 000€" },
]

// Payment terms options
const PAYMENT_TERMS = [
  { value: "30-days", label: "30 jours" },
  { value: "45-days", label: "45 jours" },
  { value: "60-days", label: "60 jours" },
  { value: "90-days", label: "90 jours" },
  { value: "custom", label: "Autre" },
]

// Client types options
const CLIENT_TYPES = [
  { value: "pme", label: "PME" },
  { value: "grand-compte", label: "Grandes entreprises" },
  { value: "public", label: "Institutions publiques" },
  { value: "mixed", label: "Mixte" },
]

// Financing purpose options
const FINANCING_PURPOSE = [
  { value: "tresorerie", label: "Trésorerie" },
  { value: "croissance", label: "Croissance" },
  { value: "equipement", label: "Équipement" },
  { value: "recrutement", label: "Recrutement" },
  { value: "autre", label: "Autre" },
]

interface RegistrationStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: (data: Record<string, string>) => void
  currentStep: number
}

export default function RegistrationStep({ formData, updateFormData, onNext, currentStep }: RegistrationStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Initialize form with existing data
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: formData.contactInfo?.email || "",
      phone: formData.contactInfo?.phone || "",
      password: formData.password || "",
      confirmPassword: formData.password || "",
      legalStatus: formData.legalStatus || "",
      siret: formData.contactInfo?.siret || "",
      businessAddress: formData.businessAddress || "",
      activity: formData.activity || "",
      monthlyInvoicing: "",
      paymentTerms: "",
      clientTypes: "",
      financingPurpose: "",
      termsAccepted: false,
    },
  })

  // Handle form submission
  function onSubmit(data: RegistrationFormValues) {
    // Update form data in parent component
    updateFormData({
      contactInfo: {
        ...formData.contactInfo,
        email: data.email,
        phone: data.phone,
        siret: data.siret,
      },
      password: data.password,
      legalStatus: data.legalStatus,
      businessAddress: data.businessAddress,
      activity: data.activity,
      qualificationData: {
        monthlyInvoicing: data.monthlyInvoicing,
        paymentTerms: data.paymentTerms,
        clientTypes: data.clientTypes,
        financingPurpose: data.financingPurpose,
      },
    })
  }

  const goToNext = useCallback((stepData?: Record<string, string>) => {
    // ... existing code ...
  }, [currentStep])

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations de connexion</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jean.dupont@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="06 12 34 56 78" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      8 caractères min., 1 majuscule, 1 chiffre, 1 caractère spécial
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations professionnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="legalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut juridique</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LEGAL_STATUS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="siret"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Numéro SIRET</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80">
                              Le numéro SIRET est un identifiant à 14 chiffres qui permet d'identifier votre entreprise.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input placeholder="12345678901234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse professionnelle</FormLabel>
                  <FormControl>
                    <Input placeholder="123 rue de Paris, 75001 Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activité principale</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une activité" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACTIVITIES.map((activity) => (
                        <SelectItem key={activity.value} value={activity.value}>
                          {activity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Questionnaire de qualification</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Ces informations nous permettent de mieux comprendre votre activité et de vous proposer des solutions adaptées.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthlyInvoicing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume mensuel de facturation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un volume" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MONTHLY_INVOICING.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Délais de paiement habituels</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un délai" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PAYMENT_TERMS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de clients</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CLIENT_TYPES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="financingPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objectif du financement</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un objectif" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FINANCING_PURPOSE.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />
          
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    J'accepte les <a href="#" className="text-primary underline">conditions générales</a> et la <a href="#" className="text-primary underline">politique de confidentialité</a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            Créer mon compte
          </Button>
        </form>
      </Form>
    </div>
  )
} 