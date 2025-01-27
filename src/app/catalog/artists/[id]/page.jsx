import Breadcrumbs from "@/components/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import { CirclePlus, Coins, DiscAlbum, FileMusic, Receipt, ScanBarcode, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DeleteArtist from "@/components/forms/delete-artist";

export default async function ViewArtist({ params }) {
    try {
        async function getData() {
            const { id } = await params
            const { getToken } = await auth();
            const token = await getToken()
            if (!token) throw new Error("User is not authenticated.")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/artists/${id}`, {
                method: "GET",
                headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                cache: "no-store",
            })
            if (!response.ok) throw new Error("Failed to fetch data.")
            return response.json();
        }
        const artist = await getData()
        const crumbs = [
            { title: "Dashboard", href: "/" },
            { title: "Catalog", href: "/catalog" },
            { title: "Artists", href: "/catalog/artists" },
            { title: artist.name, href: `/catalog/artists/${artist._id}`, currentPage: true },
        ];
        return (
            <>
                <Breadcrumbs crumbs={crumbs} />
                <div className="h-16 border-b flex justify-between items-center pl-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                        {artist.name}
                    </h2>
                    <div className="flex items-center gap-3 px-6">
                        <Link href={`/catalog/artists/${artist._id}/update`}>
                            <Button><SquarePen/>Update Artist</Button>
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
                                <DeleteArtist id={artist._id}/>
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
                        Artist Name: <span>{artist.name}</span><br/>
                        PRO Affiliation: <span>{artist.pro ? artist.pro : "None"}</span><br/>
                        IPI: <span className="font-mono">{artist.ipi ? artist.ipi : "None"}</span><br/>
                        ISNI: <span className="font-mono">{artist.isni ? artist.isni : "None"}</span><br/>
                    </div>
                    <div className="p-6">
                        Document ID: <span className="font-mono">{artist._id}</span><br/>
                        Created At: <span className="font-mono">{artist.createdAt}</span><br/>
                        Updated At: <span className="font-mono">{artist.updatedAt}</span>
                    </div>
                </div>
                {(artist.dspProfiles.spotify || artist.dspProfiles.appleMusic) && (
                    <div className="h-16 border-b">
                        {artist.dspProfiles.spotify && (
                            <Link href={artist.dspProfiles.spotify} target="_blank">
                                <Button variant="ghost" size="icon" style={{fontSize: 1 + "rem"}} className="h-16 w-16 border-r"><i className="bi bi-spotify"></i></Button>
                            </Link>
                        )}
                        {artist.dspProfiles.appleMusic && (
                            <Link href={artist.dspProfiles.appleMusic} target="_blank">
                                <Button variant="ghost" size="icon" style={{fontSize: 1 + "rem"}} className="h-16 w-16 border-r"><i className="bi bi-apple"></i></Button>
                            </Link>
                        )}
                    </div>
                )}
            </>
        );
    } catch (err) {
        console.log(err)
        redirect("/catalog/artists")
    }
}