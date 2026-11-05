import { handlers } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const VALID_ACTIONS = new Set([
  "signin",
  "signout",
  "callback",
  "csrf",
  "providers",
  "session",
  "verify-request",
  "error",
]);

function isValidAction(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const action = pathname.replace(/^\/api\/auth\/?/, "").split("/")[0];
  return VALID_ACTIONS.has(action);
}

export async function GET(req: NextRequest) {
  if (!isValidAction(req)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  if (!isValidAction(req)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return handlers.POST(req);
}
