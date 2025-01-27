import Breadcrumbs from "@/components/app-breadcrumbs"
import UpdateArtist from "@/components/forms/update-artist"
import { Info } from "lucide-react"
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function UpdateArtistView({ params }) {
    try {
        async function getData() {
            const { id } = await params
            const { getToken } = await auth();
            const token = await getToken()
            if (!token) throw new Error("User is not authenticated.")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artists/${id}`, {
                method: "GET",
                headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                cache: "no-store",
            })
            if (!response.ok) throw new Error("Failed to fetch data.")
            return response.json();
        }
        const artist = await getData()
        const crumbs = [
            { title: "Dashboard", href: "/" },
            { title: "Catalog", href: "/catalog" },
            { title: "Artists", href: "/catalog/artists" },
            { title: artist.name, href: `/catalog/artists/${artist._id}` },
            { title: "Update Artists", href: `/catalog/artists/${artist._id}/update`, currentPage: true },
        ];
        return (
            <>
                <Breadcrumbs crumbs={crumbs}/>
                <div className="h-16 border-b flex justify-between items-center pl-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Update Artist</h2>
                </div>
                <UpdateArtist props={artist}/>
            </>
        )
    } catch (err) {
        redirect(`/catalog/artists`)
    }
}