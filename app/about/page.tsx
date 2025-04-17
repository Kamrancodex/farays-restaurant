"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, Phone, MapPin, Calendar, Users, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { CustomCursor } from "@/components/custom-cursor"
import { ReservationPanel } from "@/components/reservation-panel"

// Timeline data
const timelineEvents = [
  {
    year: "1949",
    title: "The Beginning",
    description:
      "Fa-Rays Family Restaurant opens its doors in Barberton, Ohio with curbside service and a simple menu focused on quality ingredients and homestyle cooking.",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    year: "1960s",
    title: "Growing Popularity",
    description:
      "As word spread about our delicious food and friendly service, we expanded our menu and dining area to accommodate our growing customer base.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    year: "1980s",
    title: "Second Generation",
    description:
      "The family tradition continues as the second generation takes the helm, preserving our classic recipes while introducing new favorites.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    year: "2000s",
    title: "Modern Evolution",
    description:
      "Renovations and menu updates bring Fa-Rays into the new millennium while preserving the beloved classics that made us famous.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    year: "Today",
    title: "Three Generations Later",
    description:
      "Now in our third generation of family ownership, we continue to serve homemade meals with the same dedication to quality and service that has defined us for over 70 years.",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
]

// Values data
const values = [
  {
    icon: <Award className="h-8 w-8" />,
    title: "Quality Ingredients",
    description:
      "We use only the freshest ingredients in all our homemade recipes, sourcing locally whenever possible.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Family Tradition",
    description:
      "Three generations of family dedication to serving our community with recipes passed down through the years.",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Exceptional Service",
    description: "Our friendly staff ensures every visit is memorable, treating you like part of our extended family.",
  },
]

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0)
  const isMobile = useMobile()

  // Refs for scroll-triggered animations
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  // In-view animations
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.3 })
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 })
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 })
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 })

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 0.1], [0, -50])
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.5])

  // Handle escape key for modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        setReservationOpen(false)
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <>
      {!isMobile && <CustomCursor />}

      <div ref={containerRef} className="relative bg-white">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full mix-blend-difference">
          <div className="container flex h-24 items-center justify-between px-6">
            <Link href="/" className="font-serif text-2xl font-light tracking-tighter text-white">
              FA-RAYS
            </Link>

            <div className="flex items-center gap-8">
              <button
                className="hidden text-sm uppercase tracking-widest text-white md:block"
                onClick={() => setReservationOpen(true)}
              >
                Reserve
              </button>

              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white"
                onClick={() => setMenuOpen(true)}
              >
                <span className="sr-only">Menu</span>
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
                  className="h-5 w-5"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Full-screen menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-[#121212] transition-transform duration-700 ease-in-out",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="container flex h-24 items-center justify-between px-6">
            <span className="font-serif text-2xl font-light tracking-tighter text-white">FA-RAYS</span>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white"
              onClick={() => setMenuOpen(false)}
            >
              <span className="sr-only">Close</span>
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
                className="h-5 w-5"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 md:gap-4">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Menu", path: "/menu" },
              { name: "Contact", path: "/#contact" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: menuOpen ? 1 : 0,
                  y: menuOpen ? 0 : 20,
                  transition: {
                    delay: menuOpen ? 0.3 + i * 0.1 : 0,
                    duration: 0.5,
                  },
                }}
                className="overflow-hidden py-2 md:py-3"
              >
                <Link
                  href={item.path}
                  className="block font-serif text-4xl font-light text-white md:text-7xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="container flex justify-between px-6 py-12">
            <div className="space-y-1 text-white/60">
              <p className="text-sm">1115 Wooster Rd N</p>
              <p className="text-sm">Barberton, Ohio 44203</p>
            </div>

            <div className="space-y-1 text-right text-white/60">
              <p className="text-sm">faraysfamilyrestaurant@gmail.com</p>
              <p className="text-sm">(330) 745-6091</p>
            </div>
          </div>
        </div>

        {/* Reservation panel */}
        <ReservationPanel open={reservationOpen} onClose={() => setReservationOpen(false)} />

        {/* Hero Section */}
        <section ref={heroRef} className="relative flex h-screen items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ scale: heroImageScale, opacity: heroImageOpacity }}>
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Fa-Rays Family Restaurant through the years"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div className="absolute inset-0 z-10 flex items-center justify-center" style={{ y: heroTextY }}>
            <div className="container px-6 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto max-w-4xl"
              >
                <div className="mb-6 flex items-center justify-center gap-4">
                  <div className="h-[1px] w-12 bg-white/50"></div>
                  <span className="text-sm font-medium uppercase tracking-[0.2em]">Our Story</span>
                  <div className="h-[1px] w-12 bg-white/50"></div>
                </div>

                <h1 className="font-serif text-6xl font-light leading-tight md:text-7xl lg:text-8xl">
                  <span className="block">70+ Years.</span>
                  <span className="block mt-2">3 Generations.</span>
                  <span className="block mt-2 italic">One Great Restaurant.</span>
                </h1>

                <div className="mx-auto mt-8 max-w-2xl">
                  <p className="text-xl font-light leading-relaxed text-white/90">
                    Since 1949, Fa-Rays Family Restaurant has provided the local public with delicious, homemade meals
                    made from scratch with fresh ingredients.
                  </p>
                </div>

                <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                  <Button
                    className="group rounded-full border-0 bg-white px-8 py-6 text-sm font-medium uppercase tracking-widest text-black transition-all hover:bg-white/90"
                    asChild
                  >
                    <Link href="/menu">
                      View Our Menu
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-full border-white px-8 py-6 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-white/10"
                    onClick={() => setReservationOpen(true)}
                  >
                    Make a Reservation
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-widest text-white/70">Scroll to explore our history</span>
              <div className="h-12 w-[1px] bg-gradient-to-b from-white/0 to-white/50"></div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section ref={storyRef} className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#F8F5F0] opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#F8F5F0] opacity-20 blur-3xl translate-y-1/3 -translate-x-1/4"></div>

          <div className="container px-6 relative z-10">
            <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <span className="mb-3 block text-sm uppercase tracking-[0.2em] text-black/40">Our Beginning</span>
                <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                  A Family Tradition <br />
                  <span className="italic">Since 1949</span>
                </h2>

                <div className="mt-8 h-[2px] w-24 bg-black/20"></div>

                <div className="mt-8 space-y-6 text-lg text-black/70">
                  <p>
                    Started in 1949 in Barberton, Ohio, Fa-Rays Family Restaurant offered curb side service in the
                    beginning and a place to meet friends and family. Over the years we have adapted to serve our
                    community better. Our newly remolded dine-in area is modern but keeping that home style that our
                    customers love.
                  </p>
                  <p>
                    Since 1949, Fa-Rays Family Restaurant has provided the local public with delicious, homemade meals.
                    Our recipes are all made from scratch, with fresh ingredients. We specialize in serving dishes the
                    whole family can enjoy, and our staff offers a family-friendly environment.
                  </p>
                </div>

                <div className="mt-12">
                  <Button
                    variant="outline"
                    className="rounded-full border-black/20 px-8 py-6 text-sm uppercase tracking-widest text-black hover:bg-black hover:text-white"
                    asChild
                  >
                    <Link href="/menu">
                      Explore Our Menu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="order-1 md:order-2"
              >
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-64 h-64 rounded-full border border-black/10"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-black/10"></div>

                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1572715376701-98568319fd0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                      alt="Fa-Rays in the early days"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-12 -left-12 p-6 bg-white rounded-xl shadow-xl max-w-[240px]">
                    <div className="text-4xl font-serif font-light">70+</div>
                    <div className="mt-1 text-sm uppercase tracking-wider text-black/60">Years of Service</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="relative bg-[#121212] py-24 md:py-32 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>

          <div className="container px-6 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-3 inline-block text-sm uppercase tracking-[0.2em] text-white/40">Our Journey</span>
                <h2 className="font-serif text-4xl font-light md:text-5xl lg:text-6xl">
                  Seven <span className="italic">Decades</span> of History
                </h2>
                <div className="mx-auto mt-8 h-[1px] w-32 bg-white/20"></div>
              </motion.div>
            </div>

            <div className="mt-16 md:mt-24">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Timeline navigation */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="md:w-1/4"
                >
                  <div className="sticky top-32">
                    <div className="space-y-6">
                      {timelineEvents.map((event, index) => (
                        <button
                          key={index}
                          className={cn(
                            "flex items-center gap-4 text-left transition-all",
                            activeTimelineIndex === index ? "text-white" : "text-white/40 hover:text-white/70",
                          )}
                          onClick={() => setActiveTimelineIndex(index)}
                        >
                          <div
                            className={cn(
                              "h-12 w-12 flex items-center justify-center rounded-full border transition-all",
                              activeTimelineIndex === index ? "border-white bg-white/10" : "border-white/30",
                            )}
                          >
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-2xl font-light">{event.year}</div>
                            <div
                              className={cn(
                                "text-sm transition-all",
                                activeTimelineIndex === index ? "text-white/80" : "text-white/40",
                              )}
                            >
                              {event.title}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Timeline content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="md:w-3/4"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTimelineIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
                    >
                      <div className="grid md:grid-cols-2">
                        <div className="aspect-square md:aspect-auto">
                          <img
                            src={
                              timelineEvents[activeTimelineIndex].image ||
                              "/placeholder.svg?height=600&width=600&query=vintage restaurant photo from " +
                                timelineEvents[activeTimelineIndex].year ||
                              "/placeholder.svg"
                            }
                            alt={`Fa-Rays in ${timelineEvents[activeTimelineIndex].year}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <div className="text-sm uppercase tracking-wider text-white/60">
                            {timelineEvents[activeTimelineIndex].year}
                          </div>
                          <h3 className="mt-2 font-serif text-3xl font-light">
                            {timelineEvents[activeTimelineIndex].title}
                          </h3>
                          <div className="mt-4 h-[1px] w-16 bg-white/20"></div>
                          <p className="mt-6 text-white/80 leading-relaxed">
                            {timelineEvents[activeTimelineIndex].description}
                          </p>

                          <div className="mt-8 flex justify-between items-center">
                            <button
                              className="text-sm uppercase tracking-wider text-white/60 flex items-center gap-2 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
                              onClick={() => setActiveTimelineIndex((prev) => Math.max(0, prev - 1))}
                              disabled={activeTimelineIndex === 0}
                            >
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
                                className="h-4 w-4"
                              >
                                <path d="m15 18-6-6 6-6" />
                              </svg>
                              Previous
                            </button>

                            <div className="text-sm">
                              {activeTimelineIndex + 1} / {timelineEvents.length}
                            </div>

                            <button
                              className="text-sm uppercase tracking-wider text-white/60 flex items-center gap-2 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
                              onClick={() =>
                                setActiveTimelineIndex((prev) => Math.min(timelineEvents.length - 1, prev + 1))
                              }
                              disabled={activeTimelineIndex === timelineEvents.length - 1}
                            >
                              Next
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
                                className="h-4 w-4"
                              >
                                <path d="m9 18 6-6-6-6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center opacity-10"></div>

          <div className="container px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span className="mb-3 block text-sm uppercase tracking-[0.2em] text-black/40">Our Promise</span>
                <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                  We're Here to <span className="italic">Serve You</span>
                </h2>

                <div className="mx-auto mt-8 h-[1px] w-24 bg-black/20"></div>

                <p className="mx-auto mt-8 text-xl font-light leading-relaxed text-black/70">
                  Our menu features a variety of meals to choose from for breakfast, lunch, dinner, and desserts! Our
                  superior service and smiling faces will have you coming back time and again.
                </p>
              </motion.div>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mt-16">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  className="group bg-white rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500 border border-black/5"
                >
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-black/5 text-black/70 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-medium">{value.title}</h3>
                  <div className="mt-4 h-[1px] w-12 bg-black/10 group-hover:w-16 group-hover:bg-black/20 transition-all duration-500"></div>
                  <p className="mt-4 text-black/70">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Section */}
        <section ref={teamRef} className="relative bg-[#F8F5F0] py-24 md:py-32 overflow-hidden">
          <div className="container px-6 relative z-10">
            <div className="grid gap-16 md:grid-cols-2 md:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full border border-black/10"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-black/10"></div>

                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="The Fa-Rays family"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isTeamInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex h-full flex-col justify-center">
                  <span className="mb-3 block text-sm uppercase tracking-[0.2em] text-black/40">Our Family</span>
                  <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl">
                    A Family <span className="italic">Gathering</span>
                  </h2>

                  <div className="mt-8 h-[2px] w-24 bg-black/20"></div>

                  <div className="mt-8 space-y-6 text-lg text-black/70">
                    <p>
                      Since 1949, Fa-Rays Family Restaurant has provided the local public with delicious, homemade
                      meals. Our recipes are all made from scratch, with fresh ingredients. We specialize in serving
                      dishes the whole family can enjoy, and our staff offers a family-friendly environment.
                    </p>
                    <p>Come out to Fa-Rays Family Restaurant and enjoy a delectable meal!</p>
                  </div>

                  <div className="mt-12">
                    <Button
                      className="rounded-full border-0 bg-black px-8 py-6 text-sm uppercase tracking-widest text-white transition-all hover:bg-black/90"
                      asChild
                    >
                      <Link href="/">
                        Visit Us Today
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center opacity-5"></div>

          <div className="container px-6 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl">
                Join Our <span className="italic">Family</span>
              </h2>
              <p className="mx-auto mt-6 text-xl text-black/70">
                We invite you to become part of our 70+ year tradition
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-black/20 px-8 py-6 text-sm uppercase tracking-widest text-black hover:bg-black hover:text-white sm:w-auto"
                  asChild
                >
                  <Link href="/menu">View Our Menu</Link>
                </Button>
                <Button
                  className="w-full rounded-full border-0 bg-black px-8 py-6 text-sm uppercase tracking-widest text-white transition-all hover:bg-black/90 sm:w-auto"
                  asChild
                >
                  <a
                    href="https://www.toasttab.com/fa-rays-2-1115-wooster-road-north"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order Online
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="border-t border-black/10 py-12">
          <div className="container px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-black/40" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="mt-1 text-black/70">1115 Wooster Rd N</div>
                  <div className="text-black/70">Barberton, Ohio 44203</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-black/40" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="mt-1 text-black/70">(330) 745-6091</div>
                  <div className="mt-1 text-black/70">faraysfamilyrestaurant@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="font-medium">Follow Us</div>
                <div className="mt-1 flex gap-4">
                  <a
                    href="https://www.facebook.com/FaRaysFamilyRestaurant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/70 hover:text-black"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/faraysrestaurant/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/70 hover:text-black"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <section className="border-t border-black/10 py-8">
          <div className="container px-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-black/60 transition-colors hover:text-black"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/10 py-8 text-center text-sm text-black/60">
          <div className="container px-6">
            <p>© {new Date().getFullYear()} FA-RAYS FAMILY RESTAURANT. Powered by RDJ Media.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
