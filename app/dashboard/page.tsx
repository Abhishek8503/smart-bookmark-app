import Navbar from "@/components/Navbar";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import { getServerSupabase } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await getServerSupabase()

    const { data: {session}, } = await supabase.auth.getSession()

    if(!session) {
        redirect("/login")
    }
    
    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto mt-6 p-4">
                <AddBookmarkForm />
                <BookmarkList />
            </div>
        </div>
    )
}