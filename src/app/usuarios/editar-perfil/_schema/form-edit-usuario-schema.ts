// schemas/userSchema.ts
import { z } from 'zod'

// Schema único e simplificado para o formulário
export const userFormSchema = z.object({
  // Informações Pessoais
  firstName: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome não pode ter mais de 50 caracteres")
    .refine(value => !/\d/.test(value), "Nome não pode conter números"),
  lastName: z.string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .max(50, "Sobrenome não pode ter mais de 50 caracteres"),
  maidenName: z.string().optional(),
  email: z.string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  phone: z.string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(20, "Telefone não pode ter mais de 20 dígitos"),
  birthDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD"),
  age: z.coerce.number()  // Usando coerce para converter string para number
    .int("Idade deve ser um número inteiro")
    .min(0, "Idade não pode ser negativa")
    .max(150, "Idade inválida"),
  gender: z.string()
    .min(1, "Gênero é obrigatório"),

  // Características Físicas
  height: z.coerce.number()
    .min(50, "Altura mínima é 50cm")
    .max(250, "Altura máxima é 250cm"),
  weight: z.coerce.number()
    .min(20, "Peso mínimo é 20kg")
    .max(300, "Peso máximo é 300kg"),
  eyeColor: z.string()
    .min(1, "Cor dos olhos é obrigatória"),
  hairColor: z.string()
    .min(1, "Cor do cabelo é obrigatória"),
  hairType: z.string()
    .min(1, "Tipo de cabelo é obrigatório"),
  bloodGroup: z.string()
    .min(1, "Tipo sanguíneo é obrigatório"),

  // Endereço
  address: z.string()
    .min(1, "Endereço é obrigatório"),
  city: z.string()
    .min(1, "Cidade é obrigatória"),
  state: z.string()
    .min(1, "Estado é obrigatório"),
  postalCode: z.string()
    .min(1, "CEP é obrigatório"),

  // Informações Profissionais
  companyName: z.string()
    .min(1, "Nome da empresa é obrigatório"),
  department: z.string()
    .min(1, "Departamento é obrigatório"),
  title: z.string()
    .min(1, "Cargo é obrigatório"),
  university: z.string()
    .min(1, "Universidade é obrigatória"),
  
  // Endereço da Empresa
  companyAddress: z.string()
    .min(1, "Endereço da empresa é obrigatório"),
  companyCity: z.string()
    .min(1, "Cidade da empresa é obrigatória"),
  companyState: z.string()
    .min(1, "Estado da empresa é obrigatório"),
  companyPostalCode: z.string()
    .min(1, "CEP da empresa é obrigatório"),

  // Informações Bancárias
  cardType: z.string()
    .min(1, "Tipo de cartão é obrigatório"),
  cardNumber: z.string()
    .min(1, "Número do cartão é obrigatório"),
  cardExpire: z.string()
    .min(1, "Data de validade é obrigatória"),
  iban: z.string()
    .min(1, "IBAN é obrigatório"),
  currency: z.string()
    .min(1, "Moeda é obrigatória"),

  // Criptomoeda
  coin: z.string()
    .min(1, "Moeda cripto é obrigatória"),
  wallet: z.string()
    .min(1, "Carteira é obrigatória"),
  network: z.string()
    .min(1, "Rede é obrigatória"),

  // Informações Técnicas
  username: z.string()
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .max(30, "Usuário não pode ter mais de 30 caracteres"),
  ip: z.string()
    .min(1, "IP é obrigatório"),
  macAddress: z.string()
    .min(1, "MAC Address é obrigatório"),
  ein: z.string()
    .min(1, "EIN é obrigatório"),
  ssn: z.string()
    .min(1, "SSN é obrigatório"),
  role: z.string()
    .min(1, "Role é obrigatório"),
  userAgent: z.string()
    .min(1, "User Agent é obrigatório")
})

// Tipo inferido do schema
export type UserFormData = z.infer<typeof userFormSchema>

// Função para validar o formulário
export function validateUserForm(data: any) {
  return userFormSchema.safeParse(data)
}

// Função para obter mensagens de erro específicas
export function getFormErrors(data: any) {
  const result = userFormSchema.safeParse(data)
  
  if (!result.success) {
    const errors: Record<string, string> = {}
    result.error.issues.forEach((error) => {
      const path = error.path.join('.')
      errors[path] = error.message
    })
    return errors
  }
  
  return null
}

// Função para transformar formData em dados para API
export function transformFormDataToApi(formData: UserFormData, originalUser: any) {
  return {
    ...originalUser,
    firstName: formData.firstName,
    lastName: formData.lastName,
    maidenName: formData.maidenName,
    email: formData.email,
    phone: formData.phone,
    birthDate: formData.birthDate,
    age: formData.age,
    gender: formData.gender,
    height: formData.height,
    weight: formData.weight,
    eyeColor: formData.eyeColor,
    hair: {
      ...originalUser.hair,
      color: formData.hairColor,
      type: formData.hairType
    },
    bloodGroup: formData.bloodGroup,
    address: {
      ...originalUser.address,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode
    },
    company: {
      ...originalUser.company,
      name: formData.companyName,
      department: formData.department,
      title: formData.title,
      address: {
        ...originalUser.company.address,
        address: formData.companyAddress,
        city: formData.companyCity,
        state: formData.companyState,
        postalCode: formData.companyPostalCode
      }
    },
    university: formData.university,
    bank: {
      ...originalUser.bank,
      cardType: formData.cardType,
      cardNumber: formData.cardNumber,
      cardExpire: formData.cardExpire,
      iban: formData.iban,
      currency: formData.currency
    },
    crypto: {
      ...originalUser.crypto,
      coin: formData.coin,
      wallet: formData.wallet,
      network: formData.network
    },
    username: formData.username,
    ip: formData.ip,
    macAddress: formData.macAddress,
    ein: formData.ein,
    ssn: formData.ssn,
    role: formData.role,
    userAgent: formData.userAgent
  }
}