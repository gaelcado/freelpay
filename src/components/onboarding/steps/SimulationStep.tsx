"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Define the form schema
const simulationFormSchema = z.object({
  invoiceAmount: z.string().min(1, {
    message: "Le montant de la facture est requis",
  }),
  dueDate: z.date({
    required_error: "La date d'échéance est requise",
  }),
  clientType: z.string({
    required_error: "Le type de client est requis",
  }),
  sector: z.string({
    required_error: "Le secteur d'activité est requis",
  }),
  firstName: z.string().min(1, {
    message: "Le prénom est requis",
  }),
  lastName: z.string().min(1, {
    message: "Le nom est requis",
  }),
  email: z.string().email({
    message: "Email invalide",
  }),
  phone: z.string().min(1, {
    message: "Le numéro de téléphone est requis",
  }),
  siret: z
    .string()
    .min(14, {
      message: "Le numéro SIRET doit contenir 14 chiffres",
    })
    .max(14, {
      message: "Le numéro SIRET doit contenir 14 chiffres",
    }),
});
type SimulationFormValues = z.infer<typeof simulationFormSchema>;

// Client types
const CLIENT_TYPES = [
  {
    value: "pme",
    label: "PME",
  },
  {
    value: "grand-compte",
    label: "Grand compte",
  },
  {
    value: "public",
    label: "Institution publique",
  },
  {
    value: "association",
    label: "Association",
  },
];

// Sectors
const SECTORS = [
  {
    value: "tech",
    label: "Technologie",
  },
  {
    value: "sante",
    label: "Santé",
  },
  {
    value: "education",
    label: "Éducation",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "commerce",
    label: "Commerce",
  },
  {
    value: "industrie",
    label: "Industrie",
  },
  {
    value: "construction",
    label: "Construction",
  },
  {
    value: "transport",
    label: "Transport",
  },
  {
    value: "art",
    label: "Art et divertissement",
  },
  {
    value: "autre",
    label: "Autre",
  },
];

type SimulationStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
};
export default function SimulationStep({
  formData,
  updateFormData,
}: SimulationStepProps) {
  const [showResults, setShowResults] = useState(false);
  const [simulationResult, setSimulationResult] = useState({
    eligible: true,
    financedAmount: 0,
    discountRate: 0,
    fees: 0,
    totalAmount: 0,
  });

  // Initialize form with existing data
  const form = useForm<SimulationFormValues>({
    resolver: zodResolver(simulationFormSchema),
    defaultValues: {
      invoiceAmount: formData.invoiceAmount || "",
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      clientType: formData.clientType || "",
      sector: formData.sector || "",
      firstName: formData.contactInfo?.firstName || "",
      lastName: formData.contactInfo?.lastName || "",
      email: formData.contactInfo?.email || "",
      phone: formData.contactInfo?.phone || "",
      siret: formData.contactInfo?.siret || "",
    },
  });

  // Handle form submission
  function onSubmit(data: SimulationFormValues) {
    // Update form data in parent component
    updateFormData({
      invoiceAmount: data.invoiceAmount,
      dueDate: data.dueDate,
      clientType: data.clientType,
      sector: data.sector,
      contactInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        siret: data.siret,
      },
    });

    // Calculate simulation result
    const amount = parseFloat(data.invoiceAmount);
    const discountRate = 0.03; // 3% discount rate
    const fees = 25; // Fixed fee

    const financedAmount = amount * (1 - discountRate) - fees;
    setSimulationResult({
      eligible: true,
      financedAmount,
      discountRate: discountRate * 100,
      fees,
      totalAmount: amount,
    });
    setShowResults(true);
  }
  return (
    <div className="space-y-8">
      {!showResults ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Informations sur la facture
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="invoiceAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Montant de la facture (€)</FormLabel>
                      <FormControl>
                        <Input placeholder="5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date d'échéance</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", {
                                  locale: fr,
                                })
                              ) : (
                                <span>Sélectionnez une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() ||
                              date >
                                new Date(
                                  new Date().setMonth(
                                    new Date().getMonth() + 6,
                                  ),
                                )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de client</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type de client" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CLIENT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
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
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secteur d'activité</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un secteur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SECTORS.map((sector) => (
                            <SelectItem key={sector.value} value={sector.value}>
                              {sector.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Télécharger une facture (optionnel)
                </Button>
                <FormDescription className="mt-2">
                  Formats acceptés: PDF, PNG, JPG (max 5MB)
                </FormDescription>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vos coordonnées</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="jean.dupont@example.com"
                          {...field}
                        />
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

              <FormField
                control={form.control}
                name="siret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro SIRET</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678901234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Simuler le financement
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="rounded-lg border p-4 bg-muted/50">
            <h3 className="text-lg font-medium mb-4">
              Résultat de la simulation
            </h3>

            {simulationResult.eligible ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Montant de la facture
                  </span>
                  <span className="font-medium">
                    {parseFloat(formData.invoiceAmount).toLocaleString("fr-FR")}{" "}
                    €
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taux d'escompte</span>
                  <span className="font-medium">
                    {simulationResult.discountRate}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Frais de service
                  </span>
                  <span className="font-medium">{simulationResult.fees} €</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Montant financé</span>
                  <span className="text-xl font-bold text-primary">
                    {simulationResult.financedAmount.toLocaleString("fr-FR")} €
                  </span>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm">
                    Vous pouvez recevoir{" "}
                    <span className="font-bold">
                      {simulationResult.financedAmount.toLocaleString("fr-FR")}{" "}
                      €
                    </span>{" "}
                    immédiatement sur votre compte bancaire en finançant cette
                    facture avec Freelpay.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-destructive/10 p-4 rounded-lg">
                <p className="text-sm">
                  Désolé, cette facture n'est pas éligible au financement.
                  Veuillez vérifier les informations saisies ou nous contacter
                  pour plus d'informations.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Prêt à commencer ?</h3>
            <p className="text-sm text-muted-foreground">
              Créez votre compte pour finaliser votre demande de financement et
              recevoir les fonds rapidement.
            </p>
            <Button
              onClick={() => setShowResults(false)}
              variant="outline"
              className="w-full"
            >
              Modifier la simulation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
