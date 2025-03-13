"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Slider } from "@/components/ui/slider";
import { HeadingLG, BodyMD, HeadingMD } from "@/components/ui/typography";
import { ArrowLeft, Calculator } from "lucide-react";
import Link from "next/link";
export default function SimulationPage() {
  const [invoiceAmount, setInvoiceAmount] = useState(5000);
  const [paymentTerm, setPaymentTerm] = useState(30);
  const [clientType, setClientType] = useState("enterprise");
  const [showResults, setShowResults] = useState(false);

  // Simulated calculation based on inputs
  const calculateRate = () => {
    // Base rate depends on client type
    let baseRate = clientType === "enterprise" ? 3.5 : 4.5;

    // Adjust based on payment term
    if (paymentTerm <= 30) {
      baseRate -= 0.5;
    } else if (paymentTerm >= 90) {
      baseRate += 1.0;
    }

    // Adjust based on invoice amount
    if (invoiceAmount >= 10000) {
      baseRate -= 0.5;
    } else if (invoiceAmount < 2000) {
      baseRate += 0.5;
    }
    return Math.max(2.5, Math.min(6.0, baseRate)).toFixed(2);
  };
  const rate = parseFloat(calculateRate());
  const financedAmount = invoiceAmount * (1 - rate / 100);
  const fee = invoiceAmount - financedAmount;
  const handleSimulate = () => {
    setShowResults(true);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <HeadingLG>Simulation de financement</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Simulez le financement d'une facture pour estimer le montant et le
            taux
          </BodyMD>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/financing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux financements
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de simulation</CardTitle>
            <CardDescription>
              Entrez les détails de votre facture pour simuler le financement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="invoice-amount">Montant de la facture (€)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="invoice-amount"
                  min={1000}
                  max={50000}
                  step={500}
                  value={[invoiceAmount]}
                  onValueChange={(value) => setInvoiceAmount(value[0])}
                  className="flex-1"
                />

                <Input
                  type="number"
                  min={1000}
                  max={50000}
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-term">Délai de paiement (jours)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="payment-term"
                  min={15}
                  max={120}
                  step={15}
                  value={[paymentTerm]}
                  onValueChange={(value) => setPaymentTerm(value[0])}
                  className="flex-1"
                />

                <Input
                  type="number"
                  min={15}
                  max={120}
                  value={paymentTerm}
                  onChange={(e) => setPaymentTerm(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-type">Type de client</Label>
              <Select value={clientType} onValueChange={setClientType}>
                <SelectTrigger id="client-type">
                  <SelectValue placeholder="Sélectionner le type de client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Grande entreprise</SelectItem>
                  <SelectItem value="sme">PME</SelectItem>
                  <SelectItem value="public">Secteur public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSimulate} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Simuler le financement
            </Button>
          </CardContent>
        </Card>

        <Card className={showResults ? "border-primary" : "opacity-70"}>
          <CardHeader>
            <CardTitle>Résultats de la simulation</CardTitle>
            <CardDescription>
              Estimation basée sur vos paramètres
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <HeadingMD className="text-primary">Taux d'escompte</HeadingMD>
                <div className="text-3xl font-bold">{rate}%</div>
                <BodyMD className="text-muted-foreground">
                  Taux appliqué sur le montant de la facture
                </BodyMD>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Montant de la facture:</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(invoiceAmount)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Frais de financement:</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(fee)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Montant financé:</span>
                  <span className="text-primary">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(financedAmount)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/financing/new">
                Demander un financement
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
