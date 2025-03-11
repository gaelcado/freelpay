"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Search } from "lucide-react"
import { HeadingLG, BodyMD } from "@/components/ui/typography"
import Link from "next/link"

// Mock data for invoices
const mockInvoices = [
  {
    id: "INV-001",
    client: "Acme Inc.",
    amount: 2500,
    date: "2023-03-01",
    dueDate: "2023-04-01",
    status: "pending",
  },
  {
    id: "INV-002",
    client: "Globex Corp",
    amount: 1800,
    date: "2023-03-05",
    dueDate: "2023-04-05",
    status: "paid",
  },
  {
    id: "INV-003",
    client: "Stark Industries",
    amount: 3200,
    date: "2023-03-10",
    dueDate: "2023-04-10",
    status: "overdue",
  },
  {
    id: "INV-004",
    client: "Wayne Enterprises",
    amount: 4500,
    date: "2023-03-15",
    dueDate: "2023-04-15",
    status: "pending",
  },
  {
    id: "INV-005",
    client: "Oscorp",
    amount: 1200,
    date: "2023-03-20",
    dueDate: "2023-04-20",
    status: "paid",
  },
]

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-chart-3 text-white"
      case "pending":
        return "bg-chart-5 text-white"
      case "overdue":
        return "bg-destructive text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }
  
  const formatStatus = (status: string) => {
    switch (status) {
      case "paid":
        return "Payée"
      case "pending":
        return "En attente"
      case "overdue":
        return "En retard"
      default:
        return status
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR').format(date)
  }
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <HeadingLG>Mes Factures ({mockInvoices.length})</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Gérez vos factures et suivez leur statut
          </BodyMD>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/create">
            <Plus className="mr-2 h-4 w-4" />
            Créer une facture
          </Link>
        </Button>
      </div>
      
      <div className="mt-6">
        <Card variant="default" elevation="medium">
          <CardHeader>
            <div className="mt-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par numéro ou client..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date d&apos;émission</TableHead>
                  <TableHead>Date d&apos;échéance</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/invoices/${invoice.id}`} className="flex items-center hover:underline">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          {invoice.id}
                        </Link>
                      </TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>
                          {formatStatus(invoice.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Aucune facture trouvée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Précédent
            </Button>
            <Button variant="outline" disabled>
              Suivant
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 