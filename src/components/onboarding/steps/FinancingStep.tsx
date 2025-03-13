"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, FileText, Upload } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the form schema
const financingFormSchema = z.object({
  invoiceFile: z.any().optional(),
  clientName: z.string().min(1, {
    message: "Le nom du client est requis",
  }),
  clientSiret: z
    .string()
    .min(14, {
      message: "Le numéro SIRET doit contenir 14 chiffres",
    })
    .max(14, {
      message: "Le numéro SIRET doit contenir 14 chiffres",
    }),
  clientAddress: z.string().min(1, {
    message: "L'adresse du client est requise",
  }),
  invoiceAmount: z.string().min(1, {
    message: "Le montant de la facture est requis",
  }),
  invoiceDate: z.date({
    required_error: "La date de la facture est requise",
  }),
  dueDate: z.date({
    required_error: "La date d'échéance est requise",
  }),
  invoiceNumber: z.string().min(1, {
    message: "Le numéro de facture est requis",
  }),
  serviceDescription: z.string().min(1, {
    message: "La description des services est requise",
  }),
  paymentTerms: z.string({
    required_error: "Les conditions de paiement sont requises",
  }),
  financingAmount: z.string().min(1, {
    message: "Le montant à financer est requis",
  }),
});
type FinancingFormValues = z.infer<typeof financingFormSchema>;

// Payment terms options
const PAYMENT_TERMS = [
  {
    value: "30-days",
    label: "30 jours",
  },
  {
    value: "45-days",
    label: "45 jours",
  },
  {
    value: "60-days",
    label: "60 jours",
  },
  {
    value: "90-days",
    label: "90 jours",
  },
  {
    value: "custom",
    label: "Autre",
  },
];

type FinancingStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
};
export default function FinancingStep({
  formData,
  updateFormData,
}: FinancingStepProps) {
  const [showFinancingDetails, setShowFinancingDetails] = useState(false);
  const [financingResult, setFinancingResult] = useState({
    approved: true,
    financedAmount: 0,
    discountRate: 0,
    fees: 0,
    totalAmount: 0,
    estimatedPaymentDate: new Date(),
  });

  // Initialize form with existing data
  const form = useForm<FinancingFormValues>({
    resolver: zodResolver(financingFormSchema),
    defaultValues: {
      clientName: formData.clientDetails?.name || "",
      clientSiret: formData.clientDetails?.siret || "",
      clientAddress: formData.clientDetails?.address || "",
      invoiceAmount: formData.invoiceAmount || "",
      invoiceDate: new Date(),
      dueDate: formData.dueDate
        ? new Date(formData.dueDate)
        : new Date(new Date().setDate(new Date().getDate() + 30)),
      invoiceNumber: "",
      serviceDescription: "",
      paymentTerms: formData.paymentTerms || "30-days",
      financingAmount: formData.financingAmount || formData.invoiceAmount || "",
    },
  });

  // Handle form submission
  function onSubmit(data: FinancingFormValues) {
    // Update form data in parent component
    updateFormData({
      invoiceFile: data.invoiceFile,
      clientDetails: {
        name: data.clientName,
        siret: data.clientSiret,
        address: data.clientAddress,
      },
      invoiceAmount: data.invoiceAmount,
      dueDate: data.dueDate,
      paymentTerms: data.paymentTerms,
      financingAmount: data.financingAmount,
    });

    // Calculate financing details
    const amount = parseFloat(data.financingAmount);
    const discountRate = 0.03; // 3% discount rate
    const fees = 25; // Fixed fee

    const financedAmount = amount * (1 - discountRate) - fees;

    // Set payment date to tomorrow
    const paymentDate = new Date();
    paymentDate.setDate(paymentDate.getDate() + 1);
    setFinancingResult({
      approved: true,
      financedAmount,
      discountRate: discountRate * 100,
      fees,
      totalAmount: amount,
      estimatedPaymentDate: paymentDate,
    });
    setShowFinancingDetails(true);
  }
  return (
    <div className="space-y-8">
      {!showFinancingDetails ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Téléchargement de la facture
              </h3>
              <p className="text-sm text-muted-foreground">
                Téléchargez votre facture ou saisissez manuellement les
                informations.
              </p>

              <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />

                <h4 className="text-base font-medium mb-2">
                  Téléchargez votre facture
                </h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Formats acceptés: PDF, PNG, JPG (max 5MB)
                </p>
                <Button type="button" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Parcourir les fichiers
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Informations sur le client
              </h3>

              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du client</FormLabel>
                    <FormControl>
                      <Input placeholder="Entreprise ABC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientSiret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SIRET du client</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678901234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse du client</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 rue de Paris, 75001 Paris"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Détails de la facture</h3>

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
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de facture</FormLabel>
                      <FormControl>
                        <Input placeholder="FACT-2023-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="invoiceDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de la facture</FormLabel>
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
                              date > new Date() ||
                              date <
                                new Date(
                                  new Date().setMonth(
                                    new Date().getMonth() - 3,
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

              <FormField
                control={form.control}
                name="serviceDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description des services</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez les services ou produits fournis"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conditions de paiement</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez les conditions de paiement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PAYMENT_TERMS.map((term) => (
                          <SelectItem key={term.value} value={term.value}>
                            {term.label}
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
              <h3 className="text-lg font-medium">Montant à financer</h3>

              <FormField
                control={form.control}
                name="financingAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant à financer (€)</FormLabel>
                    <FormControl>
                      <Input placeholder="5000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Vous pouvez financer tout ou partie du montant de la
                      facture.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Demander le financement
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <Card className="border-primary">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-primary">
                Demande de financement approuvée
              </CardTitle>
              <CardDescription>
                Votre demande de financement a été approuvée. Voici les détails
                du financement.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Montant de la facture
                </span>
                <span className="font-medium">
                  {parseFloat(form.getValues().invoiceAmount).toLocaleString(
                    "fr-FR",
                  )}{" "}
                  €
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Montant financé</span>
                <span className="font-medium">
                  {parseFloat(form.getValues().financingAmount).toLocaleString(
                    "fr-FR",
                  )}{" "}
                  €
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Taux d'escompte</span>
                <span className="font-medium">
                  {financingResult.discountRate}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Frais de service</span>
                <span className="font-medium">{financingResult.fees} €</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-medium">Montant à recevoir</span>
                <span className="text-xl font-bold text-primary">
                  {financingResult.financedAmount.toLocaleString("fr-FR")} €
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Date estimée de paiement
                </span>
                <span className="font-medium">
                  {format(financingResult.estimatedPaymentDate, "PPP", {
                    locale: fr,
                  })}
                </span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 flex flex-col items-start">
              <p className="text-sm">
                <span className="font-medium">Note :</span> Les fonds seront
                virés sur votre compte bancaire dans les 24 heures ouvrées
                suivant la validation de votre demande.
              </p>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Prochaines étapes</h3>
            <p className="text-sm text-muted-foreground">
              Votre demande de financement a été approuvée. Voici les prochaines
              étapes :
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Nous générons un devis pour vous et votre client</li>
              <li>Vous et votre client signez le devis électroniquement</li>
              <li>Vous réalisez la mission et nous générons la facture</li>
              <li>Nous vous versons les fonds sur votre compte bancaire</li>
              <li>Votre client paie la facture à Freelpay à l'échéance</li>
            </ol>
          </div>

          <Button
            onClick={() => setShowFinancingDetails(false)}
            variant="outline"
            className="w-full"
          >
            Modifier la demande
          </Button>
        </div>
      )}
    </div>
  );
}
