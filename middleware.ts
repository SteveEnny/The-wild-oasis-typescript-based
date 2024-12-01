// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log(request);
//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lb/auth";
export const middleware = auth;

//once this user hit this route the authorize callback will be called
export const config = {
  matcher: ["/account"],
};
