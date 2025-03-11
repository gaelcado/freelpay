"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeadingLG, BodyMD } from "@/components/ui/typography"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CreateInvoicePage() {
  const router = useRouter()
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }])
  
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }])
  }
  
  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }
  
  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }
  
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0)
  }
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.2 // 20% TVA
  }
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally submit the form data to your API
    alert("Facture créée avec succès!")
    router.push("/dashboard/invoices")
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <HeadingLG>Créer une facture</HeadingLG>
          <BodyMD className="text-muted-foreground">
            Créez une nouvelle facture pour vos clients
          </BodyMD>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/invoices">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux factures
          </Link>
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>
                Entrez les informations de base de la facture
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-number">Numéro de facture</Label>
                  <Input id="invoice-number" placeholder="INV-001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-date">Date d&apos;émission</Label>
                  <Input id="invoice-date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="due-date">Date d&apos;échéance</Label>
                  <Input id="due-date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select required>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client-1">Acme Inc.</SelectItem>
                      <SelectItem value="client-2">Globex Corp</SelectItem>
                      <SelectItem value="client-3">Stark Industries</SelectItem>
                      <SelectItem value="client-4">Wayne Enterprises</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Informations supplémentaires..." />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Éléments de la facture</CardTitle>
              <CardDescription>
                Ajoutez les produits ou services à facturer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-12 md:col-span-6 space-y-2">
                    <Label htmlFor={`item-description-${index}`}>Description</Label>
                    <Input 
                      id={`item-description-${index}`} 
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      placeholder="Description du produit ou service"
                      required
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2 space-y-2">
                    <Label htmlFor={`item-quantity-${index}`}>Quantité</Label>
                    <Input 
                      id={`item-quantity-${index}`} 
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3 space-y-2">
                    <Label htmlFor={`item-price-${index}`}>Prix unitaire (€)</Label>
                    <Input 
                      id={`item-price-${index}`} 
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button type="button" variant="outline" onClick={addItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un élément
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-end border-t p-6">
              <div className="space-y-2 text-right">
                <div className="flex justify-between w-full md:w-72">
                  <span>Sous-total:</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between w-full md:w-72">
                  <span>TVA (20%):</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(calculateTax())}</span>
                </div>
                <div className="flex justify-between w-full md:w-72 font-bold">
                  <span>Total:</span>
                  <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(calculateTotal())}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/invoices")}>
              Annuler
            </Button>
            <Button type="submit">
              Créer la facture
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
} 