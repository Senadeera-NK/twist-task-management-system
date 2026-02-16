import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const token =request.cookies.get('access_token');

    //when user trying to access dashboard without a token, go to login
    if(!token && request.nextUrl.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}