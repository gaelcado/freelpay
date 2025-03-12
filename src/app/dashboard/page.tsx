"use client"

import { Suspense } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileTextIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  PlusCircledIcon, 
  ClockIcon, 
  ExclamationTriangleIcon, 
  CheckCircledIcon, 
  DashboardIcon,
  CalendarIcon, 
  DownloadIcon,
  ExternalLinkIcon,
  EyeOpenIcon,
  PersonIcon,
  BarChartIcon,
  UploadIcon,
  BackpackIcon,
  LightningBoltIcon
} from "@radix-ui/react-icons"
import { Icon } from "@/components/ui/icon"
import { RevenueChart } from "@/components/revenue-chart"
import { revenueData, recentInvoices, recentNotifications, calendarEvents } from "@/lib/dashboard-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Stat, 
  BodySM, 
  BodyXS, 
  HeadingMD,
  HeadingSM,
  HeadingLG,
  BodyMD
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
import { CalendarView } from "@/components/calendar-view"

// ------------------------------------------------------------
// STAT CARD
// ------------------------------------------------------------
function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: {
  title: string
  value: string | number
  subtext: string
  icon: React.ElementType
  trend?: { value: number; positive: boolean }
  variant?: "default" | "primary" | "secondary" | "success" | "warning"
  className?: string
}) {
  // Use brand tokens from your theme (e.g., text-foreground, bg-card, etc.)
  const iconColors = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-primary",
    success: "text-emerald-600",
    warning: "text-amber-600",
  }

  return (
    <Card
      className={cn(
        "h-full relative rounded-xl border border-border shadow-sm transition-transform hover:-translate-y-[1px]",
        className
      )}
    >
      <CardHeader spacing="default" className="flex items-center justify-between space-y-0 pb-3">
        <CardTitle size="sm" className="font-medium text-foreground/90 text-base">
          {title}
        </CardTitle>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
          <Icon className={cn("h-5 w-5", iconColors[variant])} />
        </div>
      </CardHeader>
      <CardContent spacing="default" className="flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <Stat className="text-foreground text-3xl">{value}</Stat>
          {trend && (
            <UIBadge variant={trend.positive ? "default" : "destructive"} className="h-6 text-sm">
              {trend.positive ? (
                <ArrowUpIcon className="h-3.5 w-3.5 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3.5 w-3.5 mr-1" />
              )}
              {trend.value}%
            </UIBadge>
          )}
        </div>
        <BodySM className="text-muted-foreground mt-2 tracking-wide">{subtext}</BodySM>
      </CardContent>
    </Card>
  )
}

// ------------------------------------------------------------
// QUICK ACTION CARD
// ------------------------------------------------------------
function QuickActionCard({
  title,
  icon: Icon,
  variant,
  onClick,
  className,
}: {
  title: string
  icon: React.ElementType
  variant: "primary" | "success" | "secondary" | "purple"
  onClick?: () => void
  className?: string
}) {
  const variantClasses = {
    primary: "border-primary/30 text-primary bg-primary/10",
    success: "border-emerald-500/30 text-emerald-600 bg-emerald-500/10",
    secondary: "border-secondary/30 text-secondary bg-secondary/10",
    purple: "border-purple-500/30 text-purple-600 bg-purple-500/10",
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-border shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none",
        variantClasses[variant],
        className
      )}
    >
      <div className="w-11 h-11 rounded-full flex items-center justify-center border border-transparent">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-left">
        <BodySM className="font-medium">{title}</BodySM>
      </div>
    </button>
  )
}

// ------------------------------------------------------------
// LOADING CARD
// ------------------------------------------------------------
function LoadingCard() {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader spacing="default" className="flex flex-row items-center justify-between space-y-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent spacing="default">
        <div className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

// ------------------------------------------------------------
// STATUS BADGE
// ------------------------------------------------------------
function StatusBadge({ status }: { status: "pending" | "paid" | "overdue" }) {
  const variants = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/30 dark:text-amber-400",
    paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-400",
    overdue: "bg-red-100 text-red-700 dark:bg-red-500/30 dark:text-red-400",
  }

  const labels = {
    pending: "En Attente",
    paid: "Payée",
    overdue: "En Retard",
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium", variants[status])}>
      <span 
        className={cn(
          "w-2 h-2 rounded-full mr-1.5",
          status === "pending" ? "bg-amber-500" : status === "paid" ? "bg-emerald-500" : "bg-red-500"
        )} 
      />
      <span className="hidden xs:inline">{labels[status]}</span>
      <span className="xs:hidden">
        {status === "pending" ? "EA" : status === "paid" ? "P" : "ER"}
      </span>
    </span>
  )
}

// ------------------------------------------------------------
// MAIN DASHBOARD PAGE
// ------------------------------------------------------------
export default function Page() {
  return (
    <main role="main">
      <div className="grid gap-5">
        {/* Top Row: Welcome Banner, CTA, and Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Welcome Banner */}
          <div className="lg:col-span-6">
            <Card className="bg-primary text-primary-foreground shadow-md h-full">
              <CardContent className="flex flex-col justify-between h-full space-y-4">
                <div>
                  <HeadingLG className="tracking-tight font-semibold">Bienvenue, Freelance</HeadingLG>
                  <BodySM className="text-primary-foreground/90 tracking-normal max-w-md mt-1">
                    Voici un aperçu de votre financement de factures et de vos performances récentes
                  </BodySM>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg p-3 bg-primary/10">
                    <BodyXS className="text-primary-foreground/70 font-medium">Total Financé</BodyXS>
                    <div className="flex items-baseline gap-2 mt-1">
                      <HeadingSM weight="bold" className="text-primary-foreground">
                        24 500 €
                      </HeadingSM>
                      <UIBadge variant="default" className="h-5 bg-emerald-500/20 text-emerald-100 border-emerald-300/30">
                        <ArrowUpIcon className="h-3 w-3 mr-0.5" />
                        15%
                      </UIBadge>
                    </div>
                  </div>
                  <div className="rounded-lg p-3 bg-primary/10">
                    <BodyXS className="text-primary-foreground/70 font-medium">En Attente</BodyXS>
                    <div className="flex items-baseline gap-2 mt-1">
                      <HeadingSM weight="bold" className="text-primary-foreground">
                        8 200 €
                      </HeadingSM>
                      <BodyXS className="text-primary-foreground/70 tracking-wide">(3)</BodyXS>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-primary-foreground/40 text-primary-foreground hover:bg-primary/20 hover:border-primary-foreground/60"
                  >
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span className="text-sm">Voir Calendrier</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-primary-foreground/40 text-primary-foreground hover:bg-primary/20 hover:border-primary-foreground/60"
                  >
                    <DownloadIcon className="h-3.5 w-3.5" />
                    <span className="text-sm">Exporter</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Invoice CTA */}
          <div className="lg:col-span-3">
            <Card className="bg-primary text-primary-foreground shadow-md h-full">
              <CardContent className="flex flex-col justify-between h-full space-y-4">
                <div>
                  <HeadingMD className="tracking-tight font-semibold">Créer une Facture</HeadingMD>
                  <BodySM className="text-primary-foreground/90 mt-1">
                    Ajoutez rapidement une nouvelle facture
                  </BodySM>
                </div>
                <div className="flex items-center justify-center my-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileTextIcon className="h-10 w-10" />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full gap-1.5 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <PlusCircledIcon className="h-3.5 w-3.5" />
                  <span className="text-sm font-medium">Nouvelle Facture</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-3">
            <StatCard
              title="Taux Actuel"
              value="2.9%"
              subtext="Taux préférentiel"
              icon={LightningBoltIcon}
              variant="primary"
              trend={{ value: 12, positive: true }}
              className="bg-card"
            />
            <StatCard
              title="Limite Utilisée"
              value="75%"
              subtext="18 750 € / 25 000 €"
              icon={BackpackIcon}
              variant="primary"
              className="bg-card"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickActionCard
            title="Demander Financement"
            icon={DashboardIcon}
            variant="success"
            className="h-full"
          />
          <QuickActionCard
            title="Ajouter Client"
            icon={PersonIcon}
            variant="primary"
            className="h-full"
          />
          <QuickActionCard
            title="Voir Statistiques"
            icon={BarChartIcon}
            variant="secondary"
            className="h-full"
          />
          <QuickActionCard
            title="Gérer Documents"
            icon={FileTextIcon}
            variant="purple"
            className="h-full"
          />
        </div>

        {/* Second Row of Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            title="Factures en Attente"
            value="3"
            subtext="Valeur totale: 8 200 €"
            icon={ClockIcon}
            variant="warning"
            className="bg-card"
          />
          <StatCard
            title="Revenus Mensuels"
            value="26 500 €"
            subtext="Juin 2023"
            icon={UploadIcon}
            variant="success"
            trend={{ value: 16, positive: true }}
            className="bg-card"
          />
          <div className="col-span-2 lg:hidden" />
        </div>

        {/* Main Dashboard Content: Chart + Upcoming Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Revenue Chart */}
          <Card className="lg:col-span-3 bg-card shadow-sm">
            <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm" className="font-semibold text-foreground/90 text-base">
                Tendance des Revenus
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open external link">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="default" className="h-[250px] md:h-[280px] px-0 pb-0 overflow-visible">
              <Suspense fallback={<LoadingCard />}> 
                <RevenueChart data={revenueData} showLegend />
              </Suspense>
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card className="bg-card shadow-sm">
            <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm" className="font-semibold text-foreground/90 text-base">
                Paiements à Venir
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open external link">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="default" className="overflow-x-auto">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <BodySM className="font-medium">Agence Web</BodySM>
                    <BodySM className="font-semibold">3 200 €</BodySM>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="text-xs">Échéance dans 2 jours</span>
                    <span className="text-xs">15 Mars 2023</span>
                  </div>
                  <Progress value={80} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <BodySM className="font-medium">Studio Design</BodySM>
                    <BodySM className="font-semibold">1 800 €</BodySM>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="text-xs">Échéance dans 5 jours</span>
                    <span className="text-xs">18 Mars 2023</span>
                  </div>
                  <Progress value={50} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <BodySM className="font-medium">Tech Solutions</BodySM>
                    <BodySM className="font-semibold">4 500 €</BodySM>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="text-xs">Échéance dans 10 jours</span>
                    <span className="text-xs">23 Mars 2023</span>
                  </div>
                  <Progress value={25} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Recent Invoices */}
          <Card className="lg:col-span-3 bg-card shadow-sm">
            <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm" className="font-semibold text-foreground/90 text-base">
                Factures Récentes
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open external link">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="default" className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm font-medium">Client</TableHead>
                    <TableHead className="text-sm font-medium">Montant</TableHead>
                    <TableHead className="text-sm font-medium">Statut</TableHead>
                    <TableHead className="text-right text-sm font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="py-3 text-sm font-medium">{invoice.client}</TableCell>
                      <TableCell className="py-3 text-sm">{invoice.amount} €</TableCell>
                      <TableCell className="py-2">
                        <StatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="View invoice">
                          <EyeOpenIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-card shadow-sm">
            <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm" className="font-semibold text-foreground/90 text-base">
                Notifications
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open external link">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="default" className="flex-grow overflow-auto">
              <div className="space-y-3">
                {recentNotifications.map((notification) => {
                  let notifIcon = <ClockIcon className="h-4 w-4" />;
                  let notifBgClass = "bg-blue-500/10 text-blue-500";
                  if (notification.title.includes("Paiement") || notification.title.includes("Approuvé")) {
                    notifIcon = <CheckCircledIcon className="h-4 w-4" />;
                    notifBgClass = "bg-emerald-500/10 text-emerald-500";
                  } else if (notification.title.includes("Approbation")) {
                    notifIcon = <ExclamationTriangleIcon className="h-4 w-4" />;
                    notifBgClass = "bg-amber-500/10 text-amber-500";
                  }

                  return (
                    <div
                      key={notification.id}
                      className="flex gap-3 items-start pb-4 border-b border-border/40 last:border-0 last:pb-0"
                    >
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", notifBgClass)}>
                        {notifIcon}
                      </div>
                      <div className="space-y-1">
                        <BodySM className="font-medium">{notification.title}</BodySM>
                        <BodyXS className="text-muted-foreground">
                          {notification.description}
                        </BodyXS>
                        <BodyXS className="text-muted-foreground/70">
                          {notification.date}
                        </BodyXS>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Section */}
        <div className="grid grid-cols-1 gap-5">
          <Card className="bg-card shadow-sm">
            <CardHeader spacing="default" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm" className="font-semibold text-foreground/90 text-base">
                Calendrier des Événements
              </CardTitle>
            </CardHeader>
            <CardContent spacing="default" className="flex-grow">
              <CalendarView events={calendarEvents} className="h-full" hideMonthControls />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
