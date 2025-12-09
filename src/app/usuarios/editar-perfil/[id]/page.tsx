import EditUserProfilePage from "@/components/edit-user-profile"


type PageProps = {
  params: Promise<{
    id: string
  }>
}


export default async function EditarPerfilPage({ params }: PageProps) {

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
        <EditUserProfilePage params={{ user: usuario, mostrar_foto: true }} />
      </div>
    </main>
  )
}
