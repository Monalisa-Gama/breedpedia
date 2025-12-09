// src/components/search-input.tsx
"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from "use-debounce"
import { useState, useEffect } from "react"

export function SearchInput({ initialValue }: { initialValue: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  
  // Estado local para controlar o valor do input e evitar o reset visual
  const [searchTerm, setSearchTerm] = useState(initialValue)

  // Atualiza o estado local se o valor inicial da URL mudar
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);


  // Função debounce para atualizar a URL após um pequeno atraso
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    
    // Reseta a página para 1 quando a busca muda
    params.set("page", "1") 
    
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    
    // Atualiza a URL
    replace(`${pathname}?${params.toString()}`)
  }, 300) // Atraso de 300ms

  return (
    <div className="relative w-full max-w-sm mb-6">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
      <Input
        type="text"
        placeholder="Buscar raça..."
        className="pl-10 pr-4 py-2 text-md border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
        onChange={(e) => {
          setSearchTerm(e.target.value) // Atualiza o estado local imediatamente
          handleSearch(e.target.value) // Inicia o debounce para a URL
        }}
        value={searchTerm} // Controla o input com o estado local
      />
    </div>
  )
}


