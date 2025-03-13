"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HeadingLG, BodyMD } from "@/components/ui/typography";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
export default function NewFinancingPage() {
  const router = useRouter();
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mock data for invoices
  const mockInvoices = [
    {
      id: "INV-001",
      client: "Acme Inc.",
      amount: 2500,
    },
    {
      id: "INV-003",
      client: "Stark Industries",
      amount: 3200,
    },
    {
      id: "INV-004",
      client: "Wayne Enterprises",
      amount: 4500,
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally submit the form data to your API
    alert("Demande de financement soumise avec succès!");
    router.push("/dashboard/financing");
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <HeadingLG>Nouvelle demande de financement</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Soumettez une facture pour obtenir un financement immédiat
          </BodyMD>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/financing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux financements
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sélection de facture</CardTitle>
              <CardDescription>
                Choisissez une facture existante ou téléchargez-en une nouvelle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="invoice-select">Facture existante</Label>
                <Select
                  value={selectedInvoice}
                  onValueChange={setSelectedInvoice}
                >
                  <SelectTrigger id="invoice-select">
                    <SelectValue placeholder="Sélectionner une facture" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInvoices.map((invoice) => (
                      <SelectItem key={invoice.id} value={invoice.id}>
                        {invoice.id} - {invoice.client} (
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(invoice.amount)}
                        )
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative space-y-2">
                <div className="flex items-center">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="px-2 text-sm text-muted-foreground">OU</span>
                  <div className="flex-1 border-t border-border"></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoice-upload">
                  Télécharger une nouvelle facture
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Input
                    id="invoice-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <Label
                    htmlFor="invoice-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />

                    <span className="text-sm font-medium">
                      {uploadedFile
                        ? uploadedFile.name
                        : "Cliquez pour télécharger ou glissez-déposez"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PDF, JPG ou PNG (max. 10MB)
                    </span>
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations complémentaires</CardTitle>
              <CardDescription>
                Fournissez des détails supplémentaires pour faciliter le
                traitement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-term">
                    Délai de paiement (jours)
                  </Label>
                  <Input
                    id="payment-term"
                    type="number"
                    min="15"
                    defaultValue="30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-type">Type de client</Label>
                  <Select defaultValue="enterprise">
                    <SelectTrigger id="client-type">
                      <SelectValue placeholder="Sélectionner le type de client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">
                        Grande entreprise
                      </SelectItem>
                      <SelectItem value="sme">PME</SelectItem>
                      <SelectItem value="public">Secteur public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">
                  Informations supplémentaires
                </Label>
                <Textarea
                  id="additional-info"
                  placeholder="Précisez toute information qui pourrait être utile pour l'évaluation de votre demande..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/financing")}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={!selectedInvoice && !uploadedFile}>
              Soumettre la demande
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
