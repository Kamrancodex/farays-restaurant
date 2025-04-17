"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface ReservationPanelProps {
  open: boolean
  onClose: () => void
}

export function ReservationPanel({ open, onClose }: ReservationPanelProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [guests, setGuests] = useState<string>("")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const resetForm = () => {
    setDate(undefined)
    setTime("")
    setGuests("")
    setFormData({
      name: "",
      email: "",
      phone: "",
    })
    setStep(1)
  }

  const handleClose = () => {
    onClose()
    setTimeout(resetForm, 500)
  }

  const times = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8"]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative h-[90vh] w-full max-w-2xl overflow-hidden bg-white p-6 md:p-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/60 transition-colors hover:bg-black/5"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex h-full flex-col">
              <div className="mb-8">
                <span className="mb-2 block text-sm uppercase tracking-widest text-black/40">Reservations</span>
                <h2 className="font-serif text-3xl font-light md:text-4xl">
                  Secure your <span className="italic">table</span>
                </h2>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
                >
                  <div className="absolute left-0 top-0 h-full w-full">
                    <div className="h-full px-0">
                      <div className="mb-6">
                        <div className="text-lg font-medium">Select a date</div>
                        <div className="text-sm text-black/60">Choose your preferred dining date</div>
                      </div>

                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="mx-auto rounded-md border border-black/10 p-3"
                        disabled={(date) => {
                          // Disable dates in the past and Mondays (restaurant closed)
                          const day = date.getDay()
                          const isMonday = day === 1
                          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
                          return isPast || isMonday
                        }}
                      />

                      <div className="mt-auto pt-8">
                        <Button
                          onClick={nextStep}
                          disabled={!date}
                          className="w-full rounded-full border-0 bg-black py-6 text-sm uppercase tracking-widest text-white transition-all hover:bg-black/90 disabled:bg-black/20"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-full top-0 h-full w-full">
                    <div className="h-full px-0">
                      <div className="mb-6">
                        <div className="text-lg font-medium">Select time & party size</div>
                        <div className="text-sm text-black/60">Choose your preferred time and number of guests</div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-sm uppercase tracking-widest text-black/40">Time</Label>
                          <div className="grid grid-cols-5 gap-2">
                            {times.map((t) => (
                              <button
                                key={t}
                                className={cn(
                                  "rounded-md border border-black/10 px-2 py-3 text-sm transition-colors hover:border-black",
                                  time === t ? "border-black bg-black text-white" : "",
                                )}
                                onClick={() => setTime(t)}
                              >
                                {format(new Date(`2000-01-01T${t}`), "h:mm a")}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm uppercase tracking-widest text-black/40">Party Size</Label>
                          <div className="grid grid-cols-4 gap-2">
                            {guestOptions.map((g) => (
                              <button
                                key={g}
                                className={cn(
                                  "rounded-md border border-black/10 px-2 py-3 text-sm transition-colors hover:border-black",
                                  guests === g ? "border-black bg-black text-white" : "",
                                )}
                                onClick={() => setGuests(g)}
                              >
                                {g} {Number.parseInt(g) === 1 ? "Guest" : "Guests"}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-8 flex gap-3">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1 rounded-full border-black/10 py-6 text-sm uppercase tracking-widest text-black transition-all hover:bg-black/5"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={nextStep}
                          disabled={!time || !guests}
                          className="flex-1 rounded-full border-0 bg-black py-6 text-sm uppercase tracking-widest text-white transition-all hover:bg-black/90 disabled:bg-black/20"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[200%] top-0 h-full w-full">
                    <div className="h-full px-0">
                      <div className="mb-6">
                        <div className="text-lg font-medium">Your information</div>
                        <div className="text-sm text-black/60">Please provide your contact details</div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-sm uppercase tracking-widest text-black/40">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="rounded-md border-black/10 py-6 focus-visible:ring-black"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-sm uppercase tracking-widest text-black/40">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-md border-black/10 py-6 focus-visible:ring-black"
                            placeholder="john@example.com"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="phone" className="text-sm uppercase tracking-widest text-black/40">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="rounded-md border-black/10 py-6 focus-visible:ring-black"
                            placeholder="(555) 123-4567"
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-auto pt-8 flex gap-3">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1 rounded-full border-black/10 py-6 text-sm uppercase tracking-widest text-black transition-all hover:bg-black/5"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={nextStep}
                          disabled={!formData.name || !formData.email || !formData.phone}
                          className="flex-1 rounded-full border-0 bg-black py-6 text-sm uppercase tracking-widest text-white transition-all hover:bg-black/90 disabled:bg-black/20"
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[300%] top-0 h-full w-full">
                    <div className="flex h-full flex-col items-center justify-center px-0 text-center">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-black">
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
                          className="h-10 w-10 text-white"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>

                      <h3 className="font-serif text-2xl font-light md:text-3xl">
                        Reservation <span className="italic">Confirmed</span>
                      </h3>

                      <div className="mt-6 space-y-2 text-black/60">
                        <p>Thank you for your reservation, {formData.name}.</p>
                        <p>
                          {date && format(date, "MMMM d, yyyy")} at{" "}
                          {time && format(new Date(`2000-01-01T${time}`), "h:mm a")}
                        </p>
                        <p>Party of {guests}</p>
                      </div>

                      <div className="mt-12">
                        <Button
                          onClick={handleClose}
                          className="rounded-full border-0 bg-black px-8 py-6 text-sm uppercase tracking-widest text-white transition-all hover:bg-black/90"
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <div className="flex justify-between text-sm text-black/40">
                  <div>Step {step} of 4</div>
                  <div>{date ? format(date, "MMMM d, yyyy") : "Select a date"}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
