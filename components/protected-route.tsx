"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token && token !== "undefined") {
      router.push("/login")
    }
    console.log("Testou login no ProtectedRoute", token);
  }, [router])

  return <>{children}</>
}
