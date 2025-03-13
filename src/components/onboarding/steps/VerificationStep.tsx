"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Building2,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { HeadingSM, BodyMD } from "@/components/ui/typography";

// Define the form schema
const verificationFormSchema = z.object({
  // Invoice details
  invoiceAmount: z.string().min(1, {
    message: "Le montant est requis",
  }),
  dueDate: z.string().min(1, {
    message: "La date d'échéance est requise",
  }),
  // Client details
  clientName: z.string().min(1, {
    message: "Le nom du client est requis",
  }),
  clientSiret: z.string().min(9, {
    message: "Le SIRET doit contenir au moins 9 caractères",
  }),
  clientAddress: z.string().min(1, {
    message: "L'adresse du client est requise",
  }),
  // User details
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
    message: "Le téléphone est requis",
  }),
});
type VerificationFormValues = z.infer<typeof verificationFormSchema>;
type VerificationStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
};
export default function VerificationStep({
  formData,
  updateFormData,
}: VerificationStepProps) {
  // Initialize form with existing data
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      invoiceAmount: formData.invoiceAmount || "",
      dueDate: formData.dueDate || "",
      clientName: formData.clientDetails?.name || "",
      clientSiret: formData.clientDetails?.siret || "",
      clientAddress: formData.clientDetails?.address || "",
      firstName: formData.userDetails?.firstName || "",
      lastName: formData.userDetails?.lastName || "",
      email: formData.userDetails?.email || "",
      phone: formData.userDetails?.phone || "",
    },
  });

  // Handle form submission
  function onSubmit(data: VerificationFormValues) {
    // Update form data in parent component
    updateFormData({
      invoiceAmount: data.invoiceAmount,
      dueDate: data.dueDate,
      clientDetails: {
        name: data.clientName,
        siret: data.clientSiret,
        address: data.clientAddress,
      },
      userDetails: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
    });
  }
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <BodyMD className="text-muted-foreground">
          Nous avons extrait ces informations de votre facture. Veuillez les
          vérifier et les compléter si nécessaire.
        </BodyMD>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Invoice Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <HeadingSM>Informations de la facture</HeadingSM>
            </div>

            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="p-4 space-y-3">
                    <FormField
                      control={form.control}
                      name="invoiceAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Montant de la facture (€)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                className="pl-8 bg-background/50 border-border/50 focus-visible:ring-primary/30"
                              />

                              <CreditCard className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-4 space-y-3">
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Date d'échéance
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                className="pl-8 bg-background/50 border-border/50 focus-visible:ring-primary/30"
                              />

                              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <HeadingSM>Informations du client</HeadingSM>
            </div>

            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y divide-border">
                  <div className="p-4 space-y-3">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Nom du client
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                className="pl-8 bg-background/50 border-border/50 focus-visible:ring-primary/30"
                              />

                              <Building2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-4 space-y-3">
                      <FormField
                        control={form.control}
                        name="clientSiret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              SIRET du client
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-background/50 border-border/50 focus-visible:ring-primary/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="p-4 space-y-3">
                      <FormField
                        control={form.control}
                        name="clientAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Adresse du client
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-background/50 border-border/50 focus-visible:ring-primary/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <HeadingSM>Vos informations</HeadingSM>
            </div>

            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y divide-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-4 space-y-3">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Prénom
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  className="pl-8 bg-background/50 border-border/50 focus-visible:ring-primary/30"
                                />

                                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="p-4 space-y-3">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Nom
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-background/50 border-border/50 focus-visible:ring-primary/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-4 space-y-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  className="pl-8 bg-background/50 border-border/50 focus-visible:ring-primary/30"
                                />

                                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="p-4 space-y-3">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              Téléphone
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  className="pl-8 bg-background/50 border-border/50 focus-visible:ring-primary/30"
                                />

                                <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
          >
            Vérifier les informations
          </Button>
        </form>
      </Form>
    </div>
  );
}
