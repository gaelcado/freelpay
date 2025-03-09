"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"

// Onboarding Steps
import SimulationStep from "./steps/SimulationStep"
import RegistrationStep from "./steps/RegistrationStep"
import KycStep from "./steps/KycStep"
import FinancingStep from "./steps/FinancingStep"
import CompletionStep from "./steps/CompletionStep"

// Define the steps of the onboarding flow
const STEPS = [
  { id: "simulation", title: "Simulation", description: "Simulez le financement d'une facture" },
  { id: "registration", title: "Inscription", description: "Créez votre compte Freelpay" },
  { id: "kyc", title: "Vérification KYC", description: "Vérifiez votre identité" },
  { id: "financing", title: "Financement", description: "Configurez votre financement" },
  { id: "completion", title: "Terminé", description: "Votre compte est prêt" }
]

export default function OnboardingFlow() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Simulation data
    invoiceAmount: "",
    dueDate: "",
    clientType: "",
    sector: "",
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      siret: ""
    },
    
    // Registration data
    password: "",
    legalStatus: "",
    businessAddress: "",
    activity: "",
    
    // KYC data
    identityDocument: null,
    selfie: null,
    kbis: null,
    statusProof: null,
    bankDetails: null,
    addressProof: null,
    fiscalDocuments: [],
    bankStatements: [],
    creditCard: {
      number: "",
      expiry: "",
      cvc: ""
    },
    bankAccount: {
      connected: false,
      bank: ""
    },
    
    // Financing data
    invoiceFile: null,
    clientDetails: {
      name: "",
      siret: "",
      address: ""
    },
    paymentTerms: "",
    financingAmount: ""
  })

  // Calculate progress percentage
  const progress = ((currentStep + 1) / STEPS.length) * 100

  // Handle form data updates
  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Complete onboarding
      router.push("/dashboard")
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SimulationStep formData={formData} updateFormData={updateFormData} />
      case 1:
        return <RegistrationStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <KycStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <FinancingStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <CompletionStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Freelpay</h1>
          <p className="text-muted-foreground">
            Financez vos factures en quelques clics
          </p>
        </div>
        <ThemeSwitcher />
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className={`text-sm font-medium ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step content */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          <Button 
            onClick={nextStep}
          >
            {currentStep === STEPS.length - 1 ? "Terminer" : "Suivant"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 