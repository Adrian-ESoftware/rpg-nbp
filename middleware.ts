import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // Pegue o token do cookie
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    // Redireciona para login se não autenticado
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "access_denied");
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verificar se o token é válido usando a função do auth.ts
    await verifyAuth(token);

    // Token válido, permitir acesso
    return NextResponse.next();
  } catch (error) {
    // Token inválido ou expirado, redirecionar para login
    console.error('Token inválido:', error);

    // Limpar o cookie inválido
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "access_denied");
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("access_token");

    return response;
  }
}

// Aplica o middleware apenas nas rotas da dash
export const config = {
  matcher: ["/dash/:path*"],
};
