import { NextRequest, NextResponse } from "next/server";
import { clientApi } from "./services/api";

export async function middleware(request: NextRequest){
    const token = request.cookies.get("beauty-token")?.value
    
    const publicRoutes = ["/login", "/signup"]
    const protectedRoutes = "/dashboard"

    const urlPath = request.nextUrl.pathname

    if(publicRoutes.includes(urlPath)){
        if(token){
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }

    if(urlPath.startsWith(protectedRoutes)){
        if(!token){
            return NextResponse.redirect(new URL("/login", request.url))
        }

        const isValid = await validateToken(token)

        if(!isValid){
            const response = NextResponse.redirect(new URL("/login", request.url))
            response.cookies.delete("beauty-token");

            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/signup", "/dashboard/:path*"]
}

async function validateToken(token: string){
    if (!token) return false;

    try{
        await clientApi.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return true;
        
    } catch(err){
        return false;
    }
}