"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabaseClient"

export default function Home() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(()=>{
    const checkUser = async ()=> {
      const { data } = await supabase.auth.getSession()

      if(data.session){
        router.push("/dashboard")
      }
      else{
        router.push("/login")
      }
    }
    
    checkUser()
  },[])

  return null
}