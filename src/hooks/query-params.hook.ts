"use client"

import { useRouter, useSearchParams } from "next/navigation"

export const useQueryParam = <T>() => {
    const router = useRouter()
    const queryParams = useSearchParams()

    const setQueryParam = (
        // router: AppRouterInstance,
        // searchParams: ReadonlyURLSearchParams,
        key: keyof T,
        value: string
    ) => {
        const currentParams = new URLSearchParams(queryParams.toString())
        currentParams.set(key as string, value)
        router.replace(`?${currentParams.toString()}`, { scroll: false })
    }

    const getSingleQueryParam = (key: keyof T) => {
        const currentParams = new URLSearchParams(queryParams.toString())
        return currentParams.get(key as string) || ""
    }

    const getQueryParams = () => {
        const currentParams = new URLSearchParams(queryParams.toString())
        return currentParams
    }

    const clearQueryParams = () => {
        const currentParams = new URLSearchParams(queryParams.toString())
        const keys: string[] = []
        currentParams.forEach((va, key) => {
            keys.push(key)
        })
        for (const key of keys) {
            currentParams.delete(key)
        }
        router.replace(`?${currentParams.toString()}`, { scroll: false })
    }

    //queryParams,
    return { setQueryParam, getSingleQueryParam, getQueryParams, clearQueryParams }
}
