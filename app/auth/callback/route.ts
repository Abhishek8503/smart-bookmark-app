import { createServerClient } from "@supabase/ssr";
import { getServerSupabase } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const supabase = await getServerSupabase()

    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if(code){
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(new URL("/dashboard", request.url))
}