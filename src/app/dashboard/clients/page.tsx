"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building, Plus, Search } from "lucide-react"
import { HeadingLG, BodyMD } from "@/components/ui/typography"
import Link from "next/link"

// Mock data for clients
const mockClients = [
  {
    id: "CLI-001",
    name: "Acme Inc.",
    contact: "John Doe",
    email: "john@acme.com",
    phone: "+33 1 23 45 67 89",
    type: "enterprise",
    status: "active",
  },
  {
    id: "CLI-002",
    name: "Globex Corp",
    contact: "Jane Smith",
    email: "jane@globex.com",
    phone: "+33 1 23 45 67 90",
    type: "sme",
    status: "active",
  },
  {
    id: "CLI-003",
    name: "Stark Industries",
    contact: "Tony Stark",
    email: "tony@stark.com",
    phone: "+33 1 23 45 67 91",
    type: "enterprise",
    status: "active",
  },
  {
    id: "CLI-004",
    name: "Wayne Enterprises",
    contact: "Bruce Wayne",
    email: "bruce@wayne.com",
    phone: "+33 1 23 45 67 92",
    type: "enterprise",
    status: "inactive",
  },
  {
    id: "CLI-005",
    name: "Oscorp",
    contact: "Norman Osborn",
    email: "norman@oscorp.com",
    phone: "+33 1 23 45 67 93",
    type: "sme",
    status: "active",
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "enterprise":
        return "Grande entreprise"
      case "sme":
        return "PME"
      case "public":
        return "Secteur public"
      default:
        return type
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-3 text-white"
      case "inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }
  
  const formatStatus = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "inactive":
        return "Inactif"
      default:
        return status
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <HeadingLG>Clients</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Gérez vos clients et leurs informations
          </BodyMD>
        </div>
        <Button asChild>
          <Link href="/dashboard/clients/add">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un client
          </Link>
        </Button>
      </div>
      
      <div className="mt-6">
        <Card variant="default" elevation="medium">
          <CardHeader>
            <CardTitle>Liste des clients</CardTitle>
            <CardDescription>
              Vous avez {mockClients.length} clients au total
            </CardDescription>
            <div className="mt-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par nom, contact ou email..."
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
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/clients/${client.id}`} className="flex items-center hover:underline">
                          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                          {client.name}
                        </Link>
                      </TableCell>
                      <TableCell>{client.contact}</TableCell>
                      <TableCell>
                        <a href={`mailto:${client.email}`} className="hover:underline">
                          {client.email}
                        </a>
                      </TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{getTypeLabel(client.type)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(client.status)}>
                          {formatStatus(client.status)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Aucun client trouvé
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