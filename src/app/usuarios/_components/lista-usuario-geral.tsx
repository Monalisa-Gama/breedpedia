'use client'

import { useState, useMemo, ChangeEvent } from "react" 
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react" 
import { HighlightText } from "@/components/highlight-text"


//quantidade de itens por página
const ITEMS_PER_PAGE = 12


export function ListaUsuarios({ usuariosLista }: { usuariosLista: User[] }) {
  const [currentPage, setCurrentPage] = useState(1) //use state para página atual
  const [searchTerm, setSearchTerm] = useState('')  //use state para termo de busca

  // Função para lidar com a mudança do termo de busca
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Resetar a página para 1 ao filtrar
    setCurrentPage(1); 
  };

  // Filtrar usuários com base no termo de busca
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return usuariosLista
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    return usuariosLista.filter(user =>
      // Filtrando por: Nome (primeiro e último)
      user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
      // Filtrando por: Username
      user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
      // Filtrando por: Email
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      // Filtrando por: Cargo (Role)
      user.role.toLowerCase().includes(lowerCaseSearchTerm) ||
      // Filtrando por: Título da Empresa (Company Title)
      user.company.title.toLowerCase().includes(lowerCaseSearchTerm)
    )
  }, [usuariosLista, searchTerm]) 

  
  // Lógica de Paginação (agora baseada nos usuários filtrados)
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentUsers = filteredUsers.slice(startIndex, endIndex)


  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Lista de Usuários</h1>
          <p className="text-muted-foreground mt-2">Clique em um usuário para ver todos os detalhes</p>
        </div>

        {/* --- CAMPO DE BUSCA SIMPLES --- */}
        <div className="mb-8">
            <input 
                type="text" 
                placeholder="Filtrar por nome, email, cargo, etc..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
        


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
            <Link key={user.id} href={`/usuarios/${user.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">
                       <HighlightText text={user.firstName} query={searchTerm} /> <HighlightText text={user.lastName} query={searchTerm} />
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">@<HighlightText text={user.username} query={searchTerm} /></p>
                      <p className="text-sm text-muted-foreground truncate mt-1"><HighlightText text={user.email} query={searchTerm} /></p>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <Badge variant="default"><HighlightText text={user.role} query={searchTerm} /></Badge>
                        <Badge variant="secondary"><HighlightText text={user.company.title} query={searchTerm} /></Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
          ) : (
            <p className="col-span-full text-center text-lg text-muted-foreground">
                Nenhum usuário encontrado para o termo **"{searchTerm}"**.
            </p>
          )}
        </div>



        {/* Paginação */}
        {filteredUsers.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        )}
        
        
      </div>
    </main>
  )
}