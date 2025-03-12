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
    secondary: "text-secondary",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
  }

  return (
    <Card
      variant={variant}
      elevation="low"
      isHoverable
      className={cn("h-full", className)}
    >
      <CardHeader spacing="compact" className="flex items-center justify-between space-y-0">
        <CardTitle size="sm">
          {title}
        </CardTitle>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/60">
          <Icon className={cn("h-5 w-5", iconColors[variant])} />
        </div>
      </CardHeader>
      <CardContent spacing="compact" className="flex flex-col justify-between pt-0">
        <div className="flex items-center gap-2">
          <Stat className="text-foreground">{value}</Stat>
          {trend && (
            <UIBadge variant={trend.positive ? "default" : "destructive"} className="h-6 text-xs">
              {trend.positive ? (
                <ArrowUpIcon className="h-3.5 w-3.5 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3.5 w-3.5 mr-1" />
              )}
              {trend.value}%
            </UIBadge>
          )}
        </div>
        <BodySM color="muted" className="mt-1">{subtext}</BodySM>
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
  const cardVariant = 
    variant === "primary" ? "primary" : 
    variant === "secondary" ? "secondary" : 
    variant === "success" ? "success" : 
    "default";
  
  const iconColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-emerald-600 dark:text-emerald-400",
    purple: "text-purple-600 dark:text-purple-400",
  }

  return (
    <Card
      variant={cardVariant}
      elevation="low"
      isHoverable
      isClickable
      className={cn("h-full", className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <CardContent spacing="compact" className="flex items-center gap-4 p-4">
        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-background/60">
          <Icon className={cn("h-5 w-5", iconColors[variant])} />
        </div>
        <div className="text-left">
          <BodySM weight="medium">{title}</BodySM>
        </div>
      </CardContent>
    </Card>
  )
}

// ------------------------------------------------------------
// LOADING CARD
// ------------------------------------------------------------
function LoadingCard() {
  return (
    <Card elevation="low" className="h-full">
      <CardHeader spacing="compact" className="flex flex-row items-center justify-between space-y-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent spacing="compact">
        <div className="space-y-3">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
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
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/30 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20",
    paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20",
    overdue: "bg-red-100 text-red-700 dark:bg-red-500/30 dark:text-red-400 border border-red-200 dark:border-red-500/20",
  }

  const labels = {
    pending: "En Attente",
    paid: "Payée",
    overdue: "En Retard",
  }

  const icons = {
    pending: <ClockIcon className="h-3.5 w-3.5 mr-1.5" />,
    paid: <CheckCircledIcon className="h-3.5 w-3.5 mr-1.5" />,
    overdue: <ExclamationTriangleIcon className="h-3.5 w-3.5 mr-1.5" />,
  }

  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", variants[status])}>
      {icons[status]}
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
    <main role="main" className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid gap-4 md:gap-6">
        {/* Top Row: Welcome Banner, CTA, and Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Welcome Banner */}
          <div className="lg:col-span-6">
            <Card elevation="low" isHoverable className="h-full">
              <CardContent spacing="default" className="flex flex-col justify-between h-full space-y-4 p-6">
                <div>
                  <HeadingLG weight="semibold" className="tracking-tight">Bienvenue, Freelance</HeadingLG>
                  <BodySM color="muted" className="mt-1 max-w-md">
                    Voici un aperçu de votre financement de factures et de vos performances récentes
                  </BodySM>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg p-4 bg-muted/60">
                    <BodyXS color="muted" weight="medium">Total Financé</BodyXS>
                    <div className="flex items-baseline gap-2 mt-1">
                      <HeadingSM weight="bold">
                        24 500 €
                      </HeadingSM>
                      <UIBadge variant="default" className="h-5">
                        <ArrowUpIcon className="h-3 w-3 mr-0.5" />
                        15%
                      </UIBadge>
                    </div>
                  </div>
                  <div className="rounded-lg p-4 bg-muted/60">
                    <BodyXS color="muted" weight="medium">En Attente</BodyXS>
                    <div className="flex items-baseline gap-2 mt-1">
                      <HeadingSM weight="bold">
                        8 200 €
                      </HeadingSM>
                      <BodyXS color="muted" className="tracking-wide">(3)</BodyXS>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span className="text-sm">Voir Calendrier</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
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
            <Card variant="primary" elevation="low" isHoverable className="h-full">
              <CardContent spacing="default" className="flex flex-col justify-between h-full space-y-4 p-6">
                <div>
                  <HeadingMD weight="semibold" className="tracking-tight">Créer une Facture</HeadingMD>
                  <BodySM color="muted" className="mt-1">
                    Ajoutez rapidement une nouvelle facture
                  </BodySM>
                </div>
                <div className="flex items-center justify-center my-4">
                  <div className="w-20 h-20 rounded-full bg-background/60 flex items-center justify-center">
                    <FileTextIcon className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full gap-1.5"
                >
                  <PlusCircledIcon className="h-3.5 w-3.5" />
                  <span className="text-sm font-medium">Nouvelle Facture</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-4 md:gap-6">
            <StatCard
              title="Taux Actuel"
              value="2.9%"
              subtext="Taux préférentiel"
              icon={LightningBoltIcon}
              variant="primary"
              trend={{ value: 12, positive: true }}
            />
            <StatCard
              title="Limite Utilisée"
              value="75%"
              subtext="18 750 € / 25 000 €"
              icon={BackpackIcon}
              variant="primary"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          <QuickActionCard
            title="Demander Financement"
            icon={DashboardIcon}
            variant="success"
          />
          <QuickActionCard
            title="Ajouter Client"
            icon={PersonIcon}
            variant="primary"
          />
          <QuickActionCard
            title="Voir Statistiques"
            icon={BarChartIcon}
            variant="secondary"
          />
          <QuickActionCard
            title="Gérer Documents"
            icon={FileTextIcon}
            variant="purple"
          />
        </div>

        {/* Second Row of Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Factures en Attente"
            value="3"
            subtext="Valeur totale: 8 200 €"
            icon={ClockIcon}
            variant="warning"
          />
          <StatCard
            title="Revenus Mensuels"
            value="26 500 €"
            subtext="Juin 2023"
            icon={UploadIcon}
            variant="success"
            trend={{ value: 16, positive: true }}
          />
          <StatCard
            title="Délai de Paiement"
            value="14 jours"
            subtext="Moyenne sur 6 mois"
            icon={CalendarIcon}
            variant="secondary"
          />
          <StatCard
            title="Taux d'Acceptation"
            value="92%"
            subtext="Demandes approuvées"
            icon={CheckCircledIcon}
            variant="success"
          />
        </div>

        {/* Main Dashboard Content: Chart + Upcoming Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Calendar Section */}
          <Card className="lg:col-span-5" elevation="low" isHoverable>
            <CardHeader spacing="compact" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm">Calendrier</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Voir plus">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="compact" className="flex-grow p-0">
              <CalendarView events={calendarEvents} className="h-[300px] md:h-[350px]" hideMonthControls />
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card className="lg:col-span-3" elevation="low" isHoverable>
            <CardHeader spacing="compact" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm">Paiements à Venir</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Voir plus">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="compact" className="overflow-x-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <BodySM weight="medium">Agence Web</BodySM>
                    <BodySM weight="semibold">3 200 €</BodySM>
                  </div>
                  <div className="flex justify-between items-center">
                    <BodyXS color="muted">Échéance dans 2 jours</BodyXS>
                    <BodyXS color="muted">15 Mars 2023</BodyXS>
                  </div>
                  <Progress value={80} className="h-1.5" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <BodySM weight="medium">Studio Design</BodySM>
                    <BodySM weight="semibold">1 800 €</BodySM>
                  </div>
                  <div className="flex justify-between items-center">
                    <BodyXS color="muted">Échéance dans 5 jours</BodyXS>
                    <BodyXS color="muted">18 Mars 2023</BodyXS>
                  </div>
                  <Progress value={50} className="h-1.5" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <BodySM weight="medium">Tech Solutions</BodySM>
                    <BodySM weight="semibold">4 500 €</BodySM>
                  </div>
                  <div className="flex justify-between items-center">
                    <BodyXS color="muted">Échéance dans 10 jours</BodyXS>
                    <BodyXS color="muted">23 Mars 2023</BodyXS>
                  </div>
                  <Progress value={25} className="h-1.5" />
                </div>
              </div>
            </CardContent>
            <CardFooter spacing="compact" withSeparator className="justify-center">
              <Button variant="ghost" size="sm" className="w-full">
                Voir tous les paiements
              </Button>
            </CardFooter>
          </Card>

          {/* Revenue Chart */}
          <Card className="lg:col-span-4" elevation="low" isHoverable>
            <CardHeader spacing="compact" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm">Tendance des Revenus</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  Mensuel
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Voir plus">
                  <ExternalLinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent spacing="compact" className="h-[250px] md:h-[350px] px-0 pb-0 overflow-visible">
              <Suspense fallback={<LoadingCard />}> 
                <RevenueChart data={revenueData} showLegend />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Recent Invoices */}
          <Card className="lg:col-span-8" elevation="low" isHoverable>
            <CardHeader spacing="compact" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm">Factures Récentes</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  Filtrer
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Voir plus">
                  <ExternalLinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent spacing="compact" className="overflow-x-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-medium">Client</TableHead>
                    <TableHead className="text-xs font-medium">Montant</TableHead>
                    <TableHead className="text-xs font-medium">Statut</TableHead>
                    <TableHead className="text-right text-xs font-medium">Actions</TableHead>
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
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Voir facture">
                            <EyeOpenIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Télécharger facture">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter spacing="compact" withSeparator className="justify-center">
              <Button variant="ghost" size="sm" className="w-full">
                Voir toutes les factures
              </Button>
            </CardFooter>
          </Card>

          {/* Notifications */}
          <Card className="lg:col-span-4" elevation="low" isHoverable>
            <CardHeader spacing="compact" withSeparator className="flex flex-row items-center justify-between">
              <CardTitle size="sm">Notifications</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Voir plus">
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="compact" className="flex-grow overflow-auto">
              <div className="space-y-4">
                {recentNotifications.map((notification) => {
                  let notifIcon = <ClockIcon className="h-4 w-4" />;
                  let notifBgClass = "bg-blue-500/10 text-blue-500 border border-blue-500/20";
                  
                  if (notification.title.includes("Paiement") || notification.title.includes("Approuvé")) {
                    notifIcon = <CheckCircledIcon className="h-4 w-4" />;
                    notifBgClass = "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
                  } else if (notification.title.includes("Approbation")) {
                    notifIcon = <ExclamationTriangleIcon className="h-4 w-4" />;
                    notifBgClass = "bg-amber-500/10 text-amber-500 border border-amber-500/20";
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
                        <BodySM weight="medium">{notification.title}</BodySM>
                        <BodyXS color="muted">
                          {notification.description}
                        </BodyXS>
                        <BodyXS color="muted" className="opacity-70">
                          {notification.date}
                        </BodyXS>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter spacing="compact" withSeparator className="justify-center">
              <Button variant="ghost" size="sm" className="w-full">
                Voir toutes les notifications
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
