"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const racas = [
  { id: "golden-retriever", nome: "Golden Retriever" },
  { id: "pastor-alemao", nome: "Pastor Alemão" },
  { id: "labrador", nome: "Labrador" },
  { id: "bulldog-frances", nome: "Bulldog Francês" },
  { id: "beagle", nome: "Beagle" },
  { id: "poodle", nome: "Poodle" },
  { id: "husky-siberiano", nome: "Husky Siberiano" },
  { id: "yorkshire", nome: "Yorkshire" },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className=" border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <Link
            href="/"
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              pathname === "/"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700",
            )}
          >
            Todas
          </Link>
          {racas.map((raca) => (
            <Link
              key={raca.id}
              href={`/racas/${raca.id}`}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                pathname === `/racas/${raca.id}`
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700",
              )}
            >
              {raca.nome}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
