"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight, Search, Wallet } from "lucide-react"
import { HeadingLG, BodyMD, HeadingMD } from "@/components/ui/typography"
import Link from "next/link"

// Mock data for transactions
const mockTransactions = [
  {
    id: "TRX-001",
    date: "2023-03-03",
    description: "Financement de facture INV-001",
    amount: 2000,
    type: "credit",
    status: "completed",
    relatedTo: "FIN-001",
  },
  {
    id: "TRX-002",
    date: "2023-03-12",
    description: "Financement de facture INV-003",
    amount: 3000,
    type: "credit",
    status: "pending",
    relatedTo: "FIN-002",
  },
  {
    id: "TRX-003",
    date: "2023-04-01",
    description: "Remboursement de facture INV-001",
    amount: 2500,
    type: "debit",
    status: "completed",
    relatedTo: "INV-001",
  },
  {
    id: "TRX-004",
    date: "2023-04-05",
    description: "Frais de service - Mars 2023",
    amount: 50,
    type: "debit",
    status: "completed",
    relatedTo: null,
  },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredTransactions = mockTransactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-3 text-white"
      case "pending":
        return "bg-chart-5 text-white"
      case "failed":
        return "bg-destructive text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }
  
  const formatStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "Complété"
      case "pending":
        return "En attente"
      case "failed":
        return "Échoué"
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
  
  const totalCredit = mockTransactions
    .filter(t => t.type === "credit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const totalDebit = mockTransactions
    .filter(t => t.type === "debit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
    
  const balance = totalCredit - totalDebit
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <HeadingLG>Paiements</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Suivez vos transactions et mouvements financiers
          </BodyMD>
        </div>
        <Button asChild>
          <Link href="#">
            <Wallet className="mr-2 h-4 w-4" />
            Coordonnées bancaires
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card variant="default" elevation="medium">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Solde actuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HeadingMD className={balance >= 0 ? "text-chart-3" : "text-destructive"}>
              {formatCurrency(balance)}
            </HeadingMD>
          </CardContent>
        </Card>
        
        <Card variant="default" elevation="medium">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total des entrées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HeadingMD className="text-chart-3">
              {formatCurrency(totalCredit)}
            </HeadingMD>
          </CardContent>
        </Card>
        
        <Card variant="default" elevation="medium">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total des sorties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HeadingMD className="text-destructive">
              {formatCurrency(totalDebit)}
            </HeadingMD>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Historique des transactions</CardTitle>
          <CardDescription>
            Vous avez {mockTransactions.length} transactions
          </CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par description ou ID..."
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
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Référence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="mr-2 h-4 w-4 text-chart-3" />
                        ) : (
                          <ArrowUpRight className="mr-2 h-4 w-4 text-destructive" />
                        )}
                        <span className={transaction.type === "credit" ? "text-chart-3" : "text-destructive"}>
                          {transaction.type === "credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {formatStatus(transaction.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.relatedTo ? (
                        <Link 
                          href={`/dashboard/${transaction.relatedTo.startsWith('FIN') ? 'financing' : 'invoices'}/${transaction.relatedTo}`} 
                          className="hover:underline"
                        >
                          {transaction.relatedTo}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Aucune transaction trouvée
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
  )
} 