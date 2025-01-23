import { Bookmark as BookmarkIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Bookmark() {
    return (
        <Button variant="ghost" className="rounded-none h-16 w-12" size="icon">
            <BookmarkIcon/>
        </Button>
    )
}