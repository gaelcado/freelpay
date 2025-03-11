"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Search } from "lucide-react"
import { HeadingLG, BodyMD } from "@/components/ui/typography"
import Link from "next/link"

// Mock data for financing requests
const mockFinancingRequests = [
  {
    id: "FIN-001",
    invoiceId: "INV-001",
    client: "Acme Inc.",
    amount: 2000,
    requestDate: "2023-03-02",
    status: "approved",
    rate: 3.5,
  },
  {
    id: "FIN-002",
    invoiceId: "INV-003",
    client: "Stark Industries",
    amount: 3000,
    requestDate: "2023-03-11",
    status: "pending",
    rate: 4.0,
  },
  {
    id: "FIN-003",
    invoiceId: "INV-004",
    client: "Wayne Enterprises",
    amount: 4000,
    requestDate: "2023-03-16",
    status: "rejected",
    rate: 0,
  },
]

export default function FinancingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredRequests = mockFinancingRequests.filter(request => 
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.client.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-chart-3 text-white"
      case "pending":
        return "bg-chart-5 text-white"
      case "rejected":
        return "bg-destructive text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }
  
  const formatStatus = (status: string) => {
    switch (status) {
      case "approved":
        return "Approuvé"
      case "pending":
        return "En attente"
      case "rejected":
        return "Refusé"
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
          <HeadingLG>Financements</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Gérez vos demandes de financement de factures
          </BodyMD>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/financing/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle demande
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/financing/simulation">
              Simulation
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-6">
        <Card variant="default" elevation="medium">
          <CardHeader>
            <CardTitle>Demandes de financement</CardTitle>
            <CardDescription>
              Vous avez {mockFinancingRequests.length} demandes de financement
            </CardDescription>
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
                  <TableHead>ID</TableHead>
                  <TableHead>Facture</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date de demande</TableHead>
                  <TableHead>Taux</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/financing/${request.id}`} className="flex items-center hover:underline">
                          <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                          {request.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/invoices/${request.invoiceId}`} className="hover:underline">
                          {request.invoiceId}
                        </Link>
                      </TableCell>
                      <TableCell>{request.client}</TableCell>
                      <TableCell>{formatCurrency(request.amount)}</TableCell>
                      <TableCell>{formatDate(request.requestDate)}</TableCell>
                      <TableCell>{request.status === "rejected" ? "-" : `${request.rate}%`}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {formatStatus(request.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      Aucune demande de financement trouvée
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