import { Bookmark as BookmarkIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Bookmark() {
    return (
        <Button variant="ghost" className="rounded-none p-6" size="icon">
            <BookmarkIcon/>
        </Button>
    )
}