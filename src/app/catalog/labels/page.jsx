import Breadcrumbs from "@/components/app-breadcrumbs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, CirclePlus, Trash2 } from "lucide-react"
import { columns } from "./column"
import { DataTable } from "@/components/data-table"
import Link from "next/link"

export default function RecordLabels() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "Catalog", href: "/catalog" },
        { title: "Record Labels", href: "/catalog/labels", currentPage: true },
    ]
    const data = [
        {name: "Azure Vision Records"},
        {name: "Societas Music Group"}
    ]
    return (
        <>
            <Breadcrumbs crumbs={crumbs}/>
            <div className="h-16 border-b flex justify-between items-center pl-6">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Record Labels</h2>
                <div className="flex items-center gap-3 px-6">
                    <Link href="/catalog/labels/create"><Button><CirclePlus/>Create New Record Label</Button></Link>
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button className="z-[999]">Bulk Actions<ChevronDown/></Button></DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-popper-anchor-width] p-0 relative top-[-4px]">
                            <DropdownMenuItem className="px-4 py-3"><Trash2/>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>
            </div>
            <div className="">  
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}