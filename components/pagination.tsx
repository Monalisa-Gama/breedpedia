"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
}

export function Pagination({ currentPage, totalPages, baseUrl = "/" }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Se tiver 7 páginas ou menos, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Sempre mostra primeira página
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      // Mostra páginas ao redor da atual
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("...")
      }

      // Sempre mostra última página
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className=" border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg rounded-b-md ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-1">
          {/* Botão Anterior */}
          <Link href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              className={cn(
                "border-zinc-200 dark:border-zinc-800",
                currentPage === 1 && "opacity-50 cursor-not-allowed",
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>

          {/* Números das páginas */}
          <div className="flex items-center gap-1 mx-2">
            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-zinc-600 dark:text-zinc-400">
                  ...
                </span>
              ) : (
                <Link key={page} href={`${baseUrl}?page=${page}`}>
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className={cn(
                      currentPage === page
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    )}
                  >
                    {page}
                  </Button>
                </Link>
              ),
            )}
          </div>

          {/* Botão Próximo */}
          <Link href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : "#"}>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              className={cn(
                "border-zinc-200 dark:border-zinc-800",
                currentPage === totalPages && "opacity-50 cursor-not-allowed",
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Contador de páginas */}
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-2">
          Página {currentPage} de {totalPages}
        </p>
      </div>
    </nav>
  )
}
