import Link from "next/link";
import Bookmark from "./bookmark";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "./ui/button";
import { CircleHelp } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
    return (
        <div className="border-b flex justify-center px-3">
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex gap-3 items-center">
                    <Image src="/logo-blue.png" height={24} width="24" alt="Societas Music Group logo"/>
                    <span className="font-bold">Societas Music Group</span>
                </Link>
                <div className="flex items-center text-gray-500">
                    <Link href="https://societasmusic.gitbook.io/helpdesk" target="_blank">
                        <Button variant="ghost" className="rounded-none p-6" size="icon"><CircleHelp/></Button>
                    </Link>
                    <Bookmark/>
                    <ThemeSwitcher/>
                    <Button variant="ghost" className="rounded-none p-6 text-xs" size="icon">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src="/"/>
                            <AvatarFallback>AO</AvatarFallback>
                        </Avatar>
                    </Button>
                </div>
            </div>
        </div>
    )
}