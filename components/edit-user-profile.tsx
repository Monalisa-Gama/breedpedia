'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { useState } from "react"
import {useRouter} from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { json } from "stream/consumers"

export default function EditUserProfilePage({ params }: { params: { user: User, mostrar_foto : boolean } }) {
  const { user, mostrar_foto } = params;


function EditableItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <input
        className="w-full border border-input bg-background px-3 py-2 rounded-md text-sm"
        defaultValue={value}
      />
    </div>
  )
}

const router = useRouter()
const [error, setError] = useState("")
const [isLoading, setIsLoading] = useState(false)

const SaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try{

      const response = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user //montar objeto com os dados atualizados
        })
    }) 
      .then(res => res.json())
      .then(console.log);
    console.log(JSON.stringify(user));
      router.push("/")

    }catch(err){
      setError("Erro ao tentar atualizar o usuário. Tente novamente.");
      console.log(err);
    }

}

    return (    
        <div>
            <form onSubmit={SaveChanges}>
                
            {/* Informações Pessoais */}
                <Card className="m-2">
                <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    {mostrar_foto && (
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user.image || "/placeholder.svg"} />
                        <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    )}
                </CardHeader>
                <CardContent className="space-y-2">
                    <EditableItem label="Nome Completo" value={`${user.firstName} ${user.lastName}`} />
                    <EditableItem label="Nome de Solteira" value={user.maidenName} />
                    <EditableItem label="Email" value={user.email} />
                    <EditableItem label="Telefone" value={user.phone} />
                    <EditableItem label="Data de Nascimento" value={user.birthDate} />
                    <EditableItem label="Idade" value={`${user.age}`} />
                    <EditableItem label="Gênero" value={user.gender} />
                </CardContent>
                </Card>

                {/* Características Físicas */}
                <Card className="m-2">
                <CardHeader>
                    <CardTitle>Características Físicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <EditableItem label="Altura" value={`${user.height}`} />
                    <EditableItem label="Peso" value={`${user.weight}`} />
                    <EditableItem label="Cor dos Olhos" value={user.eyeColor} />
                    <EditableItem label="Cabelo - Cor" value={user.hair.color} />
                    <EditableItem label="Cabelo - Tipo" value={user.hair.type} />
                    <EditableItem label="Tipo Sanguíneo" value={user.bloodGroup} />
                </CardContent>
                </Card>

                {/* Endereço */}
                <Card className="m-2">
                <CardHeader>
                    <CardTitle>Endereço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <EditableItem label="Rua" value={user.address.address} />
                    <EditableItem label="Cidade" value={user.address.city} />
                    <EditableItem label="Estado" value={user.address.state} />
                    <EditableItem label="CEP" value={user.address.postalCode} />
                </CardContent>
                </Card>

                {/* Informações Profissionais */}
                <Card className="m-2">
                <CardHeader>
                    <CardTitle>Informações Profissionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <EditableItem label="Empresa" value={user.company.name} />
                    <EditableItem label="Departamento" value={user.company.department} />
                    <EditableItem label="Cargo" value={user.company.title} />
                    <EditableItem label="Universidade" value={user.university} />

                    <div className="pt-2">
                    <EditableItem label="Endereço da Empresa" value={user.company.address.address} />
                    <EditableItem
                        label="Cidade/Estado/CEP"
                        value={`${user.company.address.city}, ${user.company.address.state} ${user.company.address.postalCode}`}
                    />
                    </div>
                </CardContent>
                </Card>

                {/* Informações Bancárias */}
                <Card className="m-2">
                <CardHeader>
                    <CardTitle>Informações Bancárias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <EditableItem label="Tipo de Cartão" value={user.bank.cardType} />
                    <EditableItem label="Número do Cartão" value={user.bank.cardNumber} />
                    <EditableItem label="Validade" value={user.bank.cardExpire} />
                    <EditableItem label="IBAN" value={user.bank.iban} />
                    <EditableItem label="Moeda" value={user.bank.currency} />
                </CardContent>
                </Card>

                {/* Criptomoeda */}
                <Card className="m-2">
                <CardHeader>
                    <CardTitle>Criptomoeda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <EditableItem label="Moeda" value={user.crypto.coin} />
                    <EditableItem label="Carteira" value={user.crypto.wallet} />
                    <EditableItem label="Rede" value={user.crypto.network} />
                </CardContent>
                </Card>

                {/* Informações Técnicas */}
                <Card className="m-2 md:col-span-2">
                <CardHeader>
                    <CardTitle>Informações Técnicas</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <EditableItem label="ID" value={user.id.toString()} />
                    <EditableItem label="Usuário" value={user.username} />
                    <EditableItem label="IP" value={user.ip} />
                    <EditableItem label="MAC Address" value={user.macAddress} />
                    </div>
                    <div className="space-y-2">
                    <EditableItem label="EIN" value={user.ein} />
                    <EditableItem label="SSN" value={user.ssn} />
                    <EditableItem label="Role" value={user.role} />
                    <EditableItem label="User Agent" value={user.userAgent} />
                    </div>
                </CardContent>
                </Card>

                <Button type="submit" className="m-2 bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black">
                    Salvar Alterações
                </Button>

            </form>
        </div>
    )
}