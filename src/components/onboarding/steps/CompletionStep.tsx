"use client";

import {
  CheckCircle,
  Download,
  ArrowRight,
  Clock,
  CreditCard,
  Mail,
} from "lucide-react";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  HeadingLG,
  HeadingMD,
  HeadingSM,
  BodyLG,
  BodyMD,
  BodySM,
} from "@/components/ui/typography";
interface CompletionStepProps {
  onNext: (data: Record<string, string>) => void;
  currentStep: number;
  formData: any;
  updateFormData?: (data: any) => void;
}
export default function CompletionStep({
  formData,
  onNext,
  currentStep,
}: CompletionStepProps) {
  // Calculate financing details
  const invoiceAmount = parseFloat(formData.invoiceAmount || "0");
  const discountRate = formData.financingRate || 0.03; // 3% default
  const fees = formData.financingFees || 25; // Default fee
  const financedAmount = invoiceAmount * (1 - discountRate) - fees;

  // Format dates
  const today = new Date();
  const paymentDate = addDays(today, 1);
  const formattedPaymentDate = format(paymentDate, "PPP", {
    locale: fr,
  });
  return (
    <div className="space-y-8">
      {/* Success header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
        </div>

        <div>
          <HeadingLG className="text-emerald-800 dark:text-emerald-500">
            Félicitations !
          </HeadingLG>
          <BodyLG className="text-muted-foreground mt-1">
            Votre demande de financement a été approuvée
          </BodyLG>
        </div>
      </div>

      {/* Financing details */}
      <Card className="border-border/50 overflow-hidden">
        <div className="bg-muted/30 px-6 py-4 border-b border-border/30">
          <HeadingSM>Détails du financement</HeadingSM>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <BodyMD className="text-muted-foreground">
                    Montant financé
                  </BodyMD>
                  <HeadingMD className="text-primary">
                    {financedAmount.toFixed(2)}€
                  </HeadingMD>
                </div>
              </div>

              <Separator className="bg-border/50" />

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="text-muted-foreground">Montant facture:</div>
                <div className="font-medium text-right">
                  {invoiceAmount.toFixed(2)}€
                </div>

                <div className="text-muted-foreground">Taux d'escompte:</div>
                <div className="font-medium text-right">
                  {(discountRate * 100).toFixed(1)}%
                </div>

                <div className="text-muted-foreground">Frais de service:</div>
                <div className="font-medium text-right">{fees.toFixed(2)}€</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <BodyMD className="text-muted-foreground">
                    Date de paiement
                  </BodyMD>
                  <HeadingMD>{formattedPaymentDate}</HeadingMD>
                </div>
              </div>

              <Separator className="bg-border/50" />

              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-md">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-500" />

                <BodySM>
                  Un email de confirmation a été envoyé à{" "}
                  <span className="font-medium">
                    {formData.userDetails?.email || "votre adresse email"}
                  </span>
                </BodySM>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next steps */}
      <Card className="border-border/50 overflow-hidden">
        <div className="bg-muted/30 px-6 py-4 border-b border-border/30">
          <HeadingSM>Prochaines étapes</HeadingSM>
        </div>

        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            <div className="p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm font-medium">1</span>
              </div>
              <div>
                <BodyMD className="font-medium">
                  Téléchargez votre contrat
                </BodyMD>
                <BodySM className="text-muted-foreground mb-3">
                  Conservez une copie de votre contrat de financement
                </BodySM>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Télécharger le contrat
                </Button>
              </div>
            </div>

            <div className="p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm font-medium">2</span>
              </div>
              <div>
                <BodyMD className="font-medium">
                  Accédez à votre tableau de bord
                </BodyMD>
                <BodySM className="text-muted-foreground mb-3">
                  Suivez l'état de vos financements et gérez vos factures
                </BodySM>
                <Button className="gap-1.5 bg-primary hover:bg-primary/90">
                  Aller au tableau de bord
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support info */}
      <div className="text-center space-y-2 pt-4">
        <BodyMD className="text-muted-foreground">
          Besoin d'aide ou de renseignements ?
        </BodyMD>
        <BodyMD className="font-medium">
          Contactez notre équipe au{" "}
          <span className="text-primary">01 23 45 67 89</span> ou par email à{" "}
          <span className="text-primary">support@freelpay.com</span>
        </BodyMD>
      </div>
    </div>
  );
}
