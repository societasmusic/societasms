import Breadcrumbs from "@/components/app-breadcrumbs"
import AppForm from "@/components/app-form"
import { countries } from "@/data/countries"
import { genres } from "@/data/genres"
import { languages } from "@/data/languages"
import { auth } from "@clerk/nextjs/server"
import { Info } from "lucide-react"
import { redirect } from "next/navigation"

export default async function UpdateSoundRecording({ params }) {
    const { id } = await params
    try {
        async function getData() {
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
        const recording = await getData() 
        const crumbs = [
            { title: "Dashboard", href: "/" },
            { title: "Catalog", href: "/catalog" },
            { title: "Sound Recordings", href: "/catalog/recordings" },
            { title: recording.name, href: `/catalog/recordings/${recording._id}` },
            { title: "Update Sound Recording", href: `/catalog/recordings/${recording._id}/update`, currentPage: true },
        ]
        const formModel = [
            {
                checked: true,
                description: "This is the title that will appear in stores",
                disabled: false,
                label: "Track Title",
                name: "name",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: recording.name,
                variant: "Input",
                colSpan: 6,
                options: [],
            },
            {
                checked: true,
                description: "Indicates the mix version of the recording",
                disabled: false,
                label: "Mix Version",
                name: "version",
                placeholder: "Remastered 2025...",
                required: false,
                rowIndex: 0,
                type: "",
                value: recording.version,
                variant: "Input",
                colSpan: 6,
                options: [],
            },
            {
                checked: true,
                description: "",
                disabled: true,
                label: "ISRC",
                name: "isrc",
                placeholder: "",
                required: false,
                rowIndex: 0,
                type: "isrc",
                value: recording.isrc,
                variant: "Input",
                colSpan: 12,
                options: [],
            },
            {
                checked: true,
                description: "Country the recording was created",
                disabled: false,
                label: "Country of Recording",
                name: "country",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: recording.country,
                variant: "Combobox",
                colSpan: 6,
                options: countries,
            },
            {
                checked: true,
                description: "Year the recording was created",
                disabled: false,
                label: "Year of Recording",
                name: "year",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "number",
                value: recording.year,
                variant: "Input",
                colSpan: 6,
                options: [],
            },
            {
                checked: true,
                description: "Primary genre of the recording",
                disabled: false,
                label: "Primary Genre",
                name: "genrePrimary",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: recording.genre.primary,
                variant: "Combobox",
                colSpan: 6,
                options: genres,
            },
            {
                checked: true,
                description: "Secondary genre of the recording",
                disabled: false,
                label: "Secondary Genre",
                name: "genreSecondary",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: recording.genre.secondary,
                variant: "Input",
                colSpan: 6,
                options: [],
            },
            {
                checked: true,
                description: "Language of the recording (or specify instrumental)",
                disabled: false,
                label: "Language",
                name: "language",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: recording.lyrics.language,
                variant: "Combobox",
                colSpan: 6,
                options: languages,
            },
            {
                checked: true,
                description: "Indicates whether this recording contains explicit lyrics",
                disabled: false,
                label: "Contains Explicit Content",
                name: "explicit",
                placeholder: "",
                required: true,
                rowIndex: 0,
                type: "",
                value: recording.lyrics.explicit ? "yes" : "no",
                variant: "Combobox",
                colSpan: 6,
                options: [{"name":"Yes","code":"yes"},{"name":"No","code": "no"}],
            },
            {
                checked: true,
                description: "Full text of song lyrics",
                disabled: false,
                label: "Lyrics",
                name: "lyrics",
                placeholder: "",
                required: false,
                rowIndex: 0,
                type: "",
                value: recording.lyrics.text,
                variant: "Textarea",
                colSpan: 12,
                options: [],
            },
        ]
        return (
            <>
                <Breadcrumbs crumbs={crumbs}/>
                <div className="h-16 border-b flex justify-between items-center pl-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Update Sound Recording</h2>
                </div>
                <div className="bg-blue-500/10 border-b border-blue-500/20 h-16 px-6 flex items-center gap-3 text-blue-500">
                    <Info size={18}/>
                    <span>You may not edit the ISRC code after it has been assigned.</span>
                </div>
                <AppForm model={formModel} api={`/api/recordings/${id}/update`} method="PUT" redirectPath={`/catalog/recordings/${id}`} formPath={`/catalog/recordings/${id}/update`}/>
            </>
        )
    } catch (err) {
        console.log(err)
        redirect(`/catalog/recordings/${id}`)
    }
}