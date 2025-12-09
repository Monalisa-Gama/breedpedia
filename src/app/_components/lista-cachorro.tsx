import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Pagination } from "@/components/pagination"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ApiResponse, BreedResult } from "../_types/racas"
// IMPORTE O NOVO COMPONENTE:
import { SearchInput } from "@/components/search-input"
import { HighlightText } from "@/components/highlight-text"

// --- FUNÇÃO DE BUSCA ATUALIZADA ---
async function getRacasPaginadas(
  page: number,
  query: string, // NOVO PARÂMETRO
  itemsPerPage = 9
): Promise<BreedResult> {
  try {
    const resposta = await fetch("https://dogapi.dog/api/v2/breeds", {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar a cada hora
    })

    if (!resposta.ok) {
      // ... (tratamento de erros existente)
      if (resposta.status === 404) {
        return {
          racas: [],
          totalPages: 0,
          error: "Endpoint não encontrado. Verifique a URL da API.",
        }
      }
      if (resposta.status === 500) {
        return {
          racas: [],
          totalPages: 0,
          error: "Erro no servidor da API. Tente novamente mais tarde.",
        }
      }
      if (resposta.status === 429) {
        return {
          racas: [],
          totalPages: 0,
          error: "Muitas requisições. Aguarde alguns instantes.",
        }
      }
      return {
        racas: [],
        totalPages: 0,
        error: `Erro ao buscar raças: ${resposta.status} ${resposta.statusText}`,
      }
    }

    const dados: ApiResponse = await resposta.json()

    if (!dados.data || !Array.isArray(dados.data)) {
      return {
        racas: [],
        totalPages: 0,
        error: "Formato de dados inválido recebido da API.",
      }
    }

    // 1. FILTRAGEM DOS DADOS (ANTES DA PAGINAÇÃO)
    const racasFiltradas = query
      ? dados.data.filter((raca) =>
          raca.attributes.name.toLowerCase().includes(query.toLowerCase())
        )
      : dados.data

    // 2. Paginação manual dos dados FILTRADOS
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const racasPaginadas = racasFiltradas.slice(startIndex, endIndex)
    const totalPages = Math.ceil(racasFiltradas.length / itemsPerPage) // totalPages baseado nas racas filtradas

    return { racas: racasPaginadas, totalPages }

  } catch (erro) {
    console.error("Erro ao buscar raças:", erro)
    return {
      racas: [],
      totalPages: 0,
      error:
        erro instanceof Error
          ? `Erro de conexão: ${erro.message}`
          : "Erro desconhecido ao buscar raças. Verifique sua conexão.",
    }
  }
}

// --- COMPONENTE DA PÁGINA ATUALIZADO ---
export default async function ListaCachorro({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }> // NOVO PARÂMETRO
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const searchQuery = params.query || "" // LÊ A QUERY DA URL

  const { racas, totalPages, error } = await getRacasPaginadas(
    currentPage,
    searchQuery // PASSA A QUERY PARA A FUNÇÃO DE BUSCA
  )

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-12 px-4 pb-32">
        <div className="max-width mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 text-balance">Raças de Cachorros</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Explore informações sobre diferentes raças caninas</p>
          </div>

          {/* NOVO: INPUT DE BUSCA */}
          <SearchInput initialValue={searchQuery} />
          
          {error && (
            <Alert
              variant="destructive"
              className="mb-6 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-red-900 dark:text-red-200">Erro ao carregar raças</AlertTitle>
              <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {racas && racas.length > 0
              ? racas.map((raca) => (
                  <Card
                    key={raca.id}
                    className="bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg dark:hover:shadow-zinc-900/50 transition-all duration-200 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <CardTitle className="text-zinc-900 dark:text-zinc-50">
                        {/* NOVO: USA O HighlightText AQUI */}
                        <HighlightText text={raca.attributes.name} query={searchQuery} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-zinc-600 dark:text-zinc-400">Macho:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                            {raca.attributes.male_weight.min}Kg - {raca.attributes.male_weight.max}Kg
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-zinc-600 dark:text-zinc-400">Fêmea:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                            {raca.attributes.female_weight.min}Kg - {raca.attributes.female_weight.max}Kg
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-zinc-600 dark:text-zinc-400">Expectativa:</span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                            {raca.attributes.life.min} - {raca.attributes.life.max} anos
                          </span>
                        </div>
                      </div>
                      <Link href={`/racas/${raca.id}`} className="block mt-4">
                        <Button
                          variant="outline"
                          className="w-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 bg-transparent text-zinc-900 dark:text-zinc-100 transition-all"
                        >
                          Ver mais detalhes
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              : !error && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">Nenhuma raça encontrada para exibir.</p>
                    <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-2">
                        {searchQuery ? `Tente refinar sua busca por "${searchQuery}".` : "Tente navegar para outra página."}
                    </p>
                  </div>
                )
            }
          </div>
        </div>
      </div>
      {/* A paginação agora só é mostrada se não houver erro E houver mais de uma página */}
      {!error && totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    </>
  )
}