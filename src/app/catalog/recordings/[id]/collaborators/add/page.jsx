import Breadcrumbs from "@/components/app-breadcrumbs"
import AppForm from "@/components/app-form"
import { collaboratorRoles } from "@/data/collaboratorRoles";
import { auth } from "@clerk/nextjs/server";

export default async function AddCollaborator({ params }) {
    try {
        async function getData() {
            const { id } = await params
            const { getToken } = await auth();
            const token = await getToken()
            if (!token) throw new Error("User is not authenticated.")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recordings/${id}`, {
                method: "GET",
                headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                cache: "no-store",
            })
            if (!response.ok) throw new Error("Failed to fetch data.")
            return response.json();
        }
        async function getArtists() {
            const { getToken } = await auth();
            const token = await getToken()
            if (!token) throw new Error("User is not authenticated.")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artists`, {
                method: "GET",
                headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                cache: "no-store",
            })
            if (!response.ok) throw new Error("Failed to fetch data.")
            return response.json();
        }
        const recording = await getData() 
        const artists = (await getArtists()).map(e => ({name: e.name, code: e._id}))
        const crumbs = [
            { title: "Dashboard", href: "/" },
            { title: "Catalog", href: "/catalog" },
            { title: "Sound Recordings", href: "/catalog/recordings" },
            { title: recording.name, href: `/catalog/recordings/${recording._id}` },
            { title: "Add Collaborator", href: `/catalog/recordings/${recording._id}/collaborators/add`, currentPage: true },
        ]
        const formModel = [
            {
                checked: true,
                description: "Select the collaborating artist",
                disabled: false,
                label: "Artist Name",
                name: "artistId",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: "",
                variant: "Combobox",
                colSpan: 6,
                options: artists,
            },
            {
                checked: true,
                description: "Indicates the role of the collaborator",
                disabled: false,
                label: "Collaborator Role",
                name: "role",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: "",
                variant: "Combobox",
                colSpan: 6,
                options: collaboratorRoles,
            },
        ]
        return (
            <>
                <Breadcrumbs crumbs={crumbs}/>
                <div className="h-16 border-b flex justify-between items-center pl-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Add Collaborator</h2>
                </div>
                <AppForm model={formModel} api={`/api/recordings/${recording._id}/collaborators/add`} method="POST" redirectPath={`/catalog/recordings/${recording._id}`} formPath={`/catalog/recordings/${recording._id}/collaborators/add`}/>
            </>
        )
    } catch (err) {
        console.log(err)
        redirect(`/catalog/recordings/${recording._id}`)
    }
}