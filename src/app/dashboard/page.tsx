import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  FileText, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  BarChart4, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  Download,
  ExternalLink,
  Eye,
  Plus,
  CreditCard,
  UserPlus,
  BarChart3
} from "lucide-react"
import { RevenueChart } from "@/components/revenue-chart"
import { revenueData, recentInvoices, recentNotifications } from "@/lib/dashboard-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Typography, 
  Stat, 
  BodyMD, 
  BodySM, 
  BodyXS, 
  HeadingMD,
  HeadingLG,
  HeadingXL,
  ResponsiveHeadingMD,
  TruncatedText
} from "@/components/ui/typography"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function StatCard({ title, value, subtext, icon: Icon, trend, variant = "default" }: {
  title: string
  value: string | number
  subtext: string
  icon: React.ElementType
  trend?: { value: number; positive: boolean }
  variant?: "default" | "primary" | "secondary" | "success" | "warning"
}) {
  const iconClasses = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-emerald-500",
    warning: "text-amber-500"
  }

  return (
    <Card variant={variant} elevation="medium" className="hover:bg-accent/15 transition-colors">
      <CardHeader spacing="compact" className="flex flex-row items-center justify-between space-y-0">
        <CardTitle size="sm">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClasses[variant]}`} />
      </CardHeader>
      <CardContent spacing="compact">
        <div className="flex items-center gap-2">
          <Stat>{value}</Stat>
          {trend && (
            <UIBadge variant={trend.positive ? "default" : "destructive"} className="h-6">
              {trend.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend.value}%
            </UIBadge>
          )}
        </div>
        <BodyXS className="text-muted-foreground mt-1">{subtext}</BodyXS>
      </CardContent>
    </Card>
  )
}

function QuickActionCard({ title, icon: Icon, variant, onClick }: {
  title: string
  icon: React.ElementType
  variant: "primary" | "success" | "secondary" | "purple"
  onClick?: () => void
}) {
  const variantClasses = {
    primary: "bg-primary/15 border-primary/30 text-primary hover:bg-primary/20",
    success: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
    secondary: "bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
    purple: "bg-purple-500/15 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20"
  }

  const iconClasses = {
    primary: "text-primary",
    success: "text-emerald-500",
    secondary: "text-blue-500",
    purple: "text-purple-500"
  }

  return (
    <Card 
      className={`${variantClasses[variant]} cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full ${variantClasses[variant]} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${iconClasses[variant]}`} />
        </div>
        <BodySM className="font-medium">{title}</BodySM>
      </CardContent>
    </Card>
  )
}

function LoadingCard() {
  return (
    <Card variant="glass" elevation="medium">
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
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/30 dark:text-amber-300",
    paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/30 dark:text-emerald-300",
    overdue: "bg-red-100 text-red-800 dark:bg-red-500/30 dark:text-red-300"
  }
  
  const labels = {
    pending: "En attente",
    paid: "Payé",
    overdue: "En retard"
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function Page() {
  return (
    <div className="grid gap-8">
      {/* Hero Section with Welcome and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome and Stats */}
        <div className="lg:col-span-2">
          <Card variant="glass" elevation="medium" className="overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-transparent to-primary/30 dark:to-primary/20"></div>
            </div>
            <CardHeader spacing="default">
              <HeadingLG className="mb-1">Bienvenue, Freelance</HeadingLG>
              <BodyMD className="text-muted-foreground">Voici un aperçu de votre financement de factures</BodyMD>
            </CardHeader>
            <CardContent spacing="default" className="pb-6">
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col">
                  <BodySM className="text-muted-foreground">Total Financé</BodySM>
                  <div className="flex items-baseline gap-2">
                    <HeadingMD>24 500 €</HeadingMD>
                    <UIBadge variant="default" className="h-5">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      15%
                    </UIBadge>
                  </div>
                </div>
                <div className="flex flex-col">
                  <BodySM className="text-muted-foreground">En Attente</BodySM>
                  <div className="flex items-baseline gap-2">
                    <HeadingMD>8 200 €</HeadingMD>
                    <BodyXS className="text-muted-foreground">(3 factures)</BodyXS>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter spacing="default" withSeparator className="pt-4">
              <div className="flex justify-between w-full">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  Voir Calendrier
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Exporter
                  </Button>
                  <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Nouveau
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <BodySM className="font-medium text-white ml-1">ACTIONS RAPIDES</BodySM>
          <div className="grid grid-cols-1 gap-3">
            <QuickActionCard 
              title="Nouvelle Facture" 
              icon={FileText} 
              variant="primary"
            />
            <QuickActionCard 
              title="Demander Financement" 
              icon={DollarSign} 
              variant="success"
            />
            <QuickActionCard 
              title="Ajouter Client" 
              icon={UserPlus} 
              variant="secondary"
            />
            <QuickActionCard 
              title="Voir Rapports" 
              icon={BarChart3} 
              variant="purple"
            />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Factures Actives"
          value={8}
          subtext="3 en attente d'approbation"
          icon={FileText}
          trend={{ value: 12, positive: true }}
          variant="primary"
        />
        <StatCard
          title="Portefeuille Clients"
          value={12}
          subtext="2 nouveaux ce mois-ci"
          icon={Users}
          trend={{ value: 8, positive: true }}
          variant="secondary"
        />
        <StatCard
          title="Total Financé"
          value="24 500 €"
          subtext="Ce mois-ci"
          icon={DollarSign}
          trend={{ value: 15, positive: true }}
          variant="success"
        />
        <StatCard
          title="En Attente d'Approbation"
          value={3}
          subtext="Est. 8 200 €"
          icon={Clock}
          variant="warning"
        />
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Revenue Chart */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <Suspense fallback={<LoadingCard />}>
            <Card variant="glass" elevation="medium" className="col-span-1 lg:col-span-2">
              <CardHeader spacing="default" className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle size="md">Tendance des Revenus</CardTitle>
                  <CardDescription>Comparaison mensuelle des financements</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8">Voir Rapport</Button>
              </CardHeader>
              <CardContent spacing="default" className="h-[300px] relative">
                <RevenueChart data={revenueData} height={280} />
              </CardContent>
            </Card>
          </Suspense>

          {/* Financing Status */}
          <Card variant="glass" elevation="medium">
            <CardHeader spacing="default">
              <CardTitle size="md">État du Financement</CardTitle>
              <CardDescription>Progression du mois en cours</CardDescription>
            </CardHeader>
            <CardContent spacing="default" className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <BodySM>Approuvé</BodySM>
                  <BodySM className="font-medium">24 500 € / 30 000 €</BodySM>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <BodySM>En attente</BodySM>
                  <BodySM className="font-medium">8 200 €</BodySM>
                </div>
                <Progress value={27} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <BodySM>Remboursé</BodySM>
                  <BodySM className="font-medium">12 300 € / 24 500 €</BodySM>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </CardContent>
            <CardFooter spacing="default" withSeparator>
              <Button variant="ghost" size="sm" className="w-full gap-1">
                Voir Rapport Détaillé
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          {/* Recent Invoices */}
          <Card variant="glass" elevation="medium" className="col-span-1 lg:col-span-2">
            <CardHeader spacing="default" className="flex flex-row items-center justify-between">
              <div>
                <CardTitle size="md">Factures Récentes</CardTitle>
                <CardDescription>Votre activité récente de facturation</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                Voir Tout
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="default">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facture</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-accent/5">
                      <TableCell className="font-medium">#{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.amount.toLocaleString()} €</TableCell>
                      <TableCell>
                        <StatusBadge status={invoice.status} />
                      </TableCell>
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

          {/* Recent Notifications */}
          <Card variant="glass" elevation="medium">
            <CardHeader spacing="default" className="flex flex-row items-center justify-between">
              <div>
                <CardTitle size="md">Notifications Récentes</CardTitle>
                <CardDescription>Dernières mises à jour</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                Voir Toutes
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent spacing="default">
              <div className="space-y-4">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0 hover:bg-accent/5 rounded-md p-2 -mx-2 transition-colors">
                    <div className="mt-0.5">
                      {notification.title.includes("Paiement") ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/30 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                        </div>
                      ) : notification.title.includes("Approbation") ? (
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/30 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                        </div>
                      ) : notification.title.includes("Financement") ? (
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/30 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/30 flex items-center justify-center">
                          <Users className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <BodySM className="font-medium">{notification.title}</BodySM>
                      <BodyXS className="text-muted-foreground mt-0.5">{notification.description}</BodyXS>
                      <BodyXS className="text-muted-foreground mt-1">{notification.date}</BodyXS>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Payments */}
        <Card variant="glass" elevation="medium">
          <CardHeader spacing="default" className="flex flex-row items-center justify-between">
            <div>
              <CardTitle size="md">Paiements à Venir</CardTitle>
              <CardDescription>30 prochains jours</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              Voir Calendrier
            </Button>
          </CardHeader>
          <CardContent spacing="default">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Montant</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-accent/5">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/30 flex items-center justify-center">
                        <DollarSign className="h-3 w-3 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <span className="font-medium">5 200 €</span>
                    </div>
                  </TableCell>
                  <TableCell>Échéance dans 7 jours</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      Détails
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-accent/5">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/30 flex items-center justify-center">
                        <DollarSign className="h-3 w-3 text-amber-600 dark:text-amber-300" />
                      </div>
                      <span className="font-medium">3 800 €</span>
                    </div>
                  </TableCell>
                  <TableCell>Échéance dans 14 jours</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      Détails
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-accent/5">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/30 flex items-center justify-center">
                        <DollarSign className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                      </div>
                      <span className="font-medium">7 500 €</span>
                    </div>
                  </TableCell>
                  <TableCell>Échéance dans 21 jours</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      Détails
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
