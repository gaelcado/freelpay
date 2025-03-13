"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  HeadingLG,
  HeadingSM,
  BodyMD,
  BodySM,
} from "@/components/ui/typography";
import InvoiceUploadStep from "@/components/onboarding/steps/InvoiceUploadStep";
import VerificationStep from "@/components/onboarding/steps/VerificationStep";
import CompletionStep from "@/components/onboarding/steps/CompletionStep";
import SignContractStep from "@/components/onboarding/steps/SignContractStep";
const STEPS = [
  {
    id: "upload",
    title: "Télécharger la facture",
    component: InvoiceUploadStep,
  },
  {
    id: "verify",
    title: "Vérification",
    component: VerificationStep,
  },
  {
    id: "sign",
    title: "Signer le contrat",
    component: SignContractStep,
  },
  {
    id: "complete",
    title: "Confirmation",
    component: CompletionStep,
  },
];

interface OnboardingFlowProps {
  children: React.ReactNode[];
  currentStep: number;
  onNext: (stepData: Record<string, string>) => void;
}

// Added to fix TypeScript issues for CompletionStep
type CompletionStepProps = {
  onNext: (data: Record<string, string>) => void;
  currentStep: number;
  formData: any;
  updateFormData?: (data: any) => void;
};
export default function OnboardingFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const CurrentStepComponent = STEPS[currentStepIndex].component;
  const NonCompleteStepComponent = CurrentStepComponent as React.ComponentType<{
    formData: any;
    updateFormData: (data: any) => void;
  }>;
  const CompleteStepComponent =
    CurrentStepComponent as React.ComponentType<CompletionStepProps>;
  const updateFormData = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };
  const finalOnNext = (data: Record<string, string>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    router.push("/dashboard");
  };
  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      router.push("/dashboard");
    }
  };
  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        {/* Progress steps - Desktop */}
        <div className="mb-8 hidden md:block">
          <HeadingLG className="mb-6">Déposer votre facture</HeadingLG>

          {/* Progress bar */}
          <div className="relative pt-2 pb-8">
            {/* Background track */}
            <div className="absolute top-5 left-0 w-full h-1 bg-muted-foreground/20 rounded-full" />

            {/* Progress fill */}
            <div
              className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
              }}
            />

            {/* Step markers */}
            <div className="relative flex justify-between">
              {STEPS.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-full border-2 transition-colors mb-2 z-10 bg-background",
                        isActive &&
                          "border-primary bg-primary text-primary-foreground",
                        isCompleted &&
                          "border-primary bg-primary text-primary-foreground",
                        !isActive &&
                          !isCompleted &&
                          "border-muted-foreground/20 text-muted-foreground",
                      )}
                    >
                      {isCompleted ? (
                        <ArrowRightIcon className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <BodySM
                      className={cn(
                        "font-medium text-center max-w-[100px]",
                        isActive && "text-foreground",
                        !isActive && "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </BodySM>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="shrink-0"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center text-sm">
            <span className="font-medium text-primary">
              Étape {currentStepIndex + 1}
            </span>
            <span className="mx-2">/</span>
            <span>{STEPS.length}</span>
          </div>
          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Mobile progress */}
        <div className="flex items-center gap-2 mb-6 md:hidden">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 rounded-full flex-1 transition-colors",
                index <= currentStepIndex
                  ? "bg-primary"
                  : "bg-muted-foreground/20",
              )}
            />
          ))}
        </div>

        {/* Step title - mobile only */}
        <div className="mb-6 md:hidden">
          <HeadingSM>{STEPS[currentStepIndex].title}</HeadingSM>
        </div>

        {/* Content card */}
        <div className="bg-card shadow-lg rounded-xl border border-border/50 overflow-hidden">
          {/* Desktop step header */}
          <div className="hidden md:flex items-center justify-between p-6 border-b border-border/30">
            <HeadingLG>{STEPS[currentStepIndex].title}</HeadingLG>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium text-primary">
                Étape {currentStepIndex + 1}
              </span>
              <span className="mx-2">/</span>
              <span>{STEPS.length}</span>
            </div>
          </div>

          {/* Step content */}
          <div className="p-6 md:p-8">
            {STEPS[currentStepIndex].id === "complete" ? (
              <CompleteStepComponent
                formData={formData}
                updateFormData={updateFormData}
                onNext={finalOnNext}
                currentStep={currentStepIndex}
              />
            ) : (
              <NonCompleteStepComponent
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </div>

          {/* Navigation buttons - only show if component doesn't handle its own navigation */}
          {currentStepIndex === 0 && (
            <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2">
              <Button
                onClick={() => updateFormData({})}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continuer
                <Icon className="ml-2 h-4 w-4" name="ChevronRightIcon" />
              </Button>
            </div>
          )}
        </div>

        {/* Help text - Footer */}
        <div className="mt-6 text-center md:text-left">
          <BodySM className="text-muted-foreground">
            Besoin d'aide ? Contactez-nous à{" "}
            <span className="text-primary font-medium">
              support@freelpay.com
            </span>
          </BodySM>
        </div>
      </div>
    </div>
  );
}
