"use client"

import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const supabase = createClient()
    const router = useRouter()

    const logout = async ()=>{
        await supabase.auth.signOut()
        router.push("/login")
    }

    return (
        <div className="flex justify-between p-4 bg-white shadow">
            <h1 className="font-bold text-black">Smart BookMark</h1>
            <button onClick={logout} className="text-red-500 cursor-pointer">Logout</button>
        </div>
    )
}