"use client"

import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
    const supabase = createClient()
    const router = useRouter()

    useEffect(()=>{
        const checkSession = async ()=>{
            const { data } = await supabase.auth.getSession()

            if(data.session){
                router.replace("/dashboard")
            }
        }
        checkSession()
    },[])

    const handleLogin = async ()=> {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer">
                Sign In With Google
            </button>

        </div>
    )
}