export const revenueData = [
  { month: 'Jan', current: 18500, previous: 12400 },
  { month: 'Fév', current: 22000, previous: 15800 },
  { month: 'Mar', current: 19500, previous: 17200 },
  { month: 'Avr', current: 24500, previous: 18900 },
  { month: 'Mai', current: 21800, previous: 20400 },
  { month: 'Juin', current: 26500, previous: 22800 },
]

export type Invoice = {
  id: string
  amount: number
  dueDate: string
  status: 'pending' | 'paid' | 'overdue'
  client?: string
}

export const recentInvoices: Invoice[] = [
  { id: '1234', amount: 1999, dueDate: '15', status: 'pending', client: 'TechSolutions Inc.' },
  { id: '1235', amount: 3500, dueDate: '7', status: 'pending', client: 'Agence Créative' },
  { id: '1233', amount: 2450, dueDate: '0', status: 'paid', client: 'Innovations Globales' },
  { id: '1232', amount: 5200, dueDate: '3', status: 'overdue', client: 'Partenaires Marketing' },
]

export type Notification = {
  id: string
  title: string
  description: string
  date: string
}

export const recentNotifications: Notification[] = [
  {
    id: '1',
    title: 'Paiement Reçu',
    description: 'La facture #1233 a été payée',
    date: 'il y a 2 heures',
  },
  {
    id: '2',
    title: 'Nouvelle Approbation de Facture',
    description: 'Approbation client nécessaire pour #1236',
    date: 'il y a 5 heures',
  },
  {
    id: '3',
    title: 'Financement Approuvé',
    description: 'Votre demande de 7 500 € a été approuvée',
    date: 'il y a 1 jour',
  },
  {
    id: '4',
    title: 'Client Ajouté',
    description: 'Nouveau client "Solutions Digitales" ajouté à votre portefeuille',
    date: 'il y a 2 jours',
  },
]