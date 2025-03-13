'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Cpu, Lock, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ModeToggle } from '@/components/theme-switch'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Définition des éléments du menu de navigation
const menuItems = [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'FAQ', href: '#faq' },
]

// Footer links
const footerLinks = [
    {
        title: 'Fonctionnalités',
        href: '#',
    },
    {
        title: 'Solution',
        href: '#',
    },
    {
        title: 'Clients',
        href: '#',
    },
    {
        title: 'Tarifs',
        href: '#',
    },
    {
        title: 'Aide',
        href: '#',
    },
    {
        title: 'À propos',
        href: '#',
    },
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3
        }
    }
}

// Logo Component
function Logo() {
    return (
        <Image
            className="overflow-hidden invert dark:invert-0"
            src="/branding/logo.svg"
            alt="FreelPay Logo"
            width={100}
            height={100}
            quality={85}
        />
    )
}

// Features Section Component
function FeaturesSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-12 px-6">
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-semibold">FreelPay révolutionne le paiement des freelances</h2>
                    <p className="max-w-sm sm:ml-auto">Donnez à votre activité la trésorerie dont elle a besoin grâce à notre solution de financement de factures simple et rapide.</p>
                </div>
                <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
                    <div className="aspect-88/36 relative">
                        <div className="bg-linear-to-t z-1 from-background absolute inset-0 to-transparent"></div>
                        <Image src="/branding/onboarding.png" className="absolute inset-0 z-10 rounded-xl" alt="illustration de paiements" width={2797} height={1137} quality={85} />
                    </div>
                </div>
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Rapide</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Recevez vos paiements en 24h, sans attendre les délais de paiement habituels.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Puissant</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Une solution complète qui s'adapte à tous les types de factures et de clients.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium">Sécurisé</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Vos données et transactions sont protégées par les meilleurs standards de sécurité.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium">IA Intégrée</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Notre technologie analyse instantanément vos factures pour un financement optimal.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// FAQ Section Component
function FAQs() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Questions <br className="hidden lg:block" /> Fréquentes <br className="hidden lg:block" />
                        </h2>
                        <p className="text-muted-foreground max-w-xs">Trouvez des réponses aux questions courantes sur notre service.</p>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <Accordion type="single" collapsible className="w-full [&>div]:w-full">
                                <AccordionItem value="refund" className="w-full">
                                    <AccordionTrigger className="w-full">Quelle est la politique de remboursement ?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">Nous offrons une garantie de remboursement de 30 jours. Si vous n'êtes pas satisfait de notre service, vous pouvez demander un remboursement dans les 30 jours suivant votre achat.</p>
                                            <ol className="list-outside list-decimal space-y-2 pl-4 text-muted-foreground">
                                                <li>Pour demander un remboursement, veuillez contacter notre équipe de support avec votre numéro de commande et la raison du remboursement.</li>
                                                <li>Les remboursements seront traités dans un délai de 3 à 5 jours ouvrables.</li>
                                                <li>Veuillez noter que les remboursements ne sont disponibles que pour les nouveaux clients et sont limités à un par client.</li>
                                            </ol>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="cancel" className="w-full">
                                    <AccordionTrigger className="w-full">Comment annuler mon abonnement ?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <p className="text-muted-foreground">Vous pouvez annuler votre abonnement à tout moment en vous connectant à votre compte et en cliquant sur le bouton d'annulation.</p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="upgrade" className="w-full">
                                    <AccordionTrigger className="w-full">Puis-je mettre à niveau mon forfait ?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">Oui, vous pouvez mettre à niveau votre forfait à tout moment en vous connectant à votre compte et en sélectionnant le forfait vers lequel vous souhaitez évoluer.</p>
                                            <ul className="list-outside list-disc space-y-2 pl-4 text-muted-foreground">
                                                <li>La différence de prix entre votre forfait actuel et celui vers lequel vous évoluez vous sera facturée.</li>
                                                <li>Votre nouveau forfait prendra effet immédiatement et vous serez facturé au nouveau tarif lors de votre prochain cycle de facturation.</li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="support" className="w-full">
                                    <AccordionTrigger className="w-full">Proposez-vous un support téléphonique ?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <p className="text-muted-foreground">Nous ne proposons pas de support téléphonique pour le moment. Cependant, vous pouvez nous contacter par email ou chat en direct pour toute question ou préoccupation.</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

// Footer Section Component
function FooterSection() {
    return (
        <footer className="py-16 md:py-16">
            <div className="mx-auto max-w-5xl px-6">
                <Link href="/" aria-label="go home" className="mx-auto block size-fit">
                    <Logo />
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {footerLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default function HeroSection() {
    // État pour gérer l'ouverture/fermeture du menu mobile
    const [menuState, setMenuState] = useState(false)
    return (
        <>
            {/* En-tête avec navigation responsive */}
            <header>
                <nav data-state={menuState && 'active'} className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
                    <div className="m-auto max-w-5xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            {/* Logo et bouton menu mobile */}
                            <div className="flex w-full justify-between lg:w-auto">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link href="/" aria-label="home" className="flex items-center space-x-2">
                                        <Image className="overflow-hidden invert dark:invert-0" src="/branding/logo.svg" alt="FreelPay Logo" width={100} height={100} quality={85} />
                                    </Link>
                                </motion.div>

                                {/* Bouton toggle pour le menu mobile */}
                                <button onClick={() => setMenuState(!menuState)} aria-label={menuState == true ? 'Close Menu' : 'Open Menu'} className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            {/* Menu de navigation avec liens et boutons */}
                            <motion.div 
                                className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Liste des liens de navigation */}
                                <div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <motion.li key={index} variants={navItemVariants}>
                                                <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Boutons de connexion */}
                                <motion.div 
                                    className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6"
                                    variants={containerVariants}
                                >
                                    <motion.div variants={itemVariants}>
                                        <ModeToggle />
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href="#">
                                                <span>Connexion</span>
                                            </Link>
                                        </Button>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <Button asChild size="sm">
                                            <Link href="#">
                                                <span>Inscription</span>
                                            </Link>
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Contenu principal de la page */}
            <main>
                {/* Effets de fond décoratifs */}
                <div aria-hidden className="z-2 absolute inset-0 isolate hidden opacity-50 contain-strict lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>

                {/* Section héro avec titre et description */}
                <section className="overflow-hidden bg-white dark:bg-transparent">
                    <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
                        <motion.div 
                            className="relative z-10 mx-auto max-w-2xl text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1 
                                className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Freelance ? Faites-vous payer en 24h
                            </motion.h1>
                            <motion.p 
                                className="mx-auto my-8 max-w-2xl text-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Simulez instantanément le financement de vos factures. Pas d'inscription requise. Obtenez une réponse en quelques minutes.
                            </motion.p>

                            {/* Bouton d'action principal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <Button asChild size="lg">
                                    <Link href="#simulation">
                                        <span className="btn-label">Simuler mon financement</span>
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Section d'image avec effets de perspective */}
                    <motion.div 
                        className="mx-auto -mt-16 max-w-7xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <div className="perspective-distant -mr-16 pl-16 lg:-mr-56 lg:pl-56">
                            <div className="[transform:rotateX(20deg);]">
                                <div className="lg:h-176 relative skew-x-[.36rad]">
                                    {/* Effets de superposition et de gradient */}
                                    <div aria-hidden className="bg-linear-to-b from-background to-background z-1 absolute -inset-16 via-transparent sm:-inset-32 hidden dark:block" />
                                    <div aria-hidden className="bg-linear-to-r from-background to-background z-1 absolute -inset-16 bg-white/50 via-transparent sm:-inset-32 dark:bg-transparent hidden dark:block" />
                                    <div aria-hidden className="absolute -inset-16 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [--color-border:var(--color-zinc-400)] sm:-inset-32 dark:[--color-border:color-mix(in_oklab,var(--color-white)_20%,transparent)] hidden dark:block" />
                                    <div aria-hidden className="from-background z-11 absolute inset-0 bg-gradient-to-l hidden dark:block" />
                                    <div aria-hidden className="z-2 absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,var(--color-background)_100%)] hidden dark:block" />
                                    <div aria-hidden className="z-2 absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,var(--color-background)_100%)] hidden dark:block" />

                                    {/* Images principales avec support du mode sombre */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1, delay: 1 }}
                                    >
                                        <Image className="rounded-(--radius) z-1 relative border shadow-2xl shadow-zinc-200/50 dark:hidden" src="/branding/1400w dark.png" alt="interface FreelPay" width={2880} height={2074} quality={85} />
                                        <Image className="rounded-(--radius) z-1 relative hidden border dark:block" src="/branding/1400w dark.png" alt="interface FreelPay" width={2880} height={2074} quality={85} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <motion.section 
                    id="features"
                    className="py-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <FeaturesSection />
                </motion.section>

                {/* Testimonials Section */}
                <motion.section 
                    className="py-16 md:py-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="mx-auto max-w-2xl">
                            <blockquote>
                                <p className="text-lg font-semibold sm:text-xl md:text-3xl">Using TailsUI has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.</p>

                                <div className="mt-12 flex items-center gap-6">
                                    <img className="h-7 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/nvidia.svg" alt="Nvidia Logo" height="20" width="auto" />
                                    <div className="space-y-1 border-l pl-6">
                                        <cite className="font-medium">John Doe</cite>
                                        <span className="text-muted-foreground block text-sm">CEO, Nvidia</span>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </motion.section>

                {/* FAQ Section */}
                <motion.div 
                    id="faq"
                    className="w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <FAQs />
                </motion.div>

                <FooterSection />
            </main>
        </>
    )
}
