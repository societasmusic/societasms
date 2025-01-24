"use client"

import Breadcrumbs from "@/components/app-breadcrumbs"
import CreateLabel from "@/components/forms/create-label"
import { Info } from "lucide-react"

export default function CreateArtist() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "Catalog", href: "/catalog" },
        { title: "Artists", href: "/catalog/artists" },
        { title: "Create Artist", href: "/catalog/artists/create", currentPage: true },
    ]
    return (
        <>
            <Breadcrumbs crumbs={crumbs}/>
            <div className="h-16 border-b flex justify-between items-center pl-6">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Create New Artist</h2>
            </div>
            {/* <div className="bg-blue-500/10 border-b border-blue-500/20 h-16 px-6 flex items-center gap-3 text-blue-500">
                <Info size={18}/>
                <span>Record label names may not be edited after they are associated with a release.</span>
            </div> */}
            {/* <CreateLabel/> */}
        </>
    )
}