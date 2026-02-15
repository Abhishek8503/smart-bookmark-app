"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabaseClient"
import { Bookmark } from "@/types/bookmark"
import BookmarkItem from "./BookmarkItem"

export default function BookmarkList() {
    const supabase = createClient()
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        fetchBookMarks()

        // In the supabase I don't have access to replicate the database to the warehouse making it so I cannot update in real time. But the alternate solution for this is the interval I have set where every 2 seconds, it'll update the page by polling. With this even if we add any bookmark in the 2nd tab, it'll be displayed instantly in both tabs.

        const channel = supabase.channel("bookmarks-realtime").on("postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "bookmarks",
            },
            ()=>{
                fetchBookMarks()
            }
        )
        .subscribe((status) => {
            console.log("Realtime status:", status)
        })

        // const interval = setInterval(() => {
        //     fetchBookMarks()
        // }, 2000);

        // return ()=> clearInterval(interval)

        return ()=> {
            supabase.removeChannel(channel)
        }
    },[])

    const fetchBookMarks = async ()=>{
        const { data, error} = await supabase.from("bookmarks").select("*").order("created_at", {ascending: false})

        if(error) {
            console.error("Fetch failed:", error.message)
        } else if(data) {
            setBookmarks(data)
        }
        setLoading(false)
    }

    if(loading){
        return <p className="mt-6 text-center">Loading...</p>
    }

    return (
        <div className="space-y-3 mt-6">
            {bookmarks.map((bookmark)=>(
                <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            ))}
        </div>
    )

}