import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const sessionId = req.cookies.get("sessionId")?.value;
    const pathName = req.nextUrl.pathname;

    if (pathName === "/login" && sessionId) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if (pathName !== "/login" && !sessionId) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
