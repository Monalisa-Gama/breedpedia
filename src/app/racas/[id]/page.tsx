'use server';


import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation";



export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

//grupo
    const resp = await fetch(`https://dogapi.dog/api/v2/groups`, {
    cache: "force-cache", 
    });

    const grupos = await resp.json();
    console.log(grupos);

    const grupo = grupos.data.find((g: any) => {
        // Safely check relationships for breed id match (handles array or single object)
        const breeds = g.relationships?.breeds?.data;
        if (Array.isArray(breeds)) {
            return breeds.some((b: any) => b.id === id);
        }
        return breeds?.id === id;
    });



//raça
    const resposta = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`, {
        cache: "force-cache", 
    });

    const raca = await resposta.json();
    console.log(raca);

  /*return (
    <div>
      <h1>TESTE ID: {id}</h1>
        <p>{raca.data.attributes.name}</p>
        <pre>{JSON.stringify(raca, null, 2)}</pre>
        
    </div>
  );
*/



  if (!raca) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-6 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para lista
          </Button>
        </Link>

        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-3xl text-zinc-900 dark:text-zinc-50">{raca.data.attributes.name}</CardTitle>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">{raca.data.attributes.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Informações Básicas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Peso Macho</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{raca.data.attributes.male_weight.min}kg - {raca.data.attributes.male_weight.max}kg</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Grupo</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{grupo?.attributes.name || "N/A"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Peso Fêmea</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{raca.data.attributes.female_weight.min}kg - {raca.data.attributes.female_weight.max}kg</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Expectativa de Vida</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{raca.data.attributes.life.min} anos - {raca.data.attributes.life.max} anos</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Hipoalergênico</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{raca.data.attributes.hypoallergenic ? "Sim" : "Não"}</span>
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
