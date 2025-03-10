import Breadcrumbs from "@/components/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { columns } from "./column";
import { DataTable } from "@/components/data-table";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

async function getData() {
    const { getToken } = await auth();
    const token = await getToken()
    if (!token) throw new Error("User is not authenticated.")
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/labels`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        cache: "no-store",
    })
    if (!response.ok) throw new Error("Failed to fetch data.")
    return response.json();
}

export default async function RecordLabels() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "Catalog", href: "/catalog" },
        { title: "Record Labels", href: "/catalog/labels", currentPage: true },
    ];
    const data = await getData();
    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
            <div className="h-16 border-b flex justify-between items-center pl-6">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Record Labels
                </h2>
                <div className="flex items-center gap-3 px-6">
                    <Link href="/catalog/labels/create">
                        <Button>
                            <CirclePlus />
                            Create New Record Label
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                <DataTable columns={columns} data={data} />
            </div>
        </>
    );
}
