"use client";

import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { Icon } from "@/components/ui/icon";
import { RevenueChart } from "@/components/revenue-chart";
import {
  revenueData,
  recentInvoices,
  recentNotifications,
  calendarEvents,
} from "@/lib/dashboard-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Stat,
  BodySM,
  BodyXS,
  HeadingMD,
  HeadingSM,
  HeadingLG,
  BodyMD,
} from "@/components/ui/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CalendarView } from "@/components/calendar-view";

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
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ElementType;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  className?: string;
}) {
  // Use brand tokens from your theme (e.g., text-foreground, bg-card, etc.)
  const iconColors = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
  };
  return (
    <Card
      variant={variant}
      elevation="low"
      isHoverable
      className={cn("h-full", className)}
      data-oid="npimwd3"
    >
      <CardHeader
        spacing="compact"
        className="flex items-center justify-between space-y-0"
        data-oid="jbc71w:"
      >
        <CardTitle size="sm" data-oid="9u:ym4o">
          {title}
        </CardTitle>
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/60"
          data-oid="dp1e.j3"
        >
          <Icon
            className={cn("h-5 w-5", iconColors[variant])}
            data-oid="e7lb66u"
          />
        </div>
      </CardHeader>
      <CardContent
        spacing="compact"
        className="flex flex-col justify-between pt-0"
        data-oid="sza9hcg"
      >
        <div className="flex items-center gap-2" data-oid="70c-v.r">
          <Stat className="text-foreground" data-oid="69v4yn0">
            {value}
          </Stat>
          {trend && (
            <UIBadge
              variant={trend.positive ? "default" : "destructive"}
              className="h-6 text-xs"
              data-oid="_ur8ecy"
            >
              {trend.positive ? (
                <ArrowUpIcon className="h-3.5 w-3.5 mr-1" data-oid="vg5m-wb" />
              ) : (
                <ArrowDownIcon
                  className="h-3.5 w-3.5 mr-1"
                  data-oid="_ggom1h"
                />
              )}
              {trend.value}%
            </UIBadge>
          )}
        </div>
        <BodySM color="muted" className="mt-1" data-oid="_evpcjg">
          {subtext}
        </BodySM>
      </CardContent>
    </Card>
  );
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
  title: string;
  icon: React.ElementType;
  variant: "primary" | "success" | "secondary" | "purple";
  onClick?: () => void;
  className?: string;
}) {
  const cardVariant =
    variant === "primary"
      ? "primary"
      : variant === "secondary"
        ? "secondary"
        : variant === "success"
          ? "success"
          : "default";
  const iconColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-emerald-600 dark:text-emerald-400",
    purple: "text-purple-600 dark:text-purple-400",
  };
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
      data-oid="bcewc7w"
    >
      <CardContent
        spacing="compact"
        className="flex items-center gap-4 p-4"
        data-oid="q-7i5vc"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center bg-background/60"
          data-oid="pg_r2g."
        >
          <Icon
            className={cn("h-5 w-5", iconColors[variant])}
            data-oid="jolikjw"
          />
        </div>
        <div className="text-left" data-oid="i94rw6e">
          <BodySM weight="medium" data-oid="5.244ew">
            {title}
          </BodySM>
        </div>
      </CardContent>
    </Card>
  );
}

// ------------------------------------------------------------
// LOADING CARD
// ------------------------------------------------------------
function LoadingCard() {
  return (
    <Card elevation="low" className="h-full" data-oid=".mmo743">
      <CardHeader
        spacing="compact"
        className="flex flex-row items-center justify-between space-y-0"
        data-oid="izf0pub"
      >
        <Skeleton className="h-4 w-24" data-oid="ih:vqiz" />
        <Skeleton className="h-8 w-8 rounded-full" data-oid="81ca9vi" />
      </CardHeader>
      <CardContent spacing="compact" data-oid="15-7i6m">
        <div className="space-y-3" data-oid="mbwjn02">
          <Skeleton className="h-8 w-28" data-oid="jkn9ppy" />
          <Skeleton className="h-4 w-full" data-oid="_25ana2" />
          <Skeleton className="h-4 w-3/4" data-oid="v7zrvuw" />
        </div>
      </CardContent>
    </Card>
  );
}

// ------------------------------------------------------------
// STATUS BADGE
// ------------------------------------------------------------
function StatusBadge({ status }: { status: "pending" | "paid" | "overdue" }) {
  const variants = {
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/30 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20",
    paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20",
    overdue:
      "bg-red-100 text-red-700 dark:bg-red-500/30 dark:text-red-400 border border-red-200 dark:border-red-500/20",
  };
  const labels = {
    pending: "En Attente",
    paid: "Payée",
    overdue: "En Retard",
  };
  const icons = {
    pending: <ClockIcon className="h-3.5 w-3.5 mr-1.5" data-oid="t7a32b-" />,
    paid: (
      <CheckCircledIcon className="h-3.5 w-3.5 mr-1.5" data-oid=".oqagrm" />
    ),

    overdue: (
      <ExclamationTriangleIcon
        className="h-3.5 w-3.5 mr-1.5"
        data-oid="r7:-y-."
      />
    ),
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        variants[status],
      )}
      data-oid="3r.g4a9"
    >
      {icons[status]}
      <span className="hidden xs:inline" data-oid=".gni75a">
        {labels[status]}
      </span>
      <span className="xs:hidden" data-oid="8se8sp8">
        {status === "pending" ? "EA" : status === "paid" ? "P" : "ER"}
      </span>
    </span>
  );
}

// ------------------------------------------------------------
// MAIN DASHBOARD PAGE
// ------------------------------------------------------------
export default function Page() {
  return (
    <main
      role="main"
      className="container mx-auto px-4 py-6 max-w-7xl"
      data-oid="r_g.x2:"
    >
      <div className="grid gap-4 md:gap-6" data-oid=":fzr440">
        {/* Top Row: Welcome Banner, CTA, and Key Metrics */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
          data-oid="hgumigf"
        >
          {/* Welcome Banner */}
          <div className="lg:col-span-6" data-oid="35pxu8o">
            <Card
              elevation="low"
              isHoverable
              className="h-full"
              data-oid="39.elsc"
            >
              <CardContent
                spacing="default"
                className="flex flex-col justify-between h-full space-y-4 p-6"
                data-oid="int2::v"
              >
                <div data-oid="3d9-z9b">
                  <HeadingLG
                    weight="semibold"
                    className="tracking-tight"
                    data-oid="8ozj-8v"
                  >
                    Bienvenue, Freelance
                  </HeadingLG>
                  <BodySM
                    color="muted"
                    className="mt-1 max-w-md"
                    data-oid="kcvd9x:"
                  >
                    Voici un aperçu de votre financement de factures et de vos
                    performances récentes
                  </BodySM>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="dn8cuww">
                  <div
                    className="rounded-lg p-4 bg-muted/60"
                    data-oid="0e7fj3s"
                  >
                    <BodyXS color="muted" weight="medium" data-oid="dohiw8u">
                      Total Financé
                    </BodyXS>
                    <div
                      className="flex items-baseline gap-2 mt-1"
                      data-oid="e2secp4"
                    >
                      <HeadingSM weight="bold" data-oid="xk__slj">
                        24 500 €
                      </HeadingSM>
                      <UIBadge
                        variant="default"
                        className="h-5"
                        data-oid="1l8tle:"
                      >
                        <ArrowUpIcon
                          className="h-3 w-3 mr-0.5"
                          data-oid="phin7ua"
                        />
                        15%
                      </UIBadge>
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-4 bg-muted/60"
                    data-oid="0z4ix7y"
                  >
                    <BodyXS color="muted" weight="medium" data-oid="7bsnyje">
                      En Attente
                    </BodyXS>
                    <div
                      className="flex items-baseline gap-2 mt-1"
                      data-oid="oi2rmqk"
                    >
                      <HeadingSM weight="bold" data-oid="cty1x87">
                        8 200 €
                      </HeadingSM>
                      <BodyXS
                        color="muted"
                        className="tracking-wide"
                        data-oid="bz9x:gc"
                      >
                        (3)
                      </BodyXS>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3" data-oid="z:jbqad">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    data-oid="lhk.3r_"
                  >
                    <CalendarIcon className="h-3.5 w-3.5" data-oid="7-p_364" />
                    <span className="text-sm" data-oid="0s7:fp4">
                      Voir Calendrier
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    data-oid="6uujku6"
                  >
                    <DownloadIcon className="h-3.5 w-3.5" data-oid="x5i_ivv" />
                    <span className="text-sm" data-oid="uzrztn1">
                      Exporter
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Invoice CTA */}
          <div className="lg:col-span-3" data-oid="7.fh7wr">
            <Card
              variant="primary"
              elevation="low"
              isHoverable
              className="h-full"
              data-oid="-zi25iq"
            >
              <CardContent
                spacing="default"
                className="flex flex-col justify-between h-full space-y-4 p-6"
                data-oid="qy7n2x_"
              >
                <div data-oid="h0_b7-l">
                  <HeadingMD
                    weight="semibold"
                    className="tracking-tight"
                    data-oid="6i1wr3e"
                  >
                    Créer une Facture
                  </HeadingMD>
                  <BodySM color="muted" className="mt-1" data-oid="4.qlli6">
                    Ajoutez rapidement une nouvelle facture
                  </BodySM>
                </div>
                <div
                  className="flex items-center justify-center my-4"
                  data-oid="-89vzqj"
                >
                  <div
                    className="w-20 h-20 rounded-full bg-background/60 flex items-center justify-center"
                    data-oid="eybx9.z"
                  >
                    <FileTextIcon
                      className="h-10 w-10 text-primary"
                      data-oid=":elwbxx"
                    />
                  </div>
                </div>
                <Button size="sm" className="w-full gap-1.5" data-oid="qcbssw2">
                  <PlusCircledIcon className="h-3.5 w-3.5" data-oid="snui7n7" />
                  <span className="text-sm font-medium" data-oid="ue3v8xv">
                    Nouvelle Facture
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <div
            className="lg:col-span-3 grid grid-cols-1 gap-4 md:gap-6"
            data-oid="iibapz6"
          >
            <StatCard
              title="Taux Actuel"
              value="2.9%"
              subtext="Taux préférentiel"
              icon={LightningBoltIcon}
              variant="primary"
              trend={{
                value: 12,
                positive: true,
              }}
              data-oid="9a6eopp"
            />

            <StatCard
              title="Limite Utilisée"
              value="75%"
              subtext="18 750 € / 25 000 €"
              icon={BackpackIcon}
              variant="primary"
              data-oid="7:u.th:"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6"
          data-oid="o-:1-4w"
        >
          <QuickActionCard
            title="Demander Financement"
            icon={DashboardIcon}
            variant="success"
            data-oid="vaqhz1."
          />

          <QuickActionCard
            title="Ajouter Client"
            icon={PersonIcon}
            variant="primary"
            data-oid="t8s3wtw"
          />

          <QuickActionCard
            title="Voir Statistiques"
            icon={BarChartIcon}
            variant="secondary"
            data-oid="ql268za"
          />

          <QuickActionCard
            title="Gérer Documents"
            icon={FileTextIcon}
            variant="purple"
            data-oid="-9f5_02"
          />
        </div>

        {/* Second Row of Key Metrics */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          data-oid="kp.z0a:"
        >
          <StatCard
            title="Factures en Attente"
            value="3"
            subtext="Valeur totale: 8 200 €"
            icon={ClockIcon}
            variant="warning"
            data-oid="ix5p:r4"
          />

          <StatCard
            title="Revenus Mensuels"
            value="26 500 €"
            subtext="Juin 2023"
            icon={UploadIcon}
            variant="success"
            trend={{
              value: 16,
              positive: true,
            }}
            data-oid="osw-mxt"
          />

          <StatCard
            title="Délai de Paiement"
            value="14 jours"
            subtext="Moyenne sur 6 mois"
            icon={CalendarIcon}
            variant="secondary"
            data-oid="v1d5ocn"
          />

          <StatCard
            title="Taux d'Acceptation"
            value="92%"
            subtext="Demandes approuvées"
            icon={CheckCircledIcon}
            variant="success"
            data-oid="ao87-8h"
          />
        </div>

        {/* Main Dashboard Content: Chart + Upcoming Payments */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
          data-oid=":f-3x2q"
        >
          {/* Calendar Section */}
          <Card
            className="lg:col-span-5"
            elevation="low"
            isHoverable
            data-oid="jkn90d9"
          >
            <CardHeader
              spacing="compact"
              withSeparator
              className="flex flex-row items-center justify-between"
              data-oid="tnob1w_"
            >
              <CardTitle size="sm" data-oid="9f_z3bg">
                Calendrier
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Voir plus"
                data-oid="qp75_hc"
              >
                <ExternalLinkIcon className="h-4 w-4" data-oid="3vx6odp" />
              </Button>
            </CardHeader>
            <CardContent
              spacing="compact"
              className="flex-grow p-0"
              data-oid="peig7g_"
            >
              <CalendarView
                events={calendarEvents}
                className="h-[300px] md:h-[350px]"
                hideMonthControls
                data-oid="upgta2v"
              />
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card
            className="lg:col-span-3"
            elevation="low"
            isHoverable
            data-oid="z28qvr0"
          >
            <CardHeader
              spacing="compact"
              withSeparator
              className="flex flex-row items-center justify-between"
              data-oid="bxu432b"
            >
              <CardTitle size="sm" data-oid="-3kk4i6">
                Paiements à Venir
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Voir plus"
                data-oid="a7g09ye"
              >
                <ExternalLinkIcon className="h-4 w-4" data-oid="cvzm3up" />
              </Button>
            </CardHeader>
            <CardContent
              spacing="compact"
              className="overflow-x-auto"
              data-oid="41bsva7"
            >
              <div className="space-y-4" data-oid="dee2qcc">
                <div className="space-y-2" data-oid="oumig1w">
                  <div
                    className="flex justify-between items-center"
                    data-oid="ag1etmm"
                  >
                    <BodySM weight="medium" data-oid="lm8c6ms">
                      Agence Web
                    </BodySM>
                    <BodySM weight="semibold" data-oid="4r0:.jf">
                      3 200 €
                    </BodySM>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    data-oid="5hemzy3"
                  >
                    <BodyXS color="muted" data-oid="4_fnnev">
                      Échéance dans 2 jours
                    </BodyXS>
                    <BodyXS color="muted" data-oid="va-so9d">
                      15 Mars 2023
                    </BodyXS>
                  </div>
                  <Progress value={80} className="h-1.5" data-oid="fei2tuz" />
                </div>
                <div className="space-y-2" data-oid="62ive.k">
                  <div
                    className="flex justify-between items-center"
                    data-oid="2w9wltn"
                  >
                    <BodySM weight="medium" data-oid="f42ufr-">
                      Studio Design
                    </BodySM>
                    <BodySM weight="semibold" data-oid=".k91wqp">
                      1 800 €
                    </BodySM>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    data-oid="99zhyo3"
                  >
                    <BodyXS color="muted" data-oid="5hnjyrq">
                      Échéance dans 5 jours
                    </BodyXS>
                    <BodyXS color="muted" data-oid="x4rkcws">
                      18 Mars 2023
                    </BodyXS>
                  </div>
                  <Progress value={50} className="h-1.5" data-oid="8-1rpsj" />
                </div>
                <div className="space-y-2" data-oid="b9t41t6">
                  <div
                    className="flex justify-between items-center"
                    data-oid="d-theug"
                  >
                    <BodySM weight="medium" data-oid="l54394q">
                      Tech Solutions
                    </BodySM>
                    <BodySM weight="semibold" data-oid="gc7uq0q">
                      4 500 €
                    </BodySM>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    data-oid="1y242dg"
                  >
                    <BodyXS color="muted" data-oid="o_5cmz1">
                      Échéance dans 10 jours
                    </BodyXS>
                    <BodyXS color="muted" data-oid="pkh:m0e">
                      23 Mars 2023
                    </BodyXS>
                  </div>
                  <Progress value={25} className="h-1.5" data-oid="4oel8ee" />
                </div>
              </div>
            </CardContent>
            <CardFooter
              spacing="compact"
              withSeparator
              className="justify-center"
              data-oid="csmk_ty"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                data-oid="3fpqpi9"
              >
                Voir tous les paiements
              </Button>
            </CardFooter>
          </Card>

          {/* Revenue Chart */}
          <Card
            className="lg:col-span-4"
            elevation="low"
            isHoverable
            data-oid="qfk8y4:"
          >
            <CardHeader
              spacing="compact"
              withSeparator
              className="flex flex-row items-center justify-between"
              data-oid="0umujlq"
            >
              <CardTitle size="sm" data-oid="mqlr9fr">
                Tendance des Revenus
              </CardTitle>
              <div className="flex items-center gap-2" data-oid="z83ueli">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  data-oid="84iold5"
                >
                  Mensuel
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Voir plus"
                  data-oid="7yje_l-"
                >
                  <ExternalLinkIcon className="h-4 w-4" data-oid="eemrju-" />
                </Button>
              </div>
            </CardHeader>
            <CardContent
              spacing="compact"
              className="h-[250px] md:h-[350px] px-0 pb-0 overflow-visible"
              data-oid="0wj6k:h"
            >
              <Suspense
                fallback={<LoadingCard data-oid="9nw1afo" />}
                data-oid="u5drm:u"
              >
                <RevenueChart
                  data={revenueData}
                  showLegend
                  data-oid="pbzisbc"
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices + Notifications */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
          data-oid="vqr7nbs"
        >
          {/* Recent Invoices */}
          <Card
            className="lg:col-span-8"
            elevation="low"
            isHoverable
            data-oid="qf.crm3"
          >
            <CardHeader
              spacing="compact"
              withSeparator
              className="flex flex-row items-center justify-between"
              data-oid="flln60m"
            >
              <CardTitle size="sm" data-oid="sm5br54">
                Factures Récentes
              </CardTitle>
              <div className="flex items-center gap-2" data-oid="adap01c">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  data-oid="su_f509"
                >
                  Filtrer
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Voir plus"
                  data-oid="ana57a-"
                >
                  <ExternalLinkIcon className="h-4 w-4" data-oid="lvn6vzv" />
                </Button>
              </div>
            </CardHeader>
            <CardContent
              spacing="compact"
              className="overflow-x-auto p-0"
              data-oid="fv6.i2d"
            >
              <Table data-oid="zdif8im">
                <TableHeader data-oid="i3_kek_">
                  <TableRow data-oid="ob4hau8">
                    <TableHead
                      className="text-xs font-medium"
                      data-oid="j84zk8f"
                    >
                      Client
                    </TableHead>
                    <TableHead
                      className="text-xs font-medium"
                      data-oid="tt935ni"
                    >
                      Montant
                    </TableHead>
                    <TableHead
                      className="text-xs font-medium"
                      data-oid="0-ss8v_"
                    >
                      Statut
                    </TableHead>
                    <TableHead
                      className="text-right text-xs font-medium"
                      data-oid="jsb:ko4"
                    >
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody data-oid="_hyyx1_">
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id} data-oid="k6-9d9k">
                      <TableCell
                        className="py-3 text-sm font-medium"
                        data-oid="71_unz3"
                      >
                        {invoice.client}
                      </TableCell>
                      <TableCell className="py-3 text-sm" data-oid="3j.5b41">
                        {invoice.amount} €
                      </TableCell>
                      <TableCell className="py-2" data-oid="p5:vazx">
                        <StatusBadge
                          status={invoice.status}
                          data-oid="a3h3ka6"
                        />
                      </TableCell>
                      <TableCell className="py-3 text-right" data-oid="zrildn7">
                        <div
                          className="flex items-center justify-end gap-1"
                          data-oid="pgqi1bm"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Voir facture"
                            data-oid="2b2p9_7"
                          >
                            <EyeOpenIcon
                              className="h-4 w-4"
                              data-oid="ijpg4be"
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label="Télécharger facture"
                            data-oid="_8ymsoj"
                          >
                            <DownloadIcon
                              className="h-4 w-4"
                              data-oid="jkem_o2"
                            />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter
              spacing="compact"
              withSeparator
              className="justify-center"
              data-oid="znoxike"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                data-oid="n-cvr.8"
              >
                Voir toutes les factures
              </Button>
            </CardFooter>
          </Card>

          {/* Notifications */}
          <Card
            className="lg:col-span-4"
            elevation="low"
            isHoverable
            data-oid="bf-ue0k"
          >
            <CardHeader
              spacing="compact"
              withSeparator
              className="flex flex-row items-center justify-between"
              data-oid="b-cm51n"
            >
              <CardTitle size="sm" data-oid="om2okg3">
                Notifications
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Voir plus"
                data-oid="3gtvz2o"
              >
                <ExternalLinkIcon className="h-4 w-4" data-oid="n6dxr8w" />
              </Button>
            </CardHeader>
            <CardContent
              spacing="compact"
              className="flex-grow overflow-auto"
              data-oid="c6cdggu"
            >
              <div className="space-y-4" data-oid="ust7wfj">
                {recentNotifications.map((notification) => {
                  let notifIcon = (
                    <ClockIcon className="h-4 w-4" data-oid="h0j9a6w" />
                  );

                  let notifBgClass =
                    "bg-blue-500/10 text-blue-500 border border-blue-500/20";
                  if (
                    notification.title.includes("Paiement") ||
                    notification.title.includes("Approuvé")
                  ) {
                    notifIcon = (
                      <CheckCircledIcon
                        className="h-4 w-4"
                        data-oid=".h28o10"
                      />
                    );

                    notifBgClass =
                      "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
                  } else if (notification.title.includes("Approbation")) {
                    notifIcon = (
                      <ExclamationTriangleIcon
                        className="h-4 w-4"
                        data-oid=".8nckup"
                      />
                    );

                    notifBgClass =
                      "bg-amber-500/10 text-amber-500 border border-amber-500/20";
                  }
                  return (
                    <div
                      key={notification.id}
                      className="flex gap-3 items-start pb-4 border-b border-border/40 last:border-0 last:pb-0"
                      data-oid="5_1o6qc"
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          notifBgClass,
                        )}
                        data-oid="c4gres9"
                      >
                        {notifIcon}
                      </div>
                      <div className="space-y-1" data-oid="mkpv1vb">
                        <BodySM weight="medium" data-oid="_nzb0:m">
                          {notification.title}
                        </BodySM>
                        <BodyXS color="muted" data-oid="o3-_sli">
                          {notification.description}
                        </BodyXS>
                        <BodyXS
                          color="muted"
                          className="opacity-70"
                          data-oid="a239ruz"
                        >
                          {notification.date}
                        </BodyXS>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter
              spacing="compact"
              withSeparator
              className="justify-center"
              data-oid="sgcur4v"
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                data-oid="4w2_4lz"
              >
                Voir toutes les notifications
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
