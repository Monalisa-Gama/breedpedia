'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState, useCallback, useId } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  userFormSchema, 
  transformFormDataToApi, 
  getFormErrors, 
  UserFormData 
} from "@/src/app/usuarios/editar-perfil/_schema/form-edit-usuario-schema"


export default function EditUserProfilePage({ params }: { params: { user: User, mostrar_foto: boolean } }) {
  const { user, mostrar_foto } = params;
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Estado para controlar os dados editáveis com tipo UserFormData
  const [formData, setFormData] = useState<UserFormData>({
    firstName: user.firstName,
    lastName: user.lastName,
    maidenName: user.maidenName,
    email: user.email,
    phone: user.phone,
    birthDate: user.birthDate,
    age: user.age,
    gender: user.gender,
    height: user.height,
    weight: user.weight,
    eyeColor: user.eyeColor,
    hairColor: user.hair.color,
    hairType: user.hair.type,
    bloodGroup: user.bloodGroup,
    address: user.address.address,
    city: user.address.city,
    state: user.address.state,
    postalCode: user.address.postalCode,
    companyName: user.company.name,
    department: user.company.department,
    title: user.company.title,
    university: user.university,
    companyAddress: user.company.address.address,
    companyCity: user.company.address.city,
    companyState: user.company.address.state,
    companyPostalCode: user.company.address.postalCode,
    cardType: user.bank.cardType,
    cardNumber: user.bank.cardNumber,
    cardExpire: user.bank.cardExpire,
    iban: user.bank.iban,
    currency: user.bank.currency,
    coin: user.crypto.coin,
    wallet: user.crypto.wallet,
    network: user.crypto.network,
    username: user.username,
    ip: user.ip,
    macAddress: user.macAddress,
    ein: user.ein,
    ssn: user.ssn,
    role: user.role,
    userAgent: user.userAgent
  })

  // Usando useCallback para evitar recriação da função
  const handleInputChange = useCallback((field: keyof UserFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [formErrors])

  // Função para validar o formulário
  const validateForm = () => {
    const errors = getFormErrors(formData)
    if (errors) {
      setFormErrors(errors)
      return false
    }
    setFormErrors({})
    return true
  }

  const SaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Validar formulário antes de enviar
    if (!validateForm()) {
      setError("Por favor, corrija os erros no formulário.")
      return
    }
    
    setIsLoading(true)

    try {
      // Usar a função transformFormDataToApi do schema
      const apiData = transformFormDataToApi(formData, user)
      
      const response = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      })

      const data = await response.json()
      console.log("Usuário atualizado:", data)
      router.push("/")

    } catch (err) {
      setError("Erro ao tentar atualizar o usuário. Tente novamente.")
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Componente de input como componente separado para evitar re-renderizações desnecessárias
  const InputItem = useCallback(({ 
    label, 
    value, 
    field, 
    type = "text",
    readOnly = false
  }: { 
    label: string; 
    value: string | number; 
    field: keyof UserFormData;
    type?: string;
    readOnly?: boolean;
  }) => {
    const id = useId()
    const error = formErrors[field]
    
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium text-muted-foreground">
          {label}
        </Label>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => {
            const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
            handleInputChange(field, newValue)
          }}
          readOnly={readOnly}
          className={`w-full ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    )
  }, [handleInputChange, formErrors])

  return (
    <div className="p-4">
      <form onSubmit={SaveChanges}>
        {/* Informações Pessoais */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
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
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputItem label="Nome" value={formData.firstName} field="firstName" />
              <InputItem label="Sobrenome" value={formData.lastName} field="lastName" />
              <InputItem label="Nome de Solteira" value={formData.maidenName} field="maidenName" />
              <InputItem label="Email" value={formData.email} field="email" type="email" />
              <InputItem label="Telefone" value={formData.phone} field="phone" type="tel" />
              <InputItem label="Data de Nascimento" value={formData.birthDate} field="birthDate" type="date" />
              <InputItem label="Idade" value={formData.age} field="age" type="number" />
              <InputItem label="Gênero" value={formData.gender} field="gender" />
            </div>
          </CardContent>
        </Card>

        {/* Características Físicas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Características Físicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputItem label="Altura (cm)" value={formData.height} field="height" type="number" />
              <InputItem label="Peso (kg)" value={formData.weight} field="weight" type="number" />
              <InputItem label="Cor dos Olhos" value={formData.eyeColor} field="eyeColor" />
              <InputItem label="Cabelo - Cor" value={formData.hairColor} field="hairColor" />
              <InputItem label="Cabelo - Tipo" value={formData.hairType} field="hairType" />
              <InputItem label="Tipo Sanguíneo" value={formData.bloodGroup} field="bloodGroup" />
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputItem label="Rua" value={formData.address} field="address" />
              <InputItem label="Cidade" value={formData.city} field="city" />
              <InputItem label="Estado" value={formData.state} field="state" />
              <InputItem label="CEP" value={formData.postalCode} field="postalCode" />
            </div>
          </CardContent>
        </Card>

        {/* Informações Profissionais */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações Profissionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputItem label="Empresa" value={formData.companyName} field="companyName" />
              <InputItem label="Departamento" value={formData.department} field="department" />
              <InputItem label="Cargo" value={formData.title} field="title" />
              <InputItem label="Universidade" value={formData.university} field="university" />
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Endereço da Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputItem label="Endereço" value={formData.companyAddress} field="companyAddress" />
                <InputItem label="Cidade" value={formData.companyCity} field="companyCity" />
                <InputItem label="Estado" value={formData.companyState} field="companyState" />
                <InputItem label="CEP" value={formData.companyPostalCode} field="companyPostalCode" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Bancárias */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações Bancárias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputItem label="Tipo de Cartão" value={formData.cardType} field="cardType" />
              <InputItem label="Número do Cartão" value={formData.cardNumber} field="cardNumber" />
              <InputItem label="Validade" value={formData.cardExpire} field="cardExpire" />
              <InputItem label="IBAN" value={formData.iban} field="iban" />
              <InputItem label="Moeda" value={formData.currency} field="currency" />
            </div>
          </CardContent>
        </Card>

        {/* Criptomoeda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Criptomoeda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputItem label="Moeda" value={formData.coin} field="coin" />
              <InputItem label="Carteira" value={formData.wallet} field="wallet" />
              <InputItem label="Rede" value={formData.network} field="network" />
            </div>
          </CardContent>
        </Card>

        {/* Informações Técnicas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <InputItem label="Usuário" value={formData.username} field="username" />
                <InputItem label="IP" value={formData.ip} field="ip" />
                <InputItem label="MAC Address" value={formData.macAddress} field="macAddress" />
                <InputItem label="EIN" value={formData.ein} field="ein" />
              </div>
              <div className="space-y-4">
                <InputItem label="SSN" value={formData.ssn} field="ssn" />
                <InputItem label="Role" value={formData.role} field="role" />
                <InputItem label="User Agent" value={formData.userAgent} field="userAgent" />
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}