import Breadcrumbs from "@/components/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    const crumbs = [
        { title: "Dashboard", href: "/" },
        { title: "404", href: "/", currentPage: true },
    ]
    return (
        <>
            <Breadcrumbs crumbs={crumbs}/>
            <div className="flex items-center justify-center grow">
                <div className="text-center mb-16">
                    <h1 className="scroll-m-20 text-8xl font-extrabold tracking-tight text-gray-500/50 font-mono">404</h1>
                </div>
            </div>
        </>
    )
}