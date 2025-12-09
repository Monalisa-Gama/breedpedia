import { Button } from "@/components/ui/button";
import { ListaUsuarios } from "./lista-usuario-geral";
import { ApiResponse } from "../../_types/racas";
import { ProtectedRoute } from "@/components/protected-route";

type User = any;

async function GetUsuarios(): Promise<{ usuarios: User[]; error?: string }> {
  try {
    const resposta = await fetch("https://dummyjson.com/users", {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidar a cada hora
    });

    // validação dos dados da API
    if (!resposta.ok) {
      if (resposta.status === 404) {
        return { usuarios: [], error: "Endpoint não encontrado. Verifique a URL da API." };
      }
      if (resposta.status === 500) {
        return { usuarios: [], error: "Erro no servidor da API. Tente novamente mais tarde." };
      }
      if (resposta.status === 429) {
        return { usuarios: [], error: "Muitas requisições. Aguarde alguns instantes." };
      }
      return { usuarios: [], error: `Erro ao buscar usuários: ${resposta.status} ${resposta.statusText}` };
    }

    const dados = await resposta.json();
    const usuarios: User[] = Array.isArray(dados?.users) ? dados.users : Array.isArray(dados) ? dados : [];

    if (!usuarios || !Array.isArray(usuarios)) {
      return { usuarios: [], error: "Formato de dados inválido recebido da API." };
    }

    return { usuarios };
  } catch (erro) {
    console.error("Erro ao buscar usuários:", erro);
    return {
      usuarios: [],
      error: erro instanceof Error ? `Erro de conexão: ${erro.message}` : "Erro desconhecido ao buscar usuários. Verifique sua conexão.",
    };
  }
}

export async function ListaUsuarioServer() {
  const { usuarios } = await GetUsuarios();

  return (
    <section>
      <ProtectedRoute>
      <ListaUsuarios usuariosLista={usuarios} />
      </ProtectedRoute>
    </section>
  );
}