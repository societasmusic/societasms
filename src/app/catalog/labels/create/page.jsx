import Breadcrumbs from "@/components/app-breadcrumbs"

export default function CreateNewRecordLabel() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "Catalog", href: "/catalog" },
        { title: "Record Labels", href: "/catalog/labels" },
        { title: "Create New Record Label", href: "/catalog/labels/create", currentPage: true },
    ]
    return (
        <>
            <Breadcrumbs crumbs={crumbs}/>
            <div className="h-16 border-b flex justify-between items-center pl-6">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Create New Record Label</h2>
            </div>
        </>
    )
}