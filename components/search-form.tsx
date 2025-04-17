"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle the search here
    console.log("Search for:", query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search menu..."
        className="w-full bg-background pl-8 pr-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}
