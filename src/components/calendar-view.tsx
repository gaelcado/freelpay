"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CalendarEvent } from "@/lib/dashboard-data"
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  FileText, 
  Users 
} from "lucide-react"
import { 
  HeadingMD, 
  HeadingSM, 
  BodySM, 
  BodyXS 
} from "@/components/ui/typography"

type CalendarViewProps = {
  events: CalendarEvent[]
  className?: string
  hideMonthControls?: boolean
}

export function CalendarView({ events, className, hideMonthControls = false }: CalendarViewProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  // Get events for the selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : []

  // Function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    )
  }

  // Custom day renderer to show event indicators
  const renderDay = (day: Date) => {
    const dayEvents = getEventsForDay(day)
    const hasEvents = dayEvents.length > 0
    
    // Get event types for the day to show different colors
    const eventTypes = [...new Set(dayEvents.map(event => event.type))]
    
    return (
      <div className="relative w-full h-full">
        <div>{day.getDate()}</div>
        {hasEvents && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
            {eventTypes.map((type, index) => {
              const dotColor = type === 'payment' 
                ? 'bg-emerald-500' 
                : type === 'meeting' 
                  ? 'bg-blue-500' 
                  : type === 'deadline' 
                    ? 'bg-amber-500' 
                    : 'bg-purple-500'
              
              return (
                <span 
                  key={`${type}-${index}`} 
                  className={cn("h-1.5 w-1.5 rounded-full", dotColor)}
                />
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Function to get icon based on event type
  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-4 w-4 text-emerald-500" />
      case 'meeting':
        return <Users className="h-4 w-4 text-blue-500" />
      case 'deadline':
        return <Clock className="h-4 w-4 text-amber-500" />
      case 'invoice':
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  // Function to get badge variant based on event type
  const getEventBadgeVariant = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'payment':
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      case 'meeting':
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      case 'deadline':
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      case 'invoice':
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
      default:
        return ""
    }
  }

  // Format date to display in French
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }
    return date.toLocaleDateString('fr-FR', options)
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="md:col-span-4">
          <div className="flex items-center justify-between mb-4">
            {!hideMonthControls && (
              <>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    const newDate = new Date(date)
                    newDate.setMonth(newDate.getMonth() - 1)
                    setDate(newDate)
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <HeadingSM className="text-foreground/90">
                  {date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </HeadingSM>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    const newDate = new Date(date)
                    newDate.setMonth(newDate.getMonth() + 1)
                    setDate(newDate)
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={date}
            onMonthChange={setDate}
            className="rounded-md border"
            modifiers={{
              selected: selectedDate ? [selectedDate] : [],
            }}
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
            }}
            components={{
              DayContent: (props) => {
                const day = props.date;
                return renderDay(day);
              }
            }}
          />
        </div>
        <div className="md:col-span-3 flex flex-col">
          {selectedDate && (
            <>
              <HeadingSM className="mb-2 text-foreground/90">
                {formatDate(selectedDate)}
              </HeadingSM>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3 mt-2">
                  {selectedDateEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="p-3 rounded-lg border border-border/50 bg-card/80 hover:bg-accent/10 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                          event.type === 'payment' ? "bg-emerald-500/10" : 
                          event.type === 'meeting' ? "bg-blue-500/10" : 
                          event.type === 'deadline' ? "bg-amber-500/10" : 
                          "bg-purple-500/10"
                        )}>
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <BodySM className="font-medium">{event.title}</BodySM>
                            <Badge 
                              variant="outline" 
                              className={cn("text-xs", getEventBadgeVariant(event.type))}
                            >
                              {event.type === 'payment' ? 'Paiement' : 
                               event.type === 'meeting' ? 'Réunion' : 
                               event.type === 'deadline' ? 'Échéance' : 
                               'Facture'}
                            </Badge>
                          </div>
                          {event.client && (
                            <BodyXS className="text-muted-foreground mt-1">
                              Client: {event.client}
                            </BodyXS>
                          )}
                          {event.amount && (
                            <BodyXS className="text-muted-foreground">
                              Montant: {event.amount} €
                            </BodyXS>
                          )}
                          {event.description && (
                            <BodyXS className="text-muted-foreground">
                              {event.description}
                            </BodyXS>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <BodySM className="text-muted-foreground">
                    Aucun événement prévu pour cette date
                  </BodySM>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
} 