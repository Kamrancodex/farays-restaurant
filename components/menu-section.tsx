import { cn } from "@/lib/utils"

interface MenuItem {
  name: string
  description?: string
  price: string
  note?: string
  featured?: boolean
  new?: boolean
}

interface MenuSectionProps {
  items: MenuItem[]
  columns?: number
  note?: string
}

export function MenuSection({ items, columns = 1, note }: MenuSectionProps) {
  return (
    <div className="space-y-8">
      <div
        className={cn(
          "grid gap-8",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "group relative rounded-lg border border-black/5 p-6 transition-all hover:border-black/10 hover:shadow-md",
              item.featured && "border-black/10 bg-black/5",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.new && (
                    <span className="rounded-full bg-black px-2 py-1 text-xs font-medium uppercase text-white">
                      New
                    </span>
                  )}
                </div>
                {item.description && <p className="mt-2 text-sm text-black/60">{item.description}</p>}
                {item.note && <p className="mt-2 text-xs italic text-black/50">{item.note}</p>}
              </div>
              {item.price && <div className="whitespace-nowrap font-medium">{item.price}</div>}
            </div>
          </div>
        ))}
      </div>

      {note && (
        <div className="rounded-lg border border-black/5 bg-black/5 p-4 text-center text-sm text-black/70">{note}</div>
      )}
    </div>
  )
}
