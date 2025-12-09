import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { Link } from "lucide-react"

type UserProfileProps = {
  user: User
  mostrar_foto?: boolean
} 

export function UserProfile({ user, mostrar_foto }: UserProfileProps) {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header com informações principais */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            {mostrar_foto  && (
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            )}
            <div className="flex-1">
              <CardTitle className="text-3xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <p className="text-muted-foreground mt-1">@{user.username}</p>
              <div className="flex gap-2 mt-3">
                <Badge>{user.role}</Badge>
                <Badge variant="outline">{user.gender}</Badge>
                <Badge variant="secondary">{user.age} anos</Badge>
              </div>
            </div>     
              <a href={`/usuarios/editar-perfil/${user.id}`}><Button variant="outline" className="ml-auto">Editar Perfil</Button></a>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <PropertyItem label="Nome Completo" value={`${user.firstName} ${user.lastName}`} />
            <PropertyItem label="Nome de Solteira" value={user.maidenName} />
            <PropertyItem label="Email" value={user.email} />
            <PropertyItem label="Telefone" value={user.phone} />
            <PropertyItem label="Data de Nascimento" value={user.birthDate} />
            <PropertyItem label="Idade" value={`${user.age} anos`} />
            <PropertyItem label="Gênero" value={user.gender} />
          </CardContent>
        </Card>

        {/* Características Físicas */}
        <Card>
          <CardHeader>
            <CardTitle>Características Físicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <PropertyItem label="Altura" value={`${user.height} cm`} />
            <PropertyItem label="Peso" value={`${user.weight} kg`} />
            <PropertyItem label="Cor dos Olhos" value={user.eyeColor} />
            <PropertyItem label="Cabelo - Cor" value={user.hair.color} />
            <PropertyItem label="Cabelo - Tipo" value={user.hair.type} />
            <PropertyItem label="Tipo Sanguíneo" value={user.bloodGroup} />
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <PropertyItem label="Rua" value={user.address.address} />
            <PropertyItem label="Cidade" value={user.address.city} />
            <PropertyItem label="Estado" value={user.address.state} />
            <PropertyItem label="CEP" value={user.address.postalCode} />
          </CardContent>
        </Card>

        {/* Informações Profissionais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Profissionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <PropertyItem label="Empresa" value={user.company.name} />
            <PropertyItem label="Departamento" value={user.company.department} />
            <PropertyItem label="Cargo" value={user.company.title} />
            <PropertyItem label="Universidade" value={user.university} />
            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-1">Endereço da Empresa</p>
              <p className="text-sm">{user.company.address.address}</p>
              <p className="text-sm">
                {user.company.address.city}, {user.company.address.state} {user.company.address.postalCode}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações Bancárias */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Bancárias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <PropertyItem label="Tipo de Cartão" value={user.bank.cardType} />
            <PropertyItem label="Número do Cartão" value={`•••• ${user.bank.cardNumber.slice(-4)}`} />
            <PropertyItem label="Validade" value={user.bank.cardExpire} />
            <PropertyItem label="IBAN" value={user.bank.iban} />
            <PropertyItem label="Moeda" value={user.bank.currency} />
          </CardContent>
        </Card>

        {/* Criptomoeda */}
        <Card>
          <CardHeader>
            <CardTitle>Criptomoeda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <PropertyItem label="Moeda" value={user.crypto.coin} />
            <PropertyItem label="Carteira" value={user.crypto.wallet} />
            <PropertyItem label="Rede" value={user.crypto.network} />
          </CardContent>
        </Card>

        {/* Informações Técnicas */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <PropertyItem label="ID" value={user.id.toString()} />
              <PropertyItem label="Usuário" value={user.username} />
              <PropertyItem label="IP" value={user.ip} />
              <PropertyItem label="MAC Address" value={user.macAddress} />
            </div>
            <div className="space-y-2">
              <PropertyItem label="EIN" value={user.ein} />
              <PropertyItem label="SSN" value={user.ssn} />
              <PropertyItem label="Role" value={user.role} />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">User Agent</p>
                <p className="text-xs text-foreground break-all">{user.userAgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PropertyItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  )
}
