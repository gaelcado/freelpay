"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileCheck, FileText, Search, Upload } from "lucide-react"
import { HeadingLG, BodyMD } from "@/components/ui/typography"
import Link from "next/link"

// Mock data for documents
const mockDocuments = [
  {
    id: "DOC-001",
    name: "Contrat de financement - Acme Inc.",
    type: "contract",
    date: "2023-03-02",
    status: "signed",
    relatedTo: "FIN-001",
  },
  {
    id: "DOC-002",
    name: "Facture INV-001 - Acme Inc.",
    type: "invoice",
    date: "2023-03-01",
    status: "final",
    relatedTo: "INV-001",
  },
  {
    id: "DOC-003",
    name: "Contrat de financement - Stark Industries",
    type: "contract",
    date: "2023-03-11",
    status: "pending",
    relatedTo: "FIN-002",
  },
  {
    id: "DOC-004",
    name: "Facture INV-003 - Stark Industries",
    type: "invoice",
    date: "2023-03-10",
    status: "final",
    relatedTo: "INV-003",
  },
  {
    id: "DOC-005",
    name: "Facture INV-004 - Wayne Enterprises",
    type: "invoice",
    date: "2023-03-15",
    status: "final",
    relatedTo: "INV-004",
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  
  const filteredDocuments = mockDocuments
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(doc => filter === "all" || doc.type === filter)
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "contract":
        return "Contrat"
      case "invoice":
        return "Facture"
      default:
        return type
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "bg-chart-3 text-white"
      case "pending":
        return "bg-chart-5 text-white"
      case "final":
        return "bg-primary text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }
  
  const formatStatus = (status: string) => {
    switch (status) {
      case "signed":
        return "Signé"
      case "pending":
        return "En attente"
      case "final":
        return "Final"
      default:
        return status
    }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR').format(date)
  }
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileCheck className="mr-2 h-4 w-4 text-muted-foreground" />
      case "invoice":
        return <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
      default:
        return <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <HeadingLG>Documents</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Gérez vos contrats, factures et autres documents
          </BodyMD>
        </div>
        <Button asChild>
          <Link href="#">
            <Upload className="mr-2 h-4 w-4" />
            Télécharger un document
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des documents</CardTitle>
          <CardDescription>
            Vous avez {mockDocuments.length} documents au total
          </CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom ou ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
              >
                Tous
              </Button>
              <Button 
                variant={filter === "contract" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("contract")}
              >
                Contrats
              </Button>
              <Button 
                variant={filter === "invoice" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("invoice")}
              >
                Factures
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Référence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/documents/${doc.id}`} className="flex items-center hover:underline">
                        {getTypeIcon(doc.type)}
                        {doc.name}
                      </Link>
                    </TableCell>
                    <TableCell>{getTypeLabel(doc.type)}</TableCell>
                    <TableCell>{formatDate(doc.date)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(doc.status)}>
                        {formatStatus(doc.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/dashboard/${doc.type === 'invoice' ? 'invoices' : 'financing'}/${doc.relatedTo}`} 
                        className="hover:underline"
                      >
                        {doc.relatedTo}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Aucun document trouvé
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