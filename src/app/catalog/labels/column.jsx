"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Disc3, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

export const columns = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-[63px] w-full flex justify-between px-6">
                    <span>NAME</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const label = row.original
            return (
                <div className="flex gap-3 items-center">
                    <div className="bg-blue-500/10 text-blue-500 h-10 w-10 flex items-center justify-center">
                        <Disc3/>
                    </div>  
                    {label.name}
                </div>
            )
        }
    },
    {
        accessorKey: "_id",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="h-[63px] w-full flex justify-between px-6">
                    <span>ID</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const label = row.original
            return (<span className="font-mono">208376</span>)
        }
    },
    {
        id: "actions",
        header: () => {
            return (<div className="pl-6">ACTIONS</div>)
        },
        cell: ({ row }) => {
            const payment = row.original
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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
