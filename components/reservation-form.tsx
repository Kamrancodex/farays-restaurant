"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function ReservationForm() {
  const [date, setDate] = useState<Date>()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle the form submission here
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold">Reservation Received!</h3>
        <p className="mb-6 text-muted-foreground">
          Thank you for your reservation request. We'll confirm your booking shortly via email or phone.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Make Another Reservation
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Select required>
              <SelectTrigger id="guests">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Person</SelectItem>
                <SelectItem value="2">2 People</SelectItem>
                <SelectItem value="3">3 People</SelectItem>
                <SelectItem value="4">4 People</SelectItem>
                <SelectItem value="5">5 People</SelectItem>
                <SelectItem value="6">6 People</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable dates in the past and Mondays (restaurant closed)
                    const day = date.getDay()
                    const isMonday = day === 1
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
                    return isPast || isMonday
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select required>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Select a time</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="17:00">5:00 PM</SelectItem>
                <SelectItem value="17:30">5:30 PM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
                <SelectItem value="18:30">6:30 PM</SelectItem>
                <SelectItem value="19:00">7:00 PM</SelectItem>
                <SelectItem value="19:30">7:30 PM</SelectItem>
                <SelectItem value="20:00">8:00 PM</SelectItem>
                <SelectItem value="20:30">8:30 PM</SelectItem>
                <SelectItem value="21:00">9:00 PM</SelectItem>
                <SelectItem value="21:30">9:30 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="special-requests">Special Requests (Optional)</Label>
          <textarea
            id="special-requests"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Dietary restrictions, allergies, special occasions, etc."
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Reserve Now
      </Button>
    </form>
  )
}
