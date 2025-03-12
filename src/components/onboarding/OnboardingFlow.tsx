"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Icon } from "@/components/ui/icon"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeadingLG, HeadingSM, BodyMD, BodySM } from "@/components/ui/typography"
import InvoiceUploadStep from "@/components/onboarding/steps/InvoiceUploadStep"
import VerificationStep from "@/components/onboarding/steps/VerificationStep"
import CompletionStep from "@/components/onboarding/steps/CompletionStep"
import SignContractStep from "@/components/onboarding/steps/SignContractStep"

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
]

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
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState({})
  const router = useRouter()

  const CurrentStepComponent = STEPS[currentStepIndex].component
  const NonCompleteStepComponent = CurrentStepComponent as React.ComponentType<{ formData: any; updateFormData: (data: any) => void }>
  const CompleteStepComponent = CurrentStepComponent as React.ComponentType<CompletionStepProps>

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const finalOnNext = (data: Record<string, string>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    router.push("/dashboard");
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/branding/bg-last.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-background/0 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left sidebar - desktop only */}
        <div className="hidden lg:block lg:w-[360px] fixed h-full bg-background/80 backdrop-blur-md border-r border-border/30">
          <div className="flex flex-col h-full p-8">
            <div className="mb-12">
              <Image
                src="/branding/logo.svg"
                alt="Freelpay"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
            </div>

            {/* Progress steps */}
            <div className="space-y-6 mt-8">
              {STEPS.map((step, index) => {
                const isActive = index === currentStepIndex
                const isCompleted = index < currentStepIndex

                return (
                  <div key={step.id} className="relative">
                    {index > 0 && (
                      <div
                        className={cn(
                          "absolute -top-[24px] left-[15px] w-[2px] h-[24px]",
                          isCompleted
                            ? "bg-primary"
                            : "bg-muted-foreground/20"
                        )}
                      />
                    )}
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                          isActive &&
                            "border-primary bg-primary text-primary-foreground",
                          isCompleted &&
                            "border-primary bg-primary text-primary-foreground",
                          !isActive &&
                            !isCompleted &&
                            "border-muted-foreground/20 text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <ArrowRightIcon className="h-4 w-4" />
                        ) : (
                          <span className="text-sm">{index + 1}</span>
                        )}
                      </div>
                      <BodyMD
                        className={cn(
                          "font-medium",
                          isActive && "text-foreground",
                          !isActive && "text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </BodyMD>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-auto pt-8 border-t border-border/30">
              <BodySM className="text-muted-foreground">
                Besoin d'aide ? Contactez-nous à
              </BodySM>
              <BodyMD className="text-primary font-medium">
                support@freelpay.com
              </BodyMD>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-[360px]">
          <div className="max-w-3xl mx-auto px-4 lg:px-12 py-8">
            {/* Mobile header */}
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={goBack}
                className="shrink-0"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <Image
                src="/branding/logo.svg"
                alt="Freelpay"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
              <div className="w-9" /> {/* Spacer */}
            </div>

            {/* Mobile progress */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 rounded-full flex-1 transition-colors",
                    index <= currentStepIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  )}
                />
              ))}
            </div>

            {/* Step title - mobile only */}
            <div className="mb-6 lg:hidden">
              <HeadingSM>{STEPS[currentStepIndex].title}</HeadingSM>
            </div>

            {/* Content card */}
            <div className="bg-background/95 backdrop-blur-md shadow-lg rounded-xl border border-border/50 overflow-hidden">
              {/* Desktop step header */}
              <div className="hidden lg:flex items-center justify-between p-6 border-b border-border/30">
                <HeadingLG>{STEPS[currentStepIndex].title}</HeadingLG>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="font-medium text-primary">Étape {currentStepIndex + 1}</span>
                  <span className="mx-2">/</span>
                  <span>{STEPS.length}</span>
                </div>
              </div>

              {/* Step content */}
              <div className="p-6 lg:p-8">
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
                <div className="px-6 pb-6 lg:px-8 lg:pb-8 pt-2">
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
          </div>
        </main>
      </div>
    </div>
  )
} 