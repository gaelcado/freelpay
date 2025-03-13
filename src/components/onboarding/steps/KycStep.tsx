"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Building,
  CreditCard,
  FileText,
  Upload,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the form schema
const kycFormSchema = z.object({
  // Identity verification
  identityDocument: z.any().optional(),
  selfie: z.any().optional(),
  // Business documents
  kbis: z.any().optional(),
  statusProof: z.any().optional(),
  bankDetails: z.any().optional(),
  addressProof: z.any().optional(),
  // Financial documents
  fiscalDocuments: z.array(z.any()).optional(),
  bankStatements: z.array(z.any()).optional(),
  // Credit card
  cardNumber: z
    .string()
    .min(16, {
      message: "Le numéro de carte doit contenir 16 chiffres",
    })
    .max(19, {
      message: "Le numéro de carte est invalide",
    }),
  cardExpiry: z.string().min(5, {
    message: "La date d'expiration est requise (MM/YY)",
  }),
  cardCvc: z.string().min(3, {
    message: "Le code CVC est requis",
  }),
  // Bank account
  bankName: z.string().min(1, {
    message: "Le nom de la banque est requis",
  }),
});
type KycFormValues = z.infer<typeof kycFormSchema>;

// Bank options
const BANKS = [
  {
    value: "bnp",
    label: "BNP Paribas",
  },
  {
    value: "sg",
    label: "Société Générale",
  },
  {
    value: "ca",
    label: "Crédit Agricole",
  },
  {
    value: "lcl",
    label: "LCL",
  },
  {
    value: "ce",
    label: "Caisse d'Épargne",
  },
  {
    value: "cm",
    label: "Crédit Mutuel",
  },
  {
    value: "bp",
    label: "Banque Populaire",
  },
  {
    value: "ing",
    label: "ING Direct",
  },
  {
    value: "boursorama",
    label: "Boursorama",
  },
  {
    value: "hello",
    label: "Hello Bank",
  },
  {
    value: "autre",
    label: "Autre",
  },
];

type KycStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
};
export default function KycStep({ formData, updateFormData }: KycStepProps) {
  const [activeTab, setActiveTab] = useState("identity");
  const [uploadProgress, setUploadProgress] = useState({
    identity: 0,
    business: 0,
    financial: 0,
    payment: 0,
  });

  // Initialize form with existing data
  const form = useForm<KycFormValues>({
    resolver: zodResolver(kycFormSchema),
    defaultValues: {
      cardNumber: formData.creditCard?.number || "",
      cardExpiry: formData.creditCard?.expiry || "",
      cardCvc: formData.creditCard?.cvc || "",
      bankName: formData.bankAccount?.bank || "",
    },
  });

  // Handle form submission
  function onSubmit(data: KycFormValues) {
    // Update form data in parent component
    updateFormData({
      identityDocument: data.identityDocument,
      selfie: data.selfie,
      kbis: data.kbis,
      statusProof: data.statusProof,
      bankDetails: data.bankDetails,
      addressProof: data.addressProof,
      fiscalDocuments: data.fiscalDocuments,
      bankStatements: data.bankStatements,
      creditCard: {
        number: data.cardNumber,
        expiry: data.cardExpiry,
        cvc: data.cardCvc,
      },
      bankAccount: {
        connected: true,
        bank: data.bankName,
      },
    });
  }

  // Simulate file upload
  const handleFileUpload = (
    field: string,
    section: keyof typeof uploadProgress,
  ) => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({
        ...prev,
        [section]: progress,
      }));
      if (progress >= 100) {
        clearInterval(interval);

        // Move to next tab after upload completes
        if (section === "identity") {
          setTimeout(() => setActiveTab("business"), 500);
        } else if (section === "business") {
          setTimeout(() => setActiveTab("financial"), 500);
        } else if (section === "financial") {
          setTimeout(() => setActiveTab("payment"), 500);
        }
      }
    }, 300);
  };

  // Calculate overall progress
  const overallProgress =
    (uploadProgress.identity +
      uploadProgress.business +
      uploadProgress.financial +
      uploadProgress.payment) /
    4;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Vérification d'identité et documents
        </h3>
        <p className="text-sm text-muted-foreground">
          Pour sécuriser votre compte et respecter les réglementations, nous
          avons besoin de vérifier votre identité et vos informations
          professionnelles.
        </p>
        <Progress value={overallProgress} className="h-2" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger
            value="identity"
            disabled={
              uploadProgress.identity < 100 && uploadProgress.identity > 0
            }
          >
            <User className="h-4 w-4 mr-2" />
            Identité
          </TabsTrigger>
          <TabsTrigger
            value="business"
            disabled={
              uploadProgress.identity !== 100 ||
              (uploadProgress.business < 100 && uploadProgress.business > 0)
            }
          >
            <Building className="h-4 w-4 mr-2" />
            Entreprise
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            disabled={
              uploadProgress.business !== 100 ||
              (uploadProgress.financial < 100 && uploadProgress.financial > 0)
            }
          >
            <FileText className="h-4 w-4 mr-2" />
            Finances
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            disabled={uploadProgress.financial !== 100}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Paiement
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="identity" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Document d'identité
                    </CardTitle>
                    <CardDescription>
                      Carte d'identité, passeport ou permis de conduire
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.identity === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleFileUpload("identityDocument", "identity")
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : uploadProgress.identity === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Document téléchargé
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.identity}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.identity}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Selfie avec document
                    </CardTitle>
                    <CardDescription>
                      Prenez une photo de vous tenant votre document d'identité
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.identity === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleFileUpload("selfie", "identity")}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Prendre une photo
                      </Button>
                    ) : uploadProgress.identity === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Photo téléchargée
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.identity}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.identity}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Kbis</CardTitle>
                    <CardDescription>
                      Document officiel attestant l'existence juridique de
                      l'entreprise
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.business === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleFileUpload("kbis", "business")}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : uploadProgress.business === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Document téléchargé
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.business}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.business}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Attestation URSSAF
                    </CardTitle>
                    <CardDescription>
                      Justificatif de statut ou attestation URSSAF
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.business === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleFileUpload("statusProof", "business")
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : uploadProgress.business === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Document téléchargé
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.business}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.business}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      RIB professionnel
                    </CardTitle>
                    <CardDescription>
                      Relevé d'identité bancaire de votre compte professionnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.business === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleFileUpload("bankDetails", "business")
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : uploadProgress.business === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Document téléchargé
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.business}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.business}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Justificatif de domicile
                    </CardTitle>
                    <CardDescription>
                      Facture d'électricité, de gaz ou de téléphone de moins de
                      3 mois
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.business === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleFileUpload("addressProof", "business")
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : uploadProgress.business === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Document téléchargé
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.business}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.business}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Liasses fiscales
                    </CardTitle>
                    <CardDescription>
                      Dernières liasses fiscales (3 dernières années si
                      disponibles)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.financial === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleFileUpload("fiscalDocuments", "financial")
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : uploadProgress.financial === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Documents téléchargés
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.financial}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.financial}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Relevés bancaires
                    </CardTitle>
                    <CardDescription>
                      Relevés bancaires des 12 derniers mois
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadProgress.financial === 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleFileUpload("bankStatements", "financial")
                        }
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : uploadProgress.financial === 100 ? (
                      <div className="flex items-center justify-center p-4 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium text-primary">
                          Documents téléchargés
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Progress
                          value={uploadProgress.financial}
                          className="h-2"
                        />

                        <p className="text-xs text-center text-muted-foreground">
                          Téléchargement en cours... {uploadProgress.financial}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Alternative :</span> Vous pouvez
                  connecter directement votre compte bancaire via notre système
                  d'Open Banking sécurisé pour éviter de télécharger
                  manuellement vos relevés.
                </p>
                <Button type="button" className="mt-2">
                  Connecter ma banque
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4 pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Carte bancaire</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enregistrez une carte bancaire pour les frais de service et
                    la réception des fonds.
                  </p>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de carte</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="4242 4242 4242 4242"
                                {...field}
                              />

                              <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cardExpiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date d'expiration</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardCvc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-2">
                    Connexion du compte bancaire
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connectez votre compte bancaire pour recevoir les fonds et
                    permettre l'analyse de votre solvabilité.
                  </p>

                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banque</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre banque" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BANKS.map((bank) => (
                              <SelectItem key={bank.value} value={bank.value}>
                                {bank.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Vous serez redirigé vers le portail sécurisé de votre
                          banque pour autoriser l'accès.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" className="mt-4 w-full">
                    Connecter mon compte bancaire
                  </Button>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Note :</span> Vos informations
                    bancaires sont sécurisées et chiffrées. Nous n'avons accès
                    qu'aux données nécessaires pour le financement de vos
                    factures.
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Valider mes informations
                </Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
