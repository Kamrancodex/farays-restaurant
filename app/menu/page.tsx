"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Download, MenuIcon, X, Phone, MapPin, Facebook, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { CustomCursor } from "@/components/custom-cursor"
import { ReservationPanel } from "@/components/reservation-panel"

// Menu categories
const categories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "omelets", label: "Omelets" },
  { id: "waffles", label: "Waffles & Pancakes" },
  { id: "lunch", label: "Lunch" },
  { id: "burgers", label: "Burgers" },
  { id: "sandwiches", label: "Sandwiches" },
  { id: "dinners", label: "Dinners" },
  { id: "specials", label: "Daily Specials" },
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const [menuOpen, setMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const isMobile = useMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // Parallax effect for header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  // Update the scrollToSection function to account for the fixed header height
  const scrollToSection = (id: string) => {
    setActiveCategory(id)
    const element = sectionRefs.current[id]
    if (element) {
      const headerHeight = 104 // Height of our fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Update the scroll spy function to account for the fixed header height
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 104 // Height of our fixed header
      const scrollPosition = window.scrollY + headerHeight + 50 // Add some offset for better detection

      // Find the current section
      let currentSection = categories[0].id
      for (const id of Object.keys(sectionRefs.current)) {
        const section = sectionRefs.current[id]
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = id
        }
      }

      if (currentSection !== activeCategory) {
        setActiveCategory(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeCategory])

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
        {/* Main Navigation - Fixed at top */}
        <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
          <div className="container mx-auto px-4">
            {/* Top bar with logo and actions */}
            <div className="flex h-16 items-center justify-between border-b">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-serif text-xl font-medium">FA-RAYS</span>
              </Link>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden rounded-full md:flex"
                  onClick={() => setReservationOpen(true)}
                >
                  Reserve
                </Button>

                <Button variant="outline" size="sm" className="rounded-full" asChild>
                  <a href="/fa-rays-menu.pdf" download>
                    <Download className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Download PDF</span>
                  </a>
                </Button>

                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMenuOpen(true)}>
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Category tabs */}
            <div className="no-scrollbar flex w-full overflow-x-auto py-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors",
                    activeCategory === category.id ? "text-black" : "text-black/40 hover:text-black/70",
                  )}
                  onClick={() => scrollToSection(category.id)}
                >
                  {category.label}
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-black"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Spacer to prevent content from being hidden under fixed header */}
        <div className="h-[104px]"></div>

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

        {/* Header */}
        <motion.header
          style={{ opacity: headerOpacity, y: headerY }}
          className="relative flex h-[50vh] items-center justify-center overflow-hidden bg-black text-white"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/menu-header.jpg"
              alt="Food presentation"
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000 ease-out"
            />
          </div>
          <div className="container relative z-10 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="font-serif text-6xl font-light md:text-7xl">
                Our <span className="italic">Menu</span>
              </h1>
              <div className="mx-auto mt-4 h-[1px] w-32 bg-white/30"></div>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                Quality ingredients, prepared with care, served with pride
              </p>
            </motion.div>
          </div>
        </motion.header>

        {/* Menu Content */}
        <div className="bg-[#f8f7f5] py-12">
          <div className="container mx-auto px-6">
            {/* Breakfast Section */}
            <section
              id="breakfast"
              ref={(el) => (sectionRefs.current["breakfast"] = el)}
              className="mb-20 scroll-mt-[104px]"
            >
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">BREAKFAST</h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">THE ORIGINAL FA-RAY SCRAMBLE*</h3>
                      <div className="font-medium text-[#333]">10.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      2 scrambled eggs, diced ham served over hashbrowns topped with cheddar cheese sauce. Includes
                      choice of toast.
                    </p>
                    <p className="mt-1 text-xs italic text-[#666]">Add diced tomato, onions or peppers for .45 each.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">STEAK & EGGS "BEST IN TOWN"*</h3>
                      <div className="font-medium text-[#333]">14.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      2 eggs, hashbrowns and 6 oz. sirloin steak. Served with toast and jelly.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">SKILLET SCRAMBLE*</h3>
                      <div className="font-medium text-[#333]">10.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Hashbrowns scrambled eggs, sausage, sausage gravy and biscuit.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">COUNTRY FRIED STEAK BREAKFAST*</h3>
                      <div className="font-medium text-[#333]">13.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      2 eggs, hashbrowns and country fried steak covered with sausage gravy. Served with toast.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">HAMBURGER STEAK BREAKFAST*</h3>
                      <div className="font-medium text-[#333]">11.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">1/2 lb. burger patty, 2 eggs, hashbrowns and toast.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">HUNGRY MAN BREAKFAST*</h3>
                      <div className="font-medium text-[#333]">12.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      2 eggs, 2 pancakes or French toast, 2 pieces of bacon and 2 pieces of sausage links.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BREAKFAST PANINI*</h3>
                      <div className="font-medium text-[#333]">10.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Breakfast sandwich with egg, tomato and choice of meat, with cheese on Italian bread. Served with
                      a side of hashbrowns.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">OATMEAL</h3>
                      <div className="font-medium text-[#333]">5.59</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">A bowl of oatmeal served with brown sugar.</p>
                    <p className="mt-1 text-xs italic text-[#666]">
                      Add Bananas for .75, Raisins for .50, Walnuts for 1.00.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">THE STACKER - GUEST FAVORITE!</h3>
                      <div className="font-medium text-[#333]">14.59</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Potato pancakes with country fried steak, scrambled eggs, shredded cheese then topped with sausage
                      gravy.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BREAKFAST SPECIAL</h3>
                      <div className="font-medium text-[#333]">8.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      MONDAY - FRIDAY 8AM - 11AM | 2 Eggs, hashbrowns, meat and toast.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Omelets Section */}
            <section
              id="omelets"
              ref={(el) => (sectionRefs.current["omelets"] = el)}
              className="mb-20 scroll-mt-[104px]"
            >
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">OMELETS</h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">CHEESE OMELET*</h3>
                      <div className="font-medium text-[#333]">10.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Your choice of American, Swiss, cheddar, pepper jack or mozzarella.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">VEGETARIAN OMELET*</h3>
                      <div className="font-medium text-[#333]">12.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Tomato, onion, mushrooms, green peppers and broccoli.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">3 MEAT OMELET*</h3>
                      <div className="font-medium text-[#333]">14.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Bacon, sausage, ham and choice of cheese.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">WESTERN OMELET*</h3>
                      <div className="font-medium text-[#333]">13.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Green peppers, onions, diced ham and cheese.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">THE WORKS*</h3>
                      <div className="font-medium text-[#333]">14.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Diced ham, bacon, tomatoes, onions, green peppers, mushrooms and American cheese.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BUILD YOUR OWN</h3>
                      <div className="font-medium text-[#333]">13.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Choice of 3 items. Additional items .99 each. Diced Ham • Bacon • Sausage • Onions • Green Peppers
                      • Tomatoes • Mushrooms • Banana Peppers • American Cheese • Swiss Cheese • Mozzarella Cheese •
                      Pepper Jack Cheese
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Waffles & Pancakes Section */}
            <section
              id="waffles"
              ref={(el) => (sectionRefs.current["waffles"] = el)}
              className="mb-20 scroll-mt-[104px]"
            >
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">
                  WAFFLES & PANCAKES
                </h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 font-serif text-2xl font-medium text-[#333]">Belgian Waffles</h3>
                  <div className="space-y-6">
                    <div className="border-b border-[#8aad4b]/20 pb-4">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-medium uppercase">BELGIAN WAFFLE</h3>
                      </div>
                      <p className="mt-1 text-sm text-[#555]">
                        Plain 7.99 / Pecan 9.99 / Banana Nut 8.99 / Apple Cinnamon 8.99
                      </p>
                    </div>

                    <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-medium uppercase">CHICKEN & WAFFLE</h3>
                        <div className="font-medium text-[#333]">12.99</div>
                      </div>
                      <p className="mt-1 text-sm text-[#555]">
                        Freshly made Belgian waffle with our hand breaded chicken tenders topped with a spicy honey
                        maple syrup.
                      </p>
                    </div>

                    <div className="border-b border-[#8aad4b]/20 pb-4">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-medium uppercase">VERY BERRY WAFFLES</h3>
                        <div className="font-medium text-[#333]">11.99</div>
                      </div>
                      <p className="mt-1 text-sm text-[#555]">
                        Topped with mixed berry compote, whipped cream and powdered sugar.
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-[#8aad4b] px-2 py-0.5 text-xs font-medium uppercase text-white">
                        New
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-serif text-2xl font-medium text-[#333]">Pancakes & French Toast</h3>
                  <div className="space-y-6">
                    <div className="border-b border-[#8aad4b]/20 pb-4">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-medium uppercase">HOME STYLE PANCAKES</h3>
                      </div>
                      <p className="mt-1 text-sm text-[#555]">
                        2 HOME STYLE PANCAKES 5.99 / 3 HOME STYLE PANCAKES 7.99 / Add apple, strawberry or blueberry
                        topping for 1.99.
                      </p>
                    </div>

                    <div className="border-b border-[#8aad4b]/20 pb-4">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-medium uppercase">STUFFED BERRY FRENCH TOAST</h3>
                        <div className="font-medium text-[#333]">10.99</div>
                      </div>
                      <p className="mt-1 text-sm text-[#555]">
                        French toast stuffed with a cream cheese filling then topped with seasonal fresh fruit and
                        powdered sugar.
                      </p>
                    </div>

                    <div className="border-b border-[#8aad4b]/20 pb-4">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-medium uppercase">CINNAMON APPLE BACON PANCAKES</h3>
                        <div className="font-medium text-[#333]">8.99</div>
                      </div>
                      <p className="mt-1 text-sm text-[#555]">
                        Crumbled bacon, whipped butter, cream cheese and maple syrup.
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-[#8aad4b] px-2 py-0.5 text-xs font-medium uppercase text-white">
                        New
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Lunch Section */}
            <section id="lunch" ref={(el) => (sectionRefs.current["lunch"] = el)} className="mb-20 scroll-mt-[104px]">
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">
                  APPETIZERS & SALADS
                </h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">YOU PICK 4!</h3>
                      <div className="font-medium text-[#333]">15.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      It's a sampler platter, but YOU choose what we put on it. Pick 4: Mozzarella Sticks, Chicken
                      Wings, Chicken Tenders, Pretzel Bites, Breaded Mushrooms, Breaded Pickles and/or Hand Breaded
                      Onion Rings.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">LOADED CHEESY FRIES OR TATER TOTS</h3>
                      <div className="font-medium text-[#333]">9.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Choice of fries or tots topped with cheese and bacon bits. Not for the faint of heart!
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">PRETZEL BITES</h3>
                      <div className="font-medium text-[#333]">7.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Served with cheese sauce.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">COBB SALAD</h3>
                      <div className="font-medium text-[#333]">13.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Crisp lettuce topped with diced chicken, bleu cheese crumbles, bacon, hard boiled egg and
                      tomatoes.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BUFFALO CHICKEN SALAD</h3>
                      <div className="font-medium text-[#333]">12.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Crispy chicken tossed in Buffalo sauce with lettuce, tomatoes, cucumbers, celery, cheddar jack
                      cheese and red onions.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">CHEESY FRIED SPAGHETTI</h3>
                      <div className="font-medium text-[#333]">8.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Like you have never had it before! Our own spaghetti and sauce cooked up with loads of mozzarella
                      cheese, breaded and served crispy with extra sauce on top.
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-[#8aad4b] px-2 py-0.5 text-xs font-medium uppercase text-white">
                      New
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Burgers Section */}
            <section
              id="burgers"
              ref={(el) => (sectionRefs.current["burgers"] = el)}
              className="mb-20 scroll-mt-[104px]"
            >
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">BURGERS</h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <p className="mb-6 text-center text-[#555]">All burgers are double patties and served with fries</p>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">HAMBURGER*</h3>
                      <div className="font-medium text-[#333]">10.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">For those who just like it plain.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">CHEESEBURGER*</h3>
                      <div className="font-medium text-[#333]">11.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Choose from American, cheddar, Swiss, mozzarella or pepper jack cheese.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BACON CHEDDAR BURGER*</h3>
                      <div className="font-medium text-[#333]">12.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Crispy bacon and cheddar cheese.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">THE BACON BLEU*</h3>
                      <div className="font-medium text-[#333]">12.29</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Crumbled bleu cheese and 2 strips of bacon.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BREAKFAST BURGER</h3>
                      <div className="font-medium text-[#333]">12.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Bacon, fried egg and American cheese.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">THE BIG B*</h3>
                      <div className="font-medium text-[#333]">14.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">4 patties and 4 slices of cheese. WOW!</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sandwiches Section */}
            <section
              id="sandwiches"
              ref={(el) => (sectionRefs.current["sandwiches"] = el)}
              className="mb-20 scroll-mt-[104px]"
            >
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">SANDWICHES</h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <p className="mb-6 text-center text-[#555]">All sandwiches served with fries</p>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">GRILLED REUBEN</h3>
                      <div className="font-medium text-[#333]">13.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      The best around! Corned beef, sauerkraut, Swiss cheese and Thousand Island dressing on grilled rye
                      bread.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BARBERTON FRIED CHICKEN SANDWICH</h3>
                      <div className="font-medium text-[#333]">13.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Hand breaded Barberton chicken breast topped with Fa-Ray's Secret Sauce, pepper jack cheese,
                      lettuce, tomato, onion and pickles, piled high on a toasted bun.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BACON RANCH CHICKEN WRAP</h3>
                      <div className="font-medium text-[#333]">12.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Grilled chicken, sharp cheddar, ranch, crumbled bacon, lettuce and tomato in a whole wheat wrap.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BACON TURKEY CLUB</h3>
                      <div className="font-medium text-[#333]">12.49</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Our #1 selling sandwich!</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Dinners Section */}
            <section
              id="dinners"
              ref={(el) => (sectionRefs.current["dinners"] = el)}
              className="mb-20 scroll-mt-[104px]"
            >
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">DINNERS</h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <p className="mb-6 text-center text-[#555]">Served with potato and your choice of side</p>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">BROASTED CHICKEN</h3>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      4 Piece Meal 12.99 • 4 Piece All White Meat 13.99 • 4 Piece All Dark Meat 12.79
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">SHRIMP BASKET</h3>
                      <div className="font-medium text-[#333]">13.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Served with fries and fresh coleslaw.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">HOMEMADE MEATLOAF</h3>
                      <div className="font-medium text-[#333]">12.59</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Made fresh daily in our kitchen.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">CHICKEN STIR FRY</h3>
                      <div className="font-medium text-[#333]">13.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      Our #1 selling dinner. Served over rice. Are we in China?
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">GRILLED CHICKEN TENDERLOIN DINNER</h3>
                      <div className="font-medium text-[#333]">12.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Grilled chicken tenderloins with 2 sides.</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">6 OZ. SIRLOIN STEAK*</h3>
                      <div className="font-medium text-[#333]">15.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">Charbroiled just the way you like it.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Daily Specials Section */}
            <section
              id="specials"
              ref={(el) => (sectionRefs.current["specials"] = el)}
              className="mb-20 scroll-mt-[104px]"
            >
              <div className="mb-8 flex items-center">
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
                <h2 className="mx-4 font-serif text-4xl font-bold uppercase tracking-wide text-[#333]">
                  DAILY SPECIALS
                </h2>
                <div className="h-[2px] flex-grow bg-[#8aad4b]/30"></div>
              </div>

              <div className="mx-auto max-w-3xl">
                <div className="space-y-6">
                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">SUNDAY</h3>
                      <div className="font-medium text-[#333]">11.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      4 PIECE BROASTED CHICKEN DINNER - Served with potato and side dish.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">MONDAY</h3>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">FOOT LONG CONEY DOGS 4.99 / 6" CONEY DOGS 3.99</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">TUESDAY</h3>
                      <div className="font-medium text-[#333]">10.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      SPAGHETTI WITH MEAT SAUCE OR MEATBALLS - Served with salad or cup of soup and garlic bread.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">WEDNESDAY</h3>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">CHEESEBURGER & FRIES BASKET 7.99 (Dine in only)</p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">THURSDAY</h3>
                      <div className="font-medium text-[#333]">10.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      HOMEMADE CREAM CHICKEN - Served over biscuits with potato and side dish.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4 bg-[#8aad4b]/5 p-4 rounded-md">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">FRIDAY</h3>
                      <div className="font-medium text-[#333]">12.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      ALL YOU CAN EAT FISH - Served all day. Served with choice of potato and side dish.
                    </p>
                  </div>

                  <div className="border-b border-[#8aad4b]/20 pb-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-medium uppercase">SATURDAY</h3>
                      <div className="font-medium text-[#333]">13.99</div>
                    </div>
                    <p className="mt-1 text-sm text-[#555]">
                      6 OZ. SIRLOIN STEAK - Served with choice of potato and side dish.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mx-auto max-w-2xl rounded-lg border border-[#8aad4b]/20 bg-[#8aad4b]/5 p-4 text-center text-sm text-[#555]">
              <p>
                * Consuming raw or under cooked meats, poultry, eggs, seafood or shellfish may increase your risk of
                food borne illness.
              </p>
            </div>
          </div>
        </div>

        {/* Order Now Button */}
        <div className="bg-black py-16 text-center text-white">
          <div className="container px-6">
            <h2 className="font-serif text-4xl font-light md:text-5xl">
              Ready to <span className="italic">order?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">Place your order online for pickup or delivery</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                className="w-full rounded-full border-0 bg-white px-8 py-6 text-sm font-medium uppercase tracking-widest text-black transition-all hover:bg-white/90 sm:w-auto"
                asChild
              >
                <a
                  href="https://www.toasttab.com/fa-rays-2-1115-wooster-road-north"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full rounded-full border-white px-8 py-6 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-white/10 sm:w-auto"
                asChild
              >
                <a href="/fa-rays-menu.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Menu PDF
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-black/10 py-12">
          <div className="container px-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="font-serif text-xl font-light tracking-tighter">FA-RAYS FAMILY RESTAURANT</div>

              <div className="flex gap-8">
                <a
                  href="https://www.facebook.com/FaRaysFamilyRestaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest text-black/60 transition-colors hover:text-black"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/faraysrestaurant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest text-black/60 transition-colors hover:text-black"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              </div>

              <div className="text-sm text-black/60">© {new Date().getFullYear()} FA-RAYS. Powered by RDJ Media.</div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center text-sm text-black/60 md:flex-row md:gap-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                1115 Wooster Rd N, Barberton, Ohio 44203
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (330) 745-6091
              </div>
              <a href="mailto:faraysfamilyrestaurant@gmail.com" className="hover:text-black">
                faraysfamilyrestaurant@gmail.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
