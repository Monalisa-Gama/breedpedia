import { UserProfile } from "@/components/user-profile"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"


type PageProps = {
  params: Promise<{
    id: string
  }>
}



export default async function UserDetailPage({ params }: PageProps) {

  const resolvedParams = await params
  const id = resolvedParams.id

    const resposta = await fetch(`https://dummyjson.com/users/${id}`, {
        cache: "force-cache", 
    });

    const usuario = await resposta.json();

    if (!usuario) {
        //notFound()
        console.log("Usuário não encontrado");
    }


  return (
    <main className="min-h-screen py-8">
        
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <Link href="/usuarios">
          <Button variant="ghost" className="gap-2" size={'lg'}>
            <ArrowLeft className="h-4 w-4" />
            Voltar para a lista
          </Button>
        </Link>
      </div>
      <UserProfile user={usuario} mostrar_foto={true} />
    </main>
  )
}
