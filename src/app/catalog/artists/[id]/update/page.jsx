import Breadcrumbs from "@/components/app-breadcrumbs"
import UpdateLabel from "@/components/forms/update-label"
import { Info } from "lucide-react"
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function UpdateRecordLabel({ params }) {
    try {
        async function getData() {
            const { id } = await params
            const { getToken } = await auth();
            const token = await getToken()
            if (!token) throw new Error("User is not authenticated.")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/labels/${id}`, {
                method: "GET",
                headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                cache: "no-store",
            })
            if (!response.ok) throw new Error("Failed to fetch data.")
            return response.json();
        }
        const recordlabel = await getData()
        const crumbs = [
            { title: "Dashboard", href: "/" },
            { title: "Catalog", href: "/catalog" },
            { title: "Record Labels", href: "/catalog/labels" },
            { title: recordlabel.name, href: `/catalog/labels/${recordlabel._id}` },
            { title: "Update Record Label", href: `/catalog/labels/${recordlabel._id}/update`, currentPage: true },
        ];
        return (
            <>
                <Breadcrumbs crumbs={crumbs}/>
                <div className="h-16 border-b flex justify-between items-center pl-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Update Record Label</h2>
                </div>
                <div className="bg-blue-500/10 border-b border-blue-500/20 h-16 px-6 flex items-center gap-3 text-blue-500">
                    <Info size={18}/>
                    <span>Record label names may not be edited after they are associated with a release.</span>
                </div>
                <UpdateLabel props={recordlabel}/>
            </>
        )
    } catch (err) {
        redirect(`/catalog/labels`)
    }
}