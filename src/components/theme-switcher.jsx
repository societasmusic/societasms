"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"

export default function ThemeSwitcher() {
    const [ mounted, setMounted ] = useState(false)
    const { theme, setTheme } = useTheme()
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    return (
        <Button variant="ghost" className="rounded-none h-16 w-12" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Sun/> : <Moon/>}
        </Button>
    )
}