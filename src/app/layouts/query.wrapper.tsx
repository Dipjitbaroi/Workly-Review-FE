"use client"

import { queryClient } from "@/config/query.config"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

export const QueryWrapper = ({ children }: { children: ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
