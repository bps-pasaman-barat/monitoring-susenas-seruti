import type { NextRequest } from "next/server";

export  default async function proxy(req: NextRequest) {
  console.log("from proxy not path btw", req)
    const path = req.nextUrl.pathname;
  
  console.log("from proxy", path);
  
}
