"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setCursorVariant("hover")
      } else {
        setCursorVariant("default")
      }
    }

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      height: 12,
      width: 12,
      backgroundColor: "#000",
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "#fff",
      mixBlendMode: "difference" as const,
    },
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    />
  )
}
