import Breadcrumbs from "@/components/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import { CirclePlus, Coins, DiscAlbum, FileMusic, Receipt, ScanBarcode, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DeleteLabel from "@/components/forms/delete-label";

export default async function ViewRecordLabel({ params }) {
    try {
        async function getData() {
            const { id } = await params
            const { getToken } = await auth();
            const token = await getToken()
            if (!token) throw new Error("User is not authenticated.")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/labels/${id}`, {
                method: "GET",
                headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                cache: "no-store",
            })
            if (!response.ok) throw new Error("Failed to fetch data.")
            return response.json();
        }
        const recordlabel = await getData()
        const crumbs = [
            { title: "Dashboard", href: "/" },
            { title: "Catalog", href: "/catalog" },
            { title: "Record Labels", href: "/catalog/labels" },
            { title: recordlabel.name, href: `/catalog/labels/${recordlabel._id}`, currentPage: true },
        ];
        return (
            <>
                <Breadcrumbs crumbs={crumbs} />
                <div className="h-16 border-b flex justify-between items-center pl-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                        {recordlabel.name}
                    </h2>
                    <div className="flex items-center gap-3 px-6">
                        <Link href={`/catalog/labels/${recordlabel._id}/update`}>
                            <Button>
                                <SquarePen/>
                                Update Record Label
                            </Button>
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive"><Trash2/>Delete</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <DeleteLabel id={recordlabel._id}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="border-b grid grid-cols-4 divide-x">
                    <div className="p-6 flex gap-3 justify-between items-center col-span-2 xl:col-span-1 h-[127px]">
                        <div>
                            <h3 className="font-bold text-3xl">0</h3>
                            <p>Releases</p>
                        </div>
                        <div className="h-16 w-16 flex items-center justify-center bg-blue-500/15 text-blue-500"><DiscAlbum size={28}/></div>
                    </div>
                    <div className="p-6 flex gap-3 justify-between items-center col-span-2 xl:col-span-1 h-[127px]">
                        <div>
                            <h3 className="font-bold text-3xl">0</h3>
                            <p>Sound Recordings</p>
                        </div>
                        <div className="h-16 w-16 flex items-center justify-center bg-orange-500/15 text-orange-500"><FileMusic size={28}/></div>
                    </div>
                    <div className="p-6 flex gap-3 justify-between items-center col-span-2 xl:col-span-1 h-[127px]">
                        <div>
                            <h3 className="font-bold text-3xl">$0.00</h3>
                            <p>Total Sales</p>
                        </div>
                        <div className="h-16 w-16 flex items-center justify-center bg-green-500/15 text-green-500"><Receipt size={28}/></div>
                    </div>
                    <div className="p-6 flex gap-3 justify-between items-center col-span-2 xl:col-span-1 h-[127px]">
                        <div>
                            <h3 className="font-bold text-3xl">$0.00</h3>
                            <p>Total Expenses</p>
                        </div>
                        <div className="h-16 w-16 flex items-center justify-center bg-red-500/15 text-red-500"><ScanBarcode size={28}/></div>
                    </div>
                </div>
                <div className="h-48 border-b grid grid-cols-2 divide-x">
                    <div className="p-6">
                        Record Label Name: <span>{recordlabel.name}</span><br/>
                        DDEX DPID: <span className="font-mono">{recordlabel.dpid ? recordlabel.dpid : "None"}</span><br/>
                        ISNI: <span className="font-mono">{recordlabel.isni ? recordlabel.isni : "None"}</span>
                    </div>
                    <div className="p-6">
                        Document ID: <span className="font-mono">{recordlabel._id}</span><br/>
                        Created At: <span className="font-mono">{recordlabel.createdAt}</span><br/>
                        Updated At: <span className="font-mono">{recordlabel.updatedAt}</span>
                    </div>
                </div>
            </>
        );
    } catch (err) {
        redirect("/catalog/labels")
    }
}