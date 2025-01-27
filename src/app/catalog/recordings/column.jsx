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
            const recording = row.original
            const primaryArtists = recording.collaborators.filter(e => e.role === "Primary Artist")
            const featuredArtists = recording.collaborators.filter(e => e.role === "Featured Artist")
            return (
                <div className="flex gap-3 items-center">
                    <div className="bg-blue-500/10 text-blue-500 h-10 w-10 flex items-center justify-center">
                        <FileMusic/>
                    </div>  
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div>
                                {recording.name}
                                {featuredArtists.length > 0 && ` (Ft. ${featuredArtists.map(e => e.artistId.name).join(", ")})`}
                                {recording.version && ` - ${recording.version}`}
                            </div>
                            <div>
                                {recording.lyrics.explicit && <i className="bi bi-explicit-fill"></i>}
                            </div>
                        </div>
                        <div className="text-gray-500 text-xs">{primaryArtists.map(e => e.artistId.name).join(", ")}</div>
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
                    <span>ISRC</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => { return (<span className="font-mono">{row.original.isrc}</span>) }
    },
    {
        id: "actions",
        header: () => {
            return (<div className="px-6">ACTIONS</div>)
        },
        cell: ({ row }) => {
            const recording = row.original
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(recording._id)}>
                            Copy sound recording ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/catalog/recordings/${recording._id}`}>
                            <DropdownMenuItem className="cursor-pointer">View sound recording</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
