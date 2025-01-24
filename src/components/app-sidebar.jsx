"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Box, ChevronDown, ChevronsUpDown, CircleUserRound, CodeXml, Home, LogOut, Receipt, Scale, Settings, UsersRound } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
   
export function AppSidebar(props) {
    const pathname = usePathname();
    return (
        <Sidebar>
            <SidebarHeader className="p-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="border-b h-16 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-none px-3">
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarImage src={props.avatar} alt={props.username} />
                                    <AvatarFallback className="rounded-full">{props.username.slice(0,1)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{props.username}</span>
                                    <span className="truncate text-xs">{props.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[255px] border-x-0 border-b-0 rounded-none p-0 shadow-none relative top-[-5px]">
                                <Link href="/account">
                                    <DropdownMenuItem className="cursor-pointer rounded-none h-16 px-4 border-b"><CircleUserRound/>My Account</DropdownMenuItem>
                                </Link>
                                <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>
                                    <DropdownMenuItem className="cursor-pointer rounded-none h-16 px-4 border-b">
                                        <LogOut/>Logout
                                    </DropdownMenuItem>
                                </SignOutButton>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="p-0">
                    {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-0">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`h-16 px-4 border-b ${pathname === "/" && "bg-blue-500/10"}`}><Link href="/"><Home/><span>Dashboard</span></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`h-16 px-4 border-b ${pathname.startsWith("/catalog") && "bg-blue-500/10"}`}><Link href="/catalog"><Box/><span>Catalog</span></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`h-16 px-4 border-b ${pathname.startsWith("/rights") && "bg-blue-500/10"}`}><Link href="/rights"><Scale/><span>Rights</span></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`h-16 px-4 border-b ${pathname.startsWith("/sales") && "bg-blue-500/10"}`}><Link href="/sales"><Receipt/><span>Sales Data</span></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`h-16 px-4 border-b ${pathname.startsWith("/ddex") && "bg-blue-500/10"}`}><Link href="/ddex"><CodeXml/><span>DDEX Gateway</span></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`h-16 px-4 border-b ${pathname.startsWith("/users") && "bg-blue-500/10"}`}><Link href="/users"><UsersRound/><span>Manage Users</span></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className={`h-16 px-4 border-b ${pathname.startsWith("/config") && "bg-blue-500/10"}`}><Link href="/config"><Settings/><span>Configuration</span></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* <SidebarGroup/>
                <SidebarGroup/> */}
            </SidebarContent>
            {/* <SidebarFooter/> */}
        </Sidebar>
    )
}