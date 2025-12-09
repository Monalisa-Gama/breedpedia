import Link from "next/link"
import { Dog } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 rounded-t-md shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
            <Dog className="h-6 w-6 text-white dark:text-zinc-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">DogPedia</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Enciclopédia Canina</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Raças
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/cadastro"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Cadastro
          </Link>
          <Link
            href="/usuarios"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Usuários
          </Link>
        </nav>
      </div>
    </header>
  )
}
