import Breadcrumbs from "@/components/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import { CirclePlus, Coins, DiscAlbum, FileMusic, Guitar, Receipt, ScanBarcode, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { languages } from "@/data/languages";
import { countries } from "@/data/countries";
import DeleteCollaborator from "@/components/forms/collaborator-delete";
import DeleteRecording from "@/components/forms/recording-delete";
import AudioPlayer from "@/components/audio-player";

export default async function ViewArtist({ params }) {
    try {
        async function getData() {
            const { id } = await params
            const { getToken } = await auth();
            const token = await getToken()
            if (!token) throw new Error("User is not authenticated.")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recordings/${id}`, {
                method: "GET",
                headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                cache: "no-store",
            })
            if (!response.ok) throw new Error("Failed to fetch data.")
            return response.json();
        }
        const recording = await getData()
        const crumbs = [
            { title: "Dashboard", href: "/" },
            { title: "Catalog", href: "/catalog" },
            { title: "Sound Recordings", href: "/catalog/recordings" },
            { title: recording.name, href: `/catalog/recordings/${recording._id}`, currentPage: true },
        ];
        const primaryArtists = recording.collaborators.filter(e => e.role === "Primary Artist")
        const featuredArtists = recording.collaborators.filter(e => e.role === "Featured Artist")
        const remixers = recording.collaborators.filter(e => e.role === "Remixer")
        const songwritersComposers = recording.collaborators.filter(e => (e.role === "Songwriter" || e.role === "Composer"))
        const producers = recording.collaborators.filter(e => (e.role === "Producer"))
        return (
            <>
                <Breadcrumbs crumbs={crumbs} />
                <div className="h-16 border-b flex justify-between items-center pl-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                        {recording.name} {recording.version && `- ${recording.version}`}
                    </h2>
                    <div className="flex items-center gap-3 px-6">
                        <Link href={`/catalog/recordings/${recording._id}/update`}>
                            <Button><SquarePen/>Update Sound Recording</Button>
                        </Link>
                        <Link href={`/catalog/recordings/${recording._id}/collaborators/add`}>
                            <Button variant="outline"><Guitar/>Add Collaborator</Button>
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
                                <DeleteRecording id={recording._id}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <AudioPlayer audioFile={"/adennwav-velour.mp3"}/>
                <div className="h-48 border-b grid grid-cols-2 divide-x">
                    <div className="p-6">
                        Track Title: <span>{recording.name}</span><br/>
                        Mix Version: <span>{recording.version ? recording.version : "Original"}</span><br/>
                        ISRC: <span className="font-mono">{recording.isrc}</span><br/>
                        Country of Recording: <span>{countries.find(e => (e.code === recording.country)).name || "None"}</span><br/>
                        Year of Recording: <span className="font-mono">{recording.year}</span><br/>
                    </div>
                    <div className="p-6">
                        Document ID: <span className="font-mono">{recording._id}</span><br/>
                        Created At: <span className="font-mono">{recording.createdAt}</span><br/>
                        Updated At: <span className="font-mono">{recording.updatedAt}</span>
                    </div>
                </div>
                <div className="h-96 border-b grid grid-cols-2 divide-x">
                    <div className="h-full overflow-y-auto">
                        {recording.collaborators.length > 0 ? (
                            <>
                                {primaryArtists && (
                                    primaryArtists.map((e, i) => (
                                        <div className="h-16 flex items-center justify-between border-b pl-6" key={i}>
                                            <div>
                                                <div>{e.artistId.name}</div>
                                                <div className="text-xs text-gray-500">Primary Artist</div>
                                            </div>
                                            <div>
                                                {e.artistId.dspProfiles.spotify && (
                                                    <Link href={e.artistId.dspProfiles.spotify} target="_blank">
                                                        <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-spotify"></i></Button>
                                                    </Link>
                                                )}
                                                {e.artistId.dspProfiles.appleMusic && (
                                                    <Link href={e.artistId.dspProfiles.appleMusic} target="_blank">
                                                        <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-apple"></i></Button>
                                                    </Link>
                                                )}
                                                <Link href={`/catalog/recordings/${recording._id}/collaborators/${e._id}/update`}>
                                                    <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-pencil-fill"></i></Button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-[63px] w-16 border-l"><i className="bi bi-trash3-fill"></i></Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DeleteCollaborator recordingId={recording._id} collaboratorId={e._id}/>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {featuredArtists && (
                                    featuredArtists.map((e, i) => (
                                        <div className="h-16 flex items-center justify-between border-b pl-6" key={i}>
                                            <div>
                                                <div>{e.artistId.name}</div>
                                                <div className="text-xs text-gray-500">Featured Artist</div>
                                            </div>
                                            <div>
                                                {e.artistId.dspProfiles.spotify && (
                                                    <Link href={e.artistId.dspProfiles.spotify} target="_blank">
                                                        <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-spotify"></i></Button>
                                                    </Link>
                                                )}
                                                {e.artistId.dspProfiles.appleMusic && (
                                                    <Link href={e.artistId.dspProfiles.appleMusic} target="_blank">
                                                        <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-apple"></i></Button>
                                                    </Link>
                                                )}
                                                <Link href={`/catalog/recordings/${recording._id}/collaborators/${e._id}/update`}>
                                                    <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-pencil-fill"></i></Button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-[63px] w-16 border-l"><i className="bi bi-trash3-fill"></i></Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DeleteCollaborator recordingId={recording._id} collaboratorId={e._id}/>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {remixers && (
                                    remixers.map((e, i) => (
                                        <div className="h-16 flex items-center justify-between border-b pl-6" key={i}>
                                            <div>
                                                <div>{e.artistId.name}</div>
                                                <div className="text-xs text-gray-500">Remixer</div>
                                            </div>
                                            <div>
                                                {e.artistId.dspProfiles.spotify && (
                                                    <Link href={e.artistId.dspProfiles.spotify} target="_blank">
                                                        <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-spotify"></i></Button>
                                                    </Link>
                                                )}
                                                {e.artistId.dspProfiles.appleMusic && (
                                                    <Link href={e.artistId.dspProfiles.appleMusic} target="_blank">
                                                        <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-apple"></i></Button>
                                                    </Link>
                                                )}
                                                <Link href={`/catalog/recordings/${recording._id}/collaborators/${e._id}/update`}>
                                                    <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-pencil-fill"></i></Button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-[63px] w-16 border-l"><i className="bi bi-trash3-fill"></i></Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DeleteCollaborator recordingId={recording._id} collaboratorId={e._id}/>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {songwritersComposers && (
                                    songwritersComposers.map((e, i) => (
                                        <div className="h-16 flex items-center justify-between border-b pl-6" key={i}>
                                            <div>
                                                <div>{e.artistId.name}</div>
                                                <div className="text-xs text-gray-500">{e.role}{e.artistId.pro && `, ${e.artistId.pro} ${e.artistId.ipi && `(${e.artistId.ipi})`}`}</div>
                                            </div>
                                            <div>
                                                <Link href={`/catalog/recordings/${recording._id}/collaborators/${e._id}/update`}>
                                                    <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-pencil-fill"></i></Button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-[63px] w-16 border-l"><i className="bi bi-trash3-fill"></i></Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DeleteCollaborator recordingId={recording._id} collaboratorId={e._id}/>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {producers && (
                                    producers.map((e, i) => (
                                        <div className={`h-16 flex items-center justify-between border-b last:h-[63px] pl-6`} key={i}>
                                            <div>
                                                <div>{e.artistId.name}</div>
                                                <div className="text-xs text-gray-500">{e.role}</div>
                                            </div>
                                            <div>
                                                <Link href={`/catalog/recordings/${recording._id}/collaborators/${e._id}/update`}>
                                                    <Button variant="ghost" className="h-[63px] w-16 border-l"><i className="bi bi-pencil-fill"></i></Button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-[63px] w-16 border-l"><i className="bi bi-trash3-fill"></i></Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DeleteCollaborator recordingId={recording._id} collaboratorId={e._id}/>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    ))
                                )} 
                            </>
                        ) : (<div className="p-6">No collaborators...</div>)}
                    </div>
                    <div className="h-full">
                        <div className="border-b h-16 items-center grid grid-cols-2 divide-x">
                            <div className="h-full col-span-1 flex items-center gap-1 px-6">Lyrics Language: <span>{languages.find(e => (e.code === recording.lyrics.language)).name || "None"}</span><br/></div>
                            <div className="h-full col-span-1 flex items-center gap-1 px-6">Contains Explicit Content: <span>{recording.lyrics.explicit ? "Yes" : "No"}</span><br/></div>
                        </div>
                        <div className="h-[319px] overflow-y-auto">
                            <p className="font-sans p-6 whitespace-pre-wrap">{recording.lyrics.text ? recording.lyrics.text : "No lyrics..."}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } catch (err) {
        console.log(err)
        redirect("/catalog/recordings")
    }
}