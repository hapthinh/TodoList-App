import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const allowedOrigins = ["https://localhost:3000"];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
  "Access-Control-Allow-Headers": "Content-type",
};

export function middleware(request: NextRequest) {
  const requestHeader = new Headers(request.headers);
  requestHeader.set("origin", "https://localhost:3000");
  const origin = requestHeader.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/:path",
};
