"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabaseClient"

export default function AddBookmarkForm() {
    const supabase = createClient()
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if (!title.trim() || !url.trim()) return
        setLoading(true)

        let formattedUrl = url.trim()

        if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
            formattedUrl = `https://${formattedUrl}`
        }
        
        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

        if(!regex.test(formattedUrl)){
            alert("Please enter a valid URL.")
            setLoading(false)
            return
        }

        const {
            data: {user},
            error: useError,
        } = await supabase.auth.getUser()

        if(useError || !user) {
            console.error("User Not Authenticated")
            setLoading(false)
            return
        }

        const { error } = await supabase.from("bookmarks").insert({
            title: title.trim(),
            url: formattedUrl,
            user_id: user.id,
        })

        if(error) {
            console.error("Insert Failed.", error.message)
            setLoading(false)
            return
        }
        setTitle("")
        setUrl("")
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full p-2 border rounded" 
            />

            <input type="text"
            value={url}
            onChange={(e)=> setUrl(e.target.value)}
            placeholder="URL"
            required
            className="w-full p-2 border rounded"
            />

            <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
                {loading? "Adding": "Add Bookmark"}
            </button>
        </form>
    )
}