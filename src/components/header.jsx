import Link from "next/link";
import Bookmark from "./bookmark";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "./ui/button";
import { CircleHelp, Github, Home } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

export default function Header() {
    return (
        <div className="border-b flex justify-between h-16">
            <div className="flex items-center gap-4">
                <SidebarTrigger variant="ghost" className="text-gray-500 rounded-none h-16 w-16 border-r" size="icon"/>
                {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <Link href="/" className="flex gap-3 items-center">
                    <Image src="/logo-blue.png" height={32} width={32} alt="Societas Music Group logo"/>
                    <span className="font-bold">Societas Music Group</span>
                </Link>
            </div>
            <div className="flex items-center text-gray-500">
                <Link href="https://societasmusic.gitbook.io/helpdesk" target="_blank">
                    <Button variant="ghost" className="rounded-none h-16 w-12" size="icon"><CircleHelp/></Button>
                </Link>
                <Link href="https://github.com/societasmusic/societasms" target="_blank">
                    <Button variant="ghost" className="rounded-none h-16 w-12" size="icon"><Github/></Button>
                </Link>
                <Bookmark/>
                <ThemeSwitcher/>
                <Link href="/">
                    <Button variant="ghost" className="rounded-none h-16 w-16 border-l" size="icon"><Home/></Button>
                </Link>
            </div>
        </div>
    )
}