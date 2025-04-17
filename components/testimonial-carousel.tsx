"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "An extraordinary culinary journey that delights all the senses. The attention to detail in every dish is remarkable.",
    author: "Emily Johnson",
    title: "Food Critic, Culinary Magazine",
  },
  {
    quote:
      "The perfect balance of innovation and tradition. Each visit reveals new flavors while honoring classic techniques.",
    author: "Michael Chen",
    title: "Executive Chef",
  },
  {
    quote:
      "Our anniversary dinner was unforgettable. The staff went above and beyond to create a magical evening for us.",
    author: "Sarah & David Rodriguez",
    title: "Loyal Guests",
  },
  {
    quote:
      "The wine pairing experience was exceptional. The sommelier's knowledge elevated our dining experience to new heights.",
    author: "James Wilson",
    title: "Wine Enthusiast",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-8">
      <div
        className="absolute inset-0 flex items-center justify-between px-4"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          onClick={prev}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="min-w-full shrink-0 border-0 bg-transparent text-white shadow-none">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Quote className="mb-6 h-12 w-12 text-white/40" />
                <blockquote className="mb-6 text-xl font-medium leading-relaxed md:text-2xl">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="mt-2">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-white/70">{testimonial.title}</div>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === current ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
