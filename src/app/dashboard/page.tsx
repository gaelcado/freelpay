import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  Download,
  ExternalLink,
  Eye,
  UserPlus,
  BarChart3,
  TrendingUp,
  Wallet,
  Sparkles,
  LineChart,
  LayoutDashboard
} from "lucide-react"
import { RevenueChart } from "@/components/revenue-chart"
import { revenueData, recentInvoices, recentNotifications } from "@/lib/dashboard-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Stat, 
  BodyMD, 
  BodySM, 
  BodyXS, 
  HeadingMD,
  HeadingLG,
  HeadingXL,
  HeadingSM,
  DisplayMD,
  CardTitle as TypographyCardTitle
} from "@/components/ui/typography"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

function StatCard({ title, value, subtext, icon: Icon, trend, variant = "default", className }: {
  title: string
  value: string | number
  subtext: string
  icon: React.ElementType
  trend?: { value: number; positive: boolean }
  variant?: "default" | "primary" | "secondary" | "success" | "warning"
  className?: string
}) {
  const iconClasses = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-emerald-600",
    warning: "text-amber-600"
  }

  const bgClasses = {
    default: "bg-card hover:bg-accent/20",
    primary: "bg-primary/15 hover:bg-primary/20",
    secondary: "bg-secondary/15 hover:bg-secondary/20",
    success: "bg-emerald-500/15 hover:bg-emerald-500/20",
    warning: "bg-amber-500/15 hover:bg-amber-500/20"
  }

  const borderClasses = {
    default: "border-border",
    primary: "border-primary/30",
    secondary: "border-secondary/30",
    success: "border-emerald-500/30",
    warning: "border-amber-500/30"
  }

  return (
    <Card className={cn("h-full", className)} variant={variant}>
      <CardHeader spacing="compact" className="flex flex-row items-center justify-between space-y-0">
        <CardTitle size="sm" className="font-semibold tracking-tight text-foreground/90">{title}</CardTitle>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-background/80 ${iconClasses[variant]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent spacing="compact" className="flex flex-col h-full justify-between">
        <div className="flex items-center gap-2">
          <Stat className="text-foreground">{value}</Stat>
          {trend && (
            <UIBadge variant={trend.positive ? "default" : "destructive"} className="h-6">
              {trend.positive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
              {trend.value}%
            </UIBadge>
          )}
        </div>
        <BodyXS className="text-muted-foreground mt-1 tracking-wide">{subtext}</BodyXS>
      </CardContent>
    </Card>
  )
}

function QuickActionCard({ title, icon: Icon, variant, onClick, className }: {
  title: string
  icon: React.ElementType
  variant: "primary" | "success" | "secondary" | "purple"
  onClick?: () => void
  className?: string
}) {
  const variantClasses = {
    primary: "bg-primary/10 text-primary border-primary/30",
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    secondary: "bg-secondary/10 text-secondary border-secondary/30",
    purple: "bg-purple-500/10 text-purple-600 border-purple-500/30"
  }

  return (
    <button
      onClick={onClick}
      className={`bg-card/80 shadow-md flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-200 hover:shadow-lg ${className}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${variantClasses[variant]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-left">
        <BodyMD className="font-medium">{title}</BodyMD>
      </div>
    </button>
  )
}

function LoadingCard() {
  return (
    <Card variant="default" elevation="flat">
      <CardHeader spacing="compact" className="flex flex-row items-center justify-between space-y-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent spacing="compact">
        <div className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

// Status badge component for consistent styling
function StatusBadge({ status }: { status: 'pending' | 'paid' | 'overdue' }) {
  const variants = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/30 dark:text-amber-400",
    paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-400",
    overdue: "bg-red-100 text-red-700 dark:bg-red-500/30 dark:text-red-400"
  }
  
  const labels = {
    pending: "En Attente",
    paid: "Payée",
    overdue: "En Retard"
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${status === 'pending' ? 'bg-amber-500' : status === 'paid' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
      <span className="hidden xs:inline">{labels[status]}</span>
      <span className="xs:hidden">{status === 'pending' ? 'EA' : status === 'paid' ? 'P' : 'ER'}</span>
    </span>
  )
}

export default function Page() {
  return (
    <div className="grid gap-8">
      {/* Hero Section with Welcome Banner and CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Welcome Banner - Takes 8/12 columns on large screens */}
        <div className="lg:col-span-8">
          <Card variant="default" elevation="flat" className="h-full">
            <CardContent spacing="loose" className="flex flex-col justify-between h-full">
              <div>
                <HeadingLG className="mb-2 tracking-tight">Bienvenue, Freelance</HeadingLG>
                <BodyMD className="text-white/80 tracking-normal max-w-md">Voici un aperçu de votre financement de factures et de vos performances récentes</BodyMD>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 shadow-none">
                  <BodySM className="text-white/70 font-medium mb-1.5">Total Financé</BodySM>
                  <div className="flex items-baseline gap-2">
                    <HeadingMD weight="bold" className="text-white">24 500 €</HeadingMD>
                    <UIBadge variant="default" className="h-5 bg-blue-500/30 text-white border-blue-400/30 backdrop-blur-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      15%
                    </UIBadge>
                  </div>
                </div>
                <div className="bg-white/10 dark:bg-white/5 rounded-xl p-4 shadow-none">
                  <BodySM className="text-white/70 font-medium mb-1.5">En Attente</BodySM>
                  <div className="flex items-baseline gap-2">
                    <HeadingMD weight="bold" className="text-white">8 200 €</HeadingMD>
                    <BodyXS className="text-white/70 tracking-wide">(3 factures)</BodyXS>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button variant="outline" size="sm" className="gap-1.5 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30 backdrop-blur-xl backdrop-saturate-[50%]">
                  <Calendar className="h-4 w-4" />
                  Voir Calendrier
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30 backdrop-blur-xl backdrop-saturate-[50%]">
                  <Download className="h-4 w-4" />
                  Exporter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Invoice CTA - Takes 4/12 columns on large screens */}
        <div className="lg:col-span-4">
          <Card variant="default" elevation="flat" className="h-full">
            <CardContent spacing="loose" className="flex flex-col justify-between h-full">
              <div>
                <HeadingSM className="mb-2 tracking-tight">Créer une Nouvelle Facture</HeadingSM>
                <BodySM className="text-white/80 tracking-normal">Ajoutez rapidement une nouvelle facture pour financement</BodySM>
              </div>
              
              <div className="flex items-center justify-center my-6">
                <div className="w-24 h-24 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center shadow-none">
                  <FileText className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <Button size="default" className="w-full gap-1.5 bg-white/90 text-emerald-600 hover:bg-white/95 backdrop-blur-sm backdrop-saturate-[50%] shadow-[0_2px_5px_rgba(0,0,0,0.05)] border border-white/40">
                <PlusCircle className="h-4 w-4" />
                Nouvelle Facture
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions Row - More compact and visually distinct */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard 
          title="Demander Financement" 
          icon={DollarSign} 
          variant="success"
          className="h-full"
        />
        <QuickActionCard 
          title="Ajouter Client" 
          icon={UserPlus} 
          variant="primary"
          className="h-full"
        />
        <QuickActionCard 
          title="Voir Statistiques" 
          icon={BarChart3} 
          variant="secondary"
          className="h-full"
        />
        <QuickActionCard 
          title="Gérer Documents" 
          icon={FileText} 
          variant="purple"
          className="h-full"
        />
      </div>

      {/* Main Dashboard Content - 2 rows with different column layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Revenue Chart - Takes 2/4 columns on large screens */}
        <Card variant="default" elevation="flat" className="col-span-1 lg:col-span-2">
          <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
            <CardTitle size="md" className="font-semibold tracking-tight text-foreground/90">Tendance des Revenus</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent spacing="none" className="h-[250px] md:h-[300px] px-0 pb-0">
            <RevenueChart data={revenueData} />
          </CardContent>
        </Card>

        {/* Financing Status - Takes 1/4 column on large screens */}
        <Card variant="default" elevation="flat" className="h-full flex flex-col">
          <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
            <CardTitle size="md" className="font-semibold tracking-tight text-foreground/90">État du Financement</CardTitle>
          </CardHeader>
          <CardContent spacing="default" className="space-y-6 flex-grow flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <DisplayMD className="font-bold">75%</DisplayMD>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-muted-foreground/20" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                  <circle className="text-primary" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                </svg>
              </div>
              <div>
                <HeadingSM className="font-semibold">18 750 € / 25 000 €</HeadingSM>
                <BodySM className="text-muted-foreground">Limite de Financement</BodySM>
              </div>
            </div>
          </CardContent>
          <CardFooter spacing="default" withSeparator>
            <Button variant="outline" size="sm" className="w-full gap-1.5">
              <TrendingUp className="h-4 w-4" />
              Augmenter Limite
            </Button>
          </CardFooter>
        </Card>

        {/* Financing Status - Takes 1/4 column on large screens */}
        <Card variant="default" elevation="flat" className="h-full flex flex-col">
          <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
            <CardTitle size="md" className="font-semibold tracking-tight text-foreground/90">Taux Actuel</CardTitle>
          </CardHeader>
          <CardContent spacing="default" className="space-y-6 flex-grow flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="flex items-baseline">
                <DisplayMD className="font-bold">2.9</DisplayMD>
                <HeadingSM className="text-muted-foreground">%</HeadingSM>
              </div>
              <div>
                <BodySM className="text-muted-foreground">Taux Préférentiel</BodySM>
              </div>
              <UIBadge variant="outline" className="mt-2 bg-emerald-500/10 text-emerald-600 border-emerald-200/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Meilleur Taux
              </UIBadge>
            </div>
          </CardContent>
          <CardFooter spacing="default" withSeparator>
            <Button variant="outline" size="sm" className="w-full gap-1.5">
              <LineChart className="h-4 w-4" />
              Voir Historique
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Second Row - Recent Invoices and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recent Invoices - Takes 2/4 columns on large screens */}
        <Card variant="default" elevation="flat" className="col-span-1 lg:col-span-2">
          <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
            <CardTitle size="md" className="font-semibold tracking-tight text-foreground/90">Factures Récentes</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent spacing="default" className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.client}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell><StatusBadge status={invoice.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notifications - Takes 1/4 column on large screens */}
        <Card variant="default" elevation="flat">
          <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
            <CardTitle size="md" className="font-semibold tracking-tight text-foreground/90">Notifications</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent spacing="default" className="flex-grow overflow-auto">
            <div className="space-y-4">
              {recentNotifications.map((notification) => {
                // Déterminer le type d'icône en fonction du titre
                let icon = <Clock className="h-4 w-4" />;
                let bgColorClass = "bg-blue-500/10 text-blue-500";
                
                if (notification.title.includes("Paiement") || notification.title.includes("Approuvé")) {
                  icon = <CheckCircle2 className="h-4 w-4" />;
                  bgColorClass = "bg-emerald-500/10 text-emerald-500";
                } else if (notification.title.includes("Approbation")) {
                  icon = <AlertCircle className="h-4 w-4" />;
                  bgColorClass = "bg-amber-500/10 text-amber-500";
                }
                
                return (
                  <div key={notification.id} className="flex gap-3 items-start pb-4 border-b border-border/40 last:border-0 last:pb-0">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", bgColorClass)}>
                      {icon}
                    </div>
                    <div className="space-y-1">
                      <BodySM className="font-medium">{notification.title}</BodySM>
                      <BodyXS className="text-muted-foreground">{notification.description}</BodyXS>
                      <BodyXS className="text-muted-foreground/70">{notification.date}</BodyXS>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments - Takes 1/4 column on large screens */}
        <Card variant="default" elevation="flat">
          <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
            <CardTitle size="md" className="font-semibold tracking-tight text-foreground/90">Paiements à Venir</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent spacing="default" className="overflow-x-auto">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <BodySM className="font-medium">Agence Web</BodySM>
                  <BodySM className="font-semibold">3 200 €</BodySM>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Échéance dans 2 jours</span>
                  <span>15 Mars 2023</span>
                </div>
                <Progress value={80} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <BodySM className="font-medium">Studio Design</BodySM>
                  <BodySM className="font-semibold">1 800 €</BodySM>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Échéance dans 5 jours</span>
                  <span>18 Mars 2023</span>
                </div>
                <Progress value={50} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <BodySM className="font-medium">Tech Solutions</BodySM>
                  <BodySM className="font-semibold">4 500 €</BodySM>
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Échéance dans 10 jours</span>
                  <span>23 Mars 2023</span>
                </div>
                <Progress value={25} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
