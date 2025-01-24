"use client"

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export function DataTable({
  columns,
  data,
}) {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters },
    })

  return (
    <div>
        <div className="h-16 border-b flex justify-between">
            <Input
                placeholder={`Search (${data.length}) documents...`}
                value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="shadow-none border-none h-16 px-6 z-[999]"
            />
            <div className="flex">
                <Button variant="outline" className="h-[63px] border-0 shadow-none px-6 border-l" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft/>
                </Button>
                <Button variant="outline" className="h-[63px] border-0 shadow-none px-6 border-l" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ChevronRight/>
                </Button>
            </div>
        </div>
        <Table className="border-b">
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="h-[63px]">
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id} className="p-0 border-r border-dashed last:border-0">
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-16"
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 border-r border-dashed last:border-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    </div>
  )
}
