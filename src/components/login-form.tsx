"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  BodySM, 
  BodyXS,
  Label,
  ResponsiveHeadingSM
} from "@/components/ui/typography"
import { useState } from "react"
import { signInWithEmail, signUpWithEmail } from "@/app/api/auth"
import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HCaptchaComponent } from "./ui/hcaptcha"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [sirenNumber, setSirenNumber] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const { setIsAuthenticated, isMockMode } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent, isLogin: boolean) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // En mode mock, simuler une connexion réussie
      if (isMockMode) {
        setTimeout(() => {
          setIsAuthenticated(true)
          toast({
            title: "Mode développement",
            description: isLogin 
              ? "Connexion simulée avec succès" 
              : "Inscription simulée avec succès",
          })
          router.push('/dashboard')
          setIsLoading(false)
        }, 1000)
        return
      }

      if (isLogin) {
        // Connexion
        const { session } = await signInWithEmail(email, password)
        
        if (session) {
          localStorage.setItem('token', session.access_token)
          setIsAuthenticated(true)
          toast({
            title: "Succès",
            description: "Vous êtes connecté avec succès",
          })
          router.push('/dashboard')
        }
      } else {
        // Inscription
        if (!captchaToken && !isMockMode) {
          toast({
            title: "Erreur",
            description: "Veuillez compléter le captcha",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        // Créer l'objet utilisateur
        const user = {
          id: crypto.randomUUID(),
          username,
          email,
          password,
          siren_number: sirenNumber,
          phone,
          address,
        }

        const { session } = await signUpWithEmail(user, captchaToken)

        if (session) {
          localStorage.setItem('token', session.access_token)
          setIsAuthenticated(true)
          toast({
            title: "Succès",
            description: "Votre compte a été créé avec succès",
          })
          router.push('/dashboard')
        }
      }
    } catch (error: any) {
      console.error("Erreur d'authentification:", error)
      const message = error instanceof Error ? error.message : "Une erreur est survenue lors de l'authentification."
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Connexion</TabsTrigger>
        <TabsTrigger value="signup">Inscription</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <form 
          className={cn("flex flex-col gap-6", className)} 
          {...props}
          onSubmit={(e) => handleSubmit(e, true)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <ResponsiveHeadingSM>Connectez-vous à votre compte</ResponsiveHeadingSM>
            <BodySM className="text-muted-foreground text-balance">
              Entrez votre email ci-dessous pour vous connecter à votre compte
            </BodySM>
            {isMockMode && (
              <BodyXS className="text-yellow-600 font-medium">
                Mode développement: Remplissez simplement le formulaire et cliquez sur Se connecter
              </BodyXS>
            )}
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </div>
        </form>
      </TabsContent>
      
      <TabsContent value="signup">
        <form 
          className={cn("flex flex-col gap-6", className)} 
          {...props}
          onSubmit={(e) => handleSubmit(e, false)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <ResponsiveHeadingSM>Créez votre compte</ResponsiveHeadingSM>
            <BodySM className="text-muted-foreground text-balance">
              Remplissez le formulaire ci-dessous pour créer votre compte
            </BodySM>
            {isMockMode && (
              <BodyXS className="text-yellow-600 font-medium">
                Mode développement: Remplissez simplement le formulaire et cliquez sur S'inscrire
              </BodyXS>
            )}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input 
                id="username" 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input 
                id="signup-email" 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-password">Mot de passe</Label>
              <Input 
                id="signup-password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="siren">Numéro SIREN</Label>
              <Input 
                id="siren" 
                type="text" 
                value={sirenNumber}
                onChange={(e) => setSirenNumber(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adresse</Label>
              <Input 
                id="address" 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            
            {/* Composant hCaptcha - affiché uniquement si pas en mode mock */}
            {!isMockMode && <HCaptchaComponent onVerify={setCaptchaToken} />}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  )
}
