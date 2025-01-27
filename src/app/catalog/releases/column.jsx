"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Disc3, FileMusic, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

export const columns = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-[63px] w-full flex justify-between px-6">
                    <span>TITLE</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const release = row.original
            const artists = release.artists
            return (
                <div className="flex gap-3 items-center">
                    <div className="bg-blue-500/10 text-blue-500 h-10 w-10 flex items-center justify-center">
                        <FileMusic/>
                    </div>  
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div>
                                {release.name}
                                {release.version && ` - ${release.version}`}
                            </div>
                        </div>
                        <div className="text-gray-500 text-xs">{artists.map(e => e.artistId.name).join(", ")}</div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "isrc",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-[63px] w-full flex justify-between px-6">
                    <span>UPC</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => { return (<span className="font-mono">{row.original.upc}</span>) }
    },
    {
        id: "actions",
        header: () => {
            return (<div className="px-6">ACTIONS</div>)
        },
        cell: ({ row }) => {
            const release = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(release._id)}>
                            Copy release ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/catalog/releases/${release._id}`}>
                            <DropdownMenuItem className="cursor-pointer">View release</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
