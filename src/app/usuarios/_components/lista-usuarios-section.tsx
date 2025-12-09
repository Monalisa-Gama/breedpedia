
"use client"

import { Button } from "@/components/ui/button";

export function ListaUsuariosSection() {


     async function buscarUsuarios() {
        
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users/2");
        const usuario = await resposta.json() as User
        console.log('🟢 USUARIO:',usuario);
        
    } 

  
  
return (

<section >
    <Button onClick={buscarUsuarios} className="btn btn-primary">Carregar Usuários</Button>
   
    </section>
)

}