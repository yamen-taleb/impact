import { Link } from "react-router";
import { ComponentType } from "react";
import {cn} from "../lib/utils.ts";

interface StatCardProps {
    icon: ComponentType<{ className?: string }>;
    disabled?: boolean;
    label: string;
    value: number | string;
    description: string;
    href: string;
    bgColor: string;
    iconColor: string;
    hoverTextColor: string;
}

const StatCard = ({
    icon: Icon,
    disabled = false,
    label,
    value,
    description,
    href,
    bgColor,
    iconColor,
    hoverTextColor,
}: StatCardProps) => {
    return (
        <Link
            to={href}
            className={cn("group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-zinc-300", disabled && "pointer-events-none")}
        >
            <div className={`absolute top-4 right-4 rounded-lg ${bgColor} p-3`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div className="mt-12">
                <p className="text-sm text-zinc-600 font-medium">{label}</p>
                <p className="mt-1 text-4xl font-bold text-zinc-900">{value}</p>
                <p className={`mt-2 text-xs ${hoverTextColor} group-hover:opacity-80`}>
                    {description}
                </p>
            </div>
        </Link>
    );
};

export default StatCard;

