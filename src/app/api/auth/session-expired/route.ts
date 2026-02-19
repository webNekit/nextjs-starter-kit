import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/shared/auth/cookies";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    
    cookieStore.delete(COOKIE_NAMES.ACCESS);
    cookieStore.delete(COOKIE_NAMES.REFRESH);

    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("error", "session_expired");

    return NextResponse.redirect(loginUrl);
}