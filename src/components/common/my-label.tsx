export function MyLabel({ htmlFor, label }: { htmlFor?: string; label: string | React.ReactNode }) {
    return (
        <label
            htmlFor={htmlFor}
            className="cursor-pointer mb-1 text-sm font-medium text-slate-600 dark:text-slate-400"
        >
            {label}
        </label>
    )
}
