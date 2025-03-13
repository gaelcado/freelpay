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
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
]

// Footer links
const footerLinks = [
    {
        title: 'Features',
        href: '#',
    },
    {
        title: 'Solution',
        href: '#',
    },
    {
        title: 'Customers',
        href: '#',
    },
    {
        title: 'Pricing',
        href: '#',
    },
    {
        title: 'Help',
        href: '#',
    },
    {
        title: 'About',
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
        />
    )
}

// Features Section Component
function FeaturesSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-12 px-6">
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-semibold">The Lyra ecosystem brings together our models</h2>
                    <p className="max-w-sm sm:ml-auto">Empower your team with workflows that adapt to your needs, whether you prefer git synchronization or a AI Agents interface.</p>
                </div>
                <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
                    <div className="aspect-88/36 relative">
                        <div className="bg-linear-to-t z-1 from-background absolute inset-0 to-transparent"></div>
                        <Image src="/mail-upper.png" className="absolute inset-0 z-10" alt="payments illustration dark" width={2797} height={1137} />
                        <Image src="/mail-back.png" className="hidden dark:block" alt="payments illustration dark" width={2797} height={1137} />
                        <Image src="/mail-back-light.png" className="dark:hidden" alt="payments illustration light" width={2797} height={1137} />
                    </div>
                </div>
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Faaast</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an entire helping developers and innovate.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Powerful</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an entire helping developers and businesses.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium">Security</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an helping developers businesses innovate.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium">AI Powered</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an helping developers businesses innovate.</p>
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
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p className="text-muted-foreground">Find answers to common questions about our service.</p>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <Accordion type="single" collapsible className="w-full [&>div]:w-full">
                                <AccordionItem value="refund" className="w-full">
                                    <AccordionTrigger className="w-full">What is the refund policy?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">We offer a 30-day money back guarantee. If you are not satisfied with our product, you can request a refund within 30 days of your purchase.</p>
                                            <ol className="list-outside list-decimal space-y-2 pl-4 text-muted-foreground">
                                                <li>To request a refund, please contact our support team with your order number and reason for the refund.</li>
                                                <li>Refunds will be processed within 3-5 business days.</li>
                                                <li>Please note that refunds are only available for new customers and are limited to one per customer.</li>
                                            </ol>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="cancel" className="w-full">
                                    <AccordionTrigger className="w-full">How do I cancel my subscription?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <p className="text-muted-foreground">You can cancel your subscription at any time by logging into your account and clicking on the cancel button.</p>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="upgrade" className="w-full">
                                    <AccordionTrigger className="w-full">Can I upgrade my plan?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">Yes, you can upgrade your plan at any time by logging into your account and selecting the plan you want to upgrade to.</p>
                                            <ul className="list-outside list-disc space-y-2 pl-4 text-muted-foreground">
                                                <li>You will be charged the difference in price between your current plan and the plan you are upgrading to.</li>
                                                <li>Your new plan will take effect immediately and you will be billed at the new rate on your next billing cycle.</li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="support" className="w-full">
                                    <AccordionTrigger className="w-full">Do you offer phone support?</AccordionTrigger>
                                    <AccordionContent className="w-full">
                                        <p className="text-muted-foreground">We do not offer phone support at this time. However, you can contact us via email or live chat for any questions or concerns you may have.</p>
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
        <footer className="py-16 md:py-32">
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
                                        <Image className="overflow-hidden invert dark:invert-0" src="/branding/logo.svg" alt="FreelPay Logo" width={100} height={100} />
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
                                                <span>Login</span>
                                            </Link>
                                        </Button>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <Button asChild size="sm">
                                            <Link href="#">
                                                <span>Login</span>
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
                                Freelance ? Fais toi payer en 24h
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
                                        <Image className="rounded-(--radius) z-1 relative border shadow-2xl shadow-zinc-200/50 dark:hidden" src="/branding/1400w dark.png" alt="tailus ui hero section" width={2880} height={2074} />
                                        <Image className="rounded-(--radius) z-1 relative hidden border dark:block" src="/branding/1400w dark.png" alt="tailus ui hero section" width={2880} height={2074} />
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
