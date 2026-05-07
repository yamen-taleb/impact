import { ComponentType } from "react";

interface StatSummaryCardProps {
    icon: ComponentType<{ className?: string }>;
    label: string;
    value: number | string;
    bgColor: string;
    iconColor: string;
    textColor: string;
}

const StatSummaryCard = ({
    icon: Icon,
    label,
    value,
    bgColor,
    iconColor,
    textColor,
}: StatSummaryCardProps) => {
    return (
        <div className="rounded-lg relative border border-zinc-200 bg-white p-4 shadow-sm">
            <div className={`absolute top-4 right-4 rounded-lg ${bgColor} p-3`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div className="mt-14">
                <p className={`text-sm font-medium ${textColor}`}>{label}</p>
                <p className={`mt-2 text-3xl font-bold ${textColor.replace('700', '800').replace('600', '800')}`}>
                    {value}
                </p>
            </div>
        </div>
    );
};

export default StatSummaryCard;

