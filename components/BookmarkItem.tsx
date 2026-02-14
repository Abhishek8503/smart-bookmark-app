"use client"

import { Bookmark } from "@/types/bookmark"
import { createClient } from "@/lib/supabaseClient"

export default function BookmarkItem({
    bookmark,
}: {
    bookmark: Bookmark
}) {
    const supabase = createClient()

    const handleDelete = async ()=>{
        const { error } = await supabase.from("bookmarks").delete().eq("id", bookmark.id)

        if(error) {
            console.error("Delete Failed." ,error.message)
        }
    }

    return (
        <div className="flex justify-between bg-white p-3 rounded shadow">
            <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 cursor-pointer"
            >
                {bookmark.title}
            </a>

            <button onClick={handleDelete} className="text-red-500 cursor-pointer">
                Delete
            </button>
        </div>
    )
}