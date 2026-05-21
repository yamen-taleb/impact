import {cn} from "../lib/utils.ts";
interface LoaderProps {
    className?: string;
}

const Loader = ({ className }: LoaderProps) => {
    return (
        <p className={cn("rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-600", className)}>
            جاري التحميل...
        </p>
    )
}

export default Loader;