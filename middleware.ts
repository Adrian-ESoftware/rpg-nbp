import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pegue o token do cookie (ou localStorage via client, mas cookies são melhores para SSR)
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    // Redireciona para login se não autenticado
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "access_denied");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Aplica o middleware apenas nas rotas da dash
export const config = {
  matcher: ["/dash/:path*"],
};
