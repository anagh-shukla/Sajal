"use client"

import type * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Simple wrapper that just renders children without theme functionality
  // This removes the next-themes dependency that was causing import errors
  return <>{children}</>
}
