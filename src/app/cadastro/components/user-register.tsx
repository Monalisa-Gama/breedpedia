"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formCadastroScrema, FormCadastroSchema } from "../_schema/form-cadastro-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {useRouter} from "next/navigation"




export function UserRegister() {
  const [error, setError] = useState("")
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormCadastroSchema>({
    resolver: zodResolver(formCadastroScrema),
    mode: "onTouched",
  })

  
  const handleRegister = async (data: FormCadastroSchema) => {
    setError("")

    try{
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        })
      })

      const json = await response.json()
      console.log(json)

      router.push("/")

    }catch(err){
      setError("Erro ao tentar cadastrar novo usuário. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar Conta</CardTitle>
          <CardDescription className="text-center">Preencha os dados abaixo para criar sua conta</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleRegister)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstname">Nome</Label>
            <Input id="firstname" type="text" placeholder="Seu nome" className="bg-white dark:bg-neutral-900" {...register("firstName")} />
            {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Sobrenome</Label>
            <Input id="lastname" type="text" placeholder="Seu nome" className="bg-white dark:bg-neutral-900" {...register("lastName")} />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" className="bg-white dark:bg-neutral-900" {...register("email")} />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" className="bg-white dark:bg-neutral-900" {...register("password")} />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>


          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar senha</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="bg-white dark:bg-neutral-900"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button disabled={isSubmitting} className="w-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black">
            {isSubmitting ? 'Criando...' : 'Criar conta'}
          </Button>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          
          <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-black hover:underline dark:text-white">
              Faça login
            </Link>
          </p>
        </CardFooter>
        </form>
      </Card>
    </div>
  )
}
