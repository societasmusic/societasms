import Breadcrumbs from "@/components/app-breadcrumbs"
import MenuCards from "@/components/menu-cards"
import { Button } from "@/components/ui/button"
import { Disc3, DiscAlbum, FileMusic, Guitar } from "lucide-react"

export default function Catalog() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "Catalog", href: "/catalog", currentPage: true },
    ]
    const cards = [
        { href: "/catalog/labels", icon: Disc3, title: "Record Labels", description: "Manage your inventory, create new releases, request updates, and manage metadata."},
        { href: "/catalog/artists", icon: Guitar, title: "Artists", description: "Manage your inventory, create new releases, request updates, and manage metadata."},
        { href: "/catalog/recordings", icon: FileMusic, title: "Sound Recordings", description: "Manage your inventory, create new releases, request updates, and manage metadata."},
        { href: "/catalog/releases", icon: DiscAlbum, title: "Releases", description: "Manage your inventory, create new releases, request updates, and manage metadata."},
    ]
    return (
        <>  
            <div className="flex">
                <div className="grow">
                    <Breadcrumbs crumbs={crumbs}/>
                </div>
                {/* <div className="h-16 border-b flex items-center px-6">
                    <Button>Create</Button>
                </div> */}
            </div>
            <div className="p-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    <MenuCards cards={cards}/>
                </div>
            </div>
        </>
    )
}