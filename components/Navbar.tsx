"use client"

import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
    const supabase = createClient()
    const [email, setEmail] = useState("")
    const router = useRouter()

    useEffect(()=>{
        const getUser = async ()=>{
            const { data: { user }, } = await supabase.auth.getUser()

            if(user) {
                setEmail(user.email ?? "")
            }
        }
        getUser()
    },[])

    const logout = async ()=>{
        await supabase.auth.signOut()
        router.push("/login")
    }

    return (
        <div className="flex justify-between p-4 bg-white shadow">
            <div className="flex flex-col">
                <h1 className="font-bold text-black">Smart BookMark</h1>
                <span className="text-black">{email}</span>
            </div>
            <button onClick={logout} className="text-red-500 cursor-pointer">Logout</button>
        </div>
    )
}