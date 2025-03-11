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
    id: '4',
    title: 'Client Ajouté',
    description: 'Nouveau client "Solutions Digitales" ajouté à votre portefeuille',
    date: 'il y a 2 jours',
  },
]

export type CalendarEvent = {
  id: string
  title: string
  date: Date
  type: 'payment' | 'meeting' | 'deadline' | 'invoice'
  client?: string
  amount?: number
  description?: string
}

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'evt-001',
    title: 'Échéance Facture #1235',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2),
    type: 'payment',
    client: 'Agence Créative',
    amount: 3500,
    description: 'Paiement attendu pour la facture #1235'
  },
  {
    id: 'evt-002',
    title: 'Réunion Client',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
    type: 'meeting',
    client: 'TechSolutions Inc.',
    description: 'Discussion sur le nouveau projet'
  },
  {
    id: 'evt-003',
    title: 'Date Limite Projet',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5),
    type: 'deadline',
    client: 'Innovations Globales',
    description: 'Livraison finale du projet web'
  },
  {
    id: 'evt-004',
    title: 'Nouvelle Facture',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    type: 'invoice',
    client: 'Partenaires Marketing',
    amount: 4200,
    description: 'Création d\'une nouvelle facture'
  },
  {
    id: 'evt-005',
    title: 'Échéance Facture #1232',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
    type: 'payment',
    client: 'Partenaires Marketing',
    amount: 5200,
    description: 'Paiement attendu pour la facture #1232'
  },
  {
    id: 'evt-006',
    title: 'Réunion Équipe',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 4),
    type: 'meeting',
    description: 'Réunion hebdomadaire d\'équipe'
  },
  {
    id: 'evt-007',
    title: 'Nouvelle Facture',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
    type: 'invoice',
    client: 'Studio Design',
    amount: 2800,
    description: 'Création d\'une nouvelle facture'
  }
]