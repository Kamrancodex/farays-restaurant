"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    src: "/delicate-greens.png",
    alt: "Elegantly plated dish",
  },
  {
    src: "/culinary-artist-at-work.png",
    alt: "Chef in action",
  },
  {
    src: "/cozy-italian-corner.png",
    alt: "Restaurant interior",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=artisanal cocktail with garnish",
    alt: "Signature cocktail",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=chocolate dessert with gold leaf",
    alt: "Decadent dessert",
  },
  {
    src: "/placeholder.svg?height=600&width=800&query=private dining room with elegant table setting",
    alt: "Private dining room",
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return

    const newIndex = (selectedImage + direction + galleryImages.length) % galleryImages.length
    setSelectedImage(newIndex)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={galleryImages[selectedImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => navigateImage(-1)}
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
                className="h-6 w-6"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Previous</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => navigateImage(1)}
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
                className="h-6 w-6"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="sr-only">Next</span>
            </Button>
          </div>

          <div className="absolute bottom-8 left-0 right-0 text-center text-white">
            <p className="text-sm font-medium">{galleryImages[selectedImage].alt}</p>
            <p className="text-xs text-white/70">
              {selectedImage + 1} of {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
