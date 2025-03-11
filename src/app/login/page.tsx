import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import { NavText } from "@/components/ui/typography"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <NavText className="font-medium">Acme Inc.</NavText>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/branding/login2.png"
          alt="Image d'arrière-plan de connexion"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  )
}
