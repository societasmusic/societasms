import Breadcrumbs from "@/components/app-breadcrumbs"
import AppForm from "@/components/app-form"
import { countries } from "@/data/countries"
import { genres } from "@/data/genres"
import { languages } from "@/data/languages"
import { Info } from "lucide-react"

export default function CreateNewSoundRecording() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "Catalog", href: "/catalog" },
        { title: "Releases", href: "/catalog/releases" },
        { title: "Create Release", href: "/catalog/releases/create", currentPage: true },
    ]
    const formModel = [
        {
            checked: true,
            description: "This is the title that will appear in stores",
            disabled: false,
            label: "Release Title",
            name: "name",
            placeholder: "",
            required: true,
            rowIndex: 0,
            type: "",
            value: "",
            variant: "Input",
            colSpan: 6,
            options: [],
        },
        {
            checked: true,
            description: "Indicates the version of the release",
            disabled: false,
            label: "Release Version",
            name: "version",
            placeholder: "Remastered 2025...",
            required: false,
            rowIndex: 0,
            type: "",
            value: "",
            variant: "Input",
            colSpan: 6,
            options: [],
        },
        {
            checked: true,
            description: "One will be generated for you if left blank",
            disabled: false,
            label: "Custom UPC",
            name: "upc",
            placeholder: "",
            required: false,
            rowIndex: 0,
            type: "",
            value: "",
            variant: "Input",
            colSpan: 12,
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
            value: "",
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
            value: "",
            variant: "Input",
            colSpan: 6,
            options: [],
        },
    ]
    return (
        <>
            <Breadcrumbs crumbs={crumbs}/>
            <div className="h-16 border-b flex justify-between items-center pl-6">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Create New Release</h2>
            </div>
            <div className="bg-blue-500/10 border-b border-blue-500/20 h-16 px-6 flex items-center gap-3 text-blue-500">
                <Info size={18}/>
                <span>You may not edit the UPC code after it has been assigned.</span>
            </div>
            <AppForm model={formModel} api="/api/releases/create" method="POST" redirectPath="/catalog/releases" formPath="/catalog/releases/create"/>
        </>
    )
}