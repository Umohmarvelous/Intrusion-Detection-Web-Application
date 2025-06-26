"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const storedTheme = typeof window !== "undefined"
            ? (localStorage.getItem(storageKey) as Theme | null)
            : null
        if (storedTheme) {
            setTheme(storedTheme)
        }
    }, [storageKey])

    useEffect(() => {
        if (!isClient) return
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"
            root.classList.add(systemTheme)
            return
        }
        root.classList.add(theme)
    }, [theme, isClient])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            if (typeof window !== "undefined") {
                localStorage.setItem(storageKey, theme)
            }
            setTheme(theme)
        },
    }

    if (!isClient) return null

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context
} 