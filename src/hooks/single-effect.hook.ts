import { useEffect, useRef } from "react"

export const useSingleEffect = (effect: () => void) => {
    const hasRun = useRef(false)

    useEffect(() => {
        if (!hasRun.current) {
            // Run the effect only once when the component mounts
            effect()
            hasRun.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
