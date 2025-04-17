"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Menu, Phone, MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ReservationPanel } from "@/components/reservation-panel"
import { CustomCursor } from "@/components/custom-cursor"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])

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

      <div ref={containerRef} className="relative">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full mix-blend-difference">
          <div className="container flex h-24 items-center justify-between px-6">
            <button
              className="font-serif text-2xl font-light tracking-tighter text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              FA-RAYS
            </button>

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
                <Menu className="h-5 w-5" />
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
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 md:gap-4">
            {["About", "Menu", "Gallery", "Contact"].map((item, i) => (
              <motion.div
                key={item}
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
                <button
                  className="block font-serif text-4xl font-light text-white md:text-7xl"
                  onClick={() => {
                    setMenuOpen(false)
                    const element = document.getElementById(item.toLowerCase())
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  {item}
                </button>
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
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>

          <motion.div className="absolute inset-0 z-0" style={{ scale: heroImageScale }}>
            <img src="/hero-image.jpg" alt="Exquisite dish presentation" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div className="absolute inset-0 z-10 flex items-center justify-center" style={{ y: heroTextY }}>
            <div className="container px-6">
              <div className="mx-auto max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mb-6 overflow-hidden"
                >
                  <span className="block text-lg font-medium uppercase tracking-widest text-white/80 md:text-xl">
                    FAMILY - FOOD - FRIENDS
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="font-serif text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl"
                >
                  FA-RAYS <br className="hidden md:block" />
                  <span className="italic">Family Restaurant</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="mt-8 md:mt-12"
                >
                  <Button
                    className="group rounded-full border-0 bg-white px-8 py-6 text-sm font-medium uppercase tracking-widest text-black transition-all hover:bg-white/90"
                    asChild
                  >
                    <a
                      href="https://www.toasttab.com/fa-rays-2-1115-wooster-road-north"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Order Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-widest text-white/70">Scroll to explore</span>
              <div className="h-12 w-[1px] bg-gradient-to-b from-white/0 to-white/50"></div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-24 md:py-32">
          <div className="absolute -top-24 left-0 h-48 w-48 rounded-full bg-[#F3EFE9] opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#F3EFE9] opacity-20 blur-3xl"></div>

          <div className="container px-6">
            <div className="grid gap-16 md:grid-cols-2 md:gap-24">
              <div className="relative">
                <div className="sticky top-32">
                  <span className="mb-3 block text-sm uppercase tracking-widest text-black/40">Our Philosophy</span>
                  <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                    Always expect <br />
                    <span className="italic">GREAT TASTE,</span> <br />
                    <span className="italic">GOOD TIMES</span>
                  </h2>

                  <div className="mt-8 h-[1px] w-24 bg-black/20"></div>

                  <div className="mt-8 space-y-6 text-black/70">
                    <p>
                      At Fa-Rays Family Restaurant we take pride in the quality of each and every meal. If it's not
                      perfect and made just the way you ordered it, we won't send it out.
                    </p>
                    <p>We guarantee the food delivered to your table is of the best quality you could have ordered.</p>
                  </div>

                  <div className="mt-12">
                    <Button
                      variant="outline"
                      className="rounded-full border-black/20 px-8 py-6 text-sm uppercase tracking-widest text-black hover:bg-black hover:text-white"
                      asChild
                    >
                      <Link href="/about">Our Story</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-24">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src="/chef-portrait.jpg" alt="Chef preparing a dish" className="h-full w-full object-cover" />
                </div>

                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/restaurant-interior.jpg"
                    alt="Restaurant interior"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="bg-[#121212] py-24 text-white md:py-32">
          <div className="container px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-3 block text-sm uppercase tracking-widest text-white/40">Seasonal Menu</span>
              <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                A <span className="italic">symphony</span> of flavors
              </h2>

              <div className="mx-auto mt-8 h-[1px] w-24 bg-white/20"></div>

              <p className="mx-auto mt-8 max-w-xl text-white/70">
                Our menu changes with the seasons, highlighting the freshest ingredients at their peak. Each dish tells
                a story of tradition, innovation, and respect for ingredients.
              </p>
            </div>

            <div className="mt-16 md:mt-24">
              {/* Featured Menu Items */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "THE ORIGINAL FA-RAY SCRAMBLE",
                    description:
                      "2 scrambled eggs, diced ham served over hashbrowns topped with cheddar cheese sauce. Includes choice of toast.",
                    price: "$10.29",
                    image: "/featured-scramble.jpg",
                    category: "Breakfast",
                  },
                  {
                    name: "BACON CHEDDAR BURGER",
                    description: "Double patty burger with crispy bacon and melted cheddar cheese. Served with fries.",
                    price: "$12.29",
                    image: "/featured-burger.jpg",
                    category: "Burgers",
                  },
                  {
                    name: "CHICKEN & WAFFLE",
                    description:
                      "Freshly made Belgian waffle with our hand breaded chicken tenders topped with a spicy honey maple syrup.",
                    price: "$12.99",
                    image: "/featured-chicken-waffle.jpg",
                    category: "Specialties",
                  },
                  {
                    name: "BROASTED CHICKEN DINNER",
                    description: "Our famous broasted chicken served with choice of potato and side dish.",
                    price: "$12.99",
                    image: "/featured-broasted-chicken.jpg",
                    category: "Dinners",
                  },
                  {
                    name: "GRILLED REUBEN",
                    description:
                      "The best around! Corned beef, sauerkraut, Swiss cheese and Thousand Island dressing on grilled rye bread.",
                    price: "$13.49",
                    image: "/featured-reuben.jpg",
                    category: "Sandwiches",
                  },
                  {
                    name: "STUFFED BERRY FRENCH TOAST",
                    description:
                      "French toast stuffed with a cream cheese filling then topped with seasonal fresh fruit and powdered sugar.",
                    price: "$10.99",
                    image: "/featured-french-toast.jpg",
                    category: "Breakfast",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group cursor-pointer overflow-hidden rounded-xl"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/50">
                        {item.category}
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl font-light">{item.name}</h3>
                        <span className="text-white/80">{item.price}</span>
                      </div>
                      <p className="mt-2 text-sm text-white/60">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center md:mt-24">
              <Button
                asChild
                className="rounded-full border-0 bg-white px-8 py-6 text-sm uppercase tracking-widest text-black transition-all hover:bg-white/90"
              >
                <Link href="/menu">
                  Explore Full Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24 md:py-32">
          <div className="container px-6">
            <div className="mb-16 md:mb-24">
              <span className="mb-3 block text-sm uppercase tracking-widest text-black/40">Gallery</span>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                  Visual <span className="italic">feast</span>
                </h2>

                <Button
                  variant="outline"
                  className="rounded-full border-black/20 px-8 py-6 text-sm uppercase tracking-widest text-black hover:bg-black hover:text-white"
                >
                  View All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="group relative aspect-square overflow-hidden">
                <img
                  src="/gallery-1.jpg"
                  alt="Elegantly plated dish"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20"></div>
              </div>

              <div className="group relative aspect-square overflow-hidden md:col-span-2 md:row-span-2">
                <img
                  src="/gallery-2.jpg"
                  alt="Chef preparing food"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20"></div>
              </div>

              <div className="group relative aspect-square overflow-hidden">
                <img
                  src="/gallery-3.jpg"
                  alt="Cocktail preparation"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20"></div>
              </div>

              <div className="group relative aspect-square overflow-hidden lg:col-span-2">
                <img
                  src="/gallery-4.jpg"
                  alt="Restaurant ambiance"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-[#F3EFE9] py-24 md:py-32">
          <div className="container px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-3 block text-sm uppercase tracking-widest text-black/40">Testimonials</span>
              <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                <span className="italic">Voices</span> of our guests
              </h2>

              <div className="mx-auto mt-16 space-y-12 md:mt-24">
                <div>
                  <p className="font-serif text-2xl font-light italic leading-relaxed md:text-3xl">
                    "An extraordinary culinary journey that delights all the senses. The attention to detail in every
                    dish is remarkable."
                  </p>
                  <div className="mt-6">
                    <div className="font-medium">Emily Johnson</div>
                    <div className="text-sm text-black/60">Food Critic, Culinary Magazine</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="container px-6">
            <div className="grid gap-16 md:grid-cols-2 md:gap-24">
              <div>
                <span className="mb-3 block text-sm uppercase tracking-widest text-black/40">Contact</span>
                <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                  Get in <span className="italic">touch</span>
                </h2>

                <div className="mt-8 h-[1px] w-24 bg-black/20"></div>

                <div className="mt-12 space-y-8">
                  <div>
                    <div className="text-sm uppercase tracking-widest text-black/40">Location</div>
                    <div className="mt-2 flex items-start gap-2">
                      <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-black/40" />
                      <div>
                        <div className="text-lg">1115 Wooster Rd N</div>
                        <div className="text-lg">Barberton, Ohio 44203</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm uppercase tracking-widest text-black/40">Hours</div>
                    <div className="mt-2 text-lg">Tuesday - Sunday, 5:00 PM - 11:00 PM</div>
                  </div>

                  <div>
                    <div className="text-sm uppercase tracking-widest text-black/40">Contact</div>
                    <div className="mt-2 flex items-center gap-2 text-lg">
                      <Phone className="h-5 w-5 text-black/40" />
                      (330) 745-6091
                    </div>
                    <div className="mt-1 text-lg">faraysfamilyrestaurant@gmail.com</div>
                  </div>
                </div>

                <div className="mt-12">
                  <Button
                    onClick={() => setReservationOpen(true)}
                    className="rounded-full border-0 bg-black px-8 py-6 text-sm uppercase tracking-widest text-white transition-all hover:bg-black/90"
                  >
                    Reserve a Table
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="aspect-square overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.1583802555584!2d-81.6178873!3d40.9805556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8836d1f327e904c3%3A0x7f0532292d4f8a97!2s1115%20Wooster%20Rd%20N%2C%20Barberton%2C%20OH%2044203!5e0!3m2!1sen!2sus!4v1713395287611!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Fa-Rays Family Restaurant Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/10 py-12">
          <div className="container px-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="font-serif text-xl font-light tracking-tighter">FA-RAYS FAMILY RESTAURANT</div>

              <div className="flex gap-8">
                {[
                  { name: "Facebook", url: "https://www.facebook.com/FaRaysFamilyRestaurant" },
                  { name: "Instagram", url: "https://www.instagram.com/faraysrestaurant/" },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-widest text-black/60 transition-colors hover:text-black"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="text-sm text-black/60">© {new Date().getFullYear()} FA-RAYS. Powered by RDJ Media.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
