"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const menuCategories = [
  { id: "starters", name: "Starters" },
  { id: "mains", name: "Mains" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
]

const menuItems = {
  starters: [
    {
      name: "Truffle Arancini",
      description: "Crispy risotto balls with wild mushrooms, black truffle, and parmesan fondue",
      price: "$16",
      image: "/dish-1.jpg",
    },
    {
      name: "Citrus Cured Salmon",
      description: "House-cured salmon with citrus, fennel pollen, radish, and herb oil",
      price: "$18",
      image: "/dish-2.jpg",
    },
    {
      name: "Roasted Beet Tartare",
      description: "Golden and red beets with avocado, capers, and mustard vinaigrette",
      price: "$14",
      image: "/dish-3.jpg",
    },
  ],
  mains: [
    {
      name: "Herb Crusted Rack of Lamb",
      description: "With roasted garlic mashed potatoes, seasonal vegetables, and rosemary jus",
      price: "$38",
      image: "/dish-4.jpg",
    },
    {
      name: "Pan Seared Sea Bass",
      description: "With saffron risotto, fennel confit, and citrus beurre blanc",
      price: "$34",
      image: "/dish-5.jpg",
    },
    {
      name: "Wild Mushroom Ravioli",
      description: "Handmade pasta with forest mushrooms, truffle cream, and aged parmesan",
      price: "$28",
      image: "/dish-6.jpg",
    },
  ],
  desserts: [
    {
      name: "Vanilla Bean Crème Brûlée",
      description: "Classic custard with Madagascar vanilla and caramelized sugar",
      price: "$12",
      image: "/dish-7.jpg",
    },
    {
      name: "Dark Chocolate Soufflé",
      description: "With grand marnier crème anglaise and candied orange",
      price: "$14",
      image: "/dish-8.jpg",
    },
    {
      name: "Seasonal Fruit Pavlova",
      description: "Crisp meringue with chantilly cream and market fresh berries",
      price: "$13",
      image: "/dish-9.jpg",
    },
  ],
  drinks: [
    {
      name: "Signature Negroni",
      description: "House-infused gin, Campari, sweet vermouth, and orange zest",
      price: "$16",
      image: "/drink-1.jpg",
    },
    {
      name: "Elderflower Spritz",
      description: "St. Germain, prosecco, soda water, and fresh mint",
      price: "$14",
      image: "/drink-2.jpg",
    },
    {
      name: "Smoked Old Fashioned",
      description: "Bourbon, maple syrup, aromatic bitters, and applewood smoke",
      price: "$18",
      image: "/drink-3.jpg",
    },
  ],
}

export function MenuGallery() {
  const [activeCategory, setActiveCategory] = useState("starters")
  const [selectedItem, setSelectedItem] = useState<null | {
    name: string
    description: string
    price: string
    image: string
  }>(null)

  return (
    <div>
      <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-8">
        {menuCategories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "relative px-4 py-2 text-sm uppercase tracking-widest transition-colors",
              activeCategory === category.id ? "text-white" : "text-white/40 hover:text-white/70",
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
            {activeCategory === category.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute -bottom-2 left-1/2 h-[1px] w-12 -translate-x-1/2 bg-white"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <motion.div
              key={`${activeCategory}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-light">{item.name}</h3>
                  <span className="text-white/80">{item.price}</span>
                </div>
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative mx-4 max-w-3xl overflow-hidden bg-[#121212]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square">
                  <img
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <h3 className="font-serif text-2xl font-light text-white md:text-3xl">{selectedItem.name}</h3>
                  <div className="mt-2 text-lg text-white/80">{selectedItem.price}</div>
                  <div className="mt-4 h-[1px] w-16 bg-white/20"></div>
                  <p className="mt-6 text-white/70">{selectedItem.description}</p>

                  <button
                    className="mt-8 self-start rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
