"use client"

import { UserProfile } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Account() {
    const { theme } = useTheme();
    const clerkTheme = theme === "dark" ? dark : light;
    return (
        <div className="grow">
            <UserProfile path="/account" appearance={{ baseTheme: clerkTheme }}/>
        </div>
    )
}