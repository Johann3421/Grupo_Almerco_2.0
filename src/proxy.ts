import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const VALID_AUTH_ACTIONS = new Set([
  "signin",
  "signout",
  "callback",
  "csrf",
  "providers",
  "session",
  "verify-request",
  "error",
  "register",
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Interceptar escaneos de bots / vulnerabilidades sobre Server Actions (e.g. Next-Action: x)
  const nextAction = request.headers.get("next-action");
  if (nextAction && (nextAction === "x" || nextAction.length < 10)) {
    return new NextResponse("Invalid action", { status: 400 });
  }

  // 2. Interceptar escaneos con acciones no reconocidas en /api/auth/* (evitar UnknownAction de Auth.js)
  if (pathname.startsWith("/api/auth/")) {
    const action = pathname.slice("/api/auth/".length).split("/")[0];
    if (action && !VALID_AUTH_ACTIONS.has(action)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  // 3. Proteger rutas administrativas /admin
  if (pathname.startsWith("/admin")) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 4. Proteger ruta de usuario /cuenta
  if (pathname.startsWith("/cuenta")) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
