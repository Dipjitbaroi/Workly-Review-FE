import { X } from "lucide-react"

type ModalPropType = {
    modalFn: (isModal: boolean) => void
    children?: React.ReactNode
    variant: "small" | "large"
}

export function MyModal({ modalFn, children, variant }: ModalPropType) {
    return (
        <>
            <div className="fixed bg-gray-400 w-full h-full top-0 left-0 z-50 bg-opacity-50 px-4">
                {/* top-1/2 transform -translate-y-1/2 */}
                <div className="h-full flex">
                    {variant === "small" && (
                        <div className="relative w-full md:w-2/6 max-h-[96vh] m-auto px-8 py-10 bg-white z-10 rounded-md shadow-lg border-2 border-grey-300 animate-scale overflow-auto dark:bg-black">
                            <div
                                onClick={() => modalFn(false)}
                                className="absolute top-0 right-0 hover:bg-slate-200 m-3 p-2 rounded-full hover:cursor-pointer"
                            >
                                <X size={16} />
                            </div>
                            {children}
                        </div>
                    )}
                    {variant === "large" && (
                        <div className="relative w-full md:w-4/6 max-h-[96vh] m-auto px-8 py-10 bg-white z-10 rounded-md shadow-lg border-2 border-grey-300 animate-scale overflow-auto dark:bg-black">
                            <div
                                onClick={() => modalFn(false)}
                                className="absolute top-0 right-0 hover:bg-slate-200 m-4 p-2 rounded-full hover:cursor-pointer"
                            >
                                <X size={16} />
                            </div>
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
