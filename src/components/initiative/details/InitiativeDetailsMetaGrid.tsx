import {Clock3, GraduationCap, MapPin, Tag} from "lucide-react";

interface Props {
    college: string;
    category: string;
    address: string;
    estimatedTimeToComplete: string;
    startDate: string;
    endDate: string;
}

const InitiativeDetailsMetaGrid = ({
    college,
    category,
    address,
    estimatedTimeToComplete,
    startDate,
    endDate,
}: Props) => {
    return (
        <div className="grid gap-4 p-6 md:grid-cols-4">
            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <GraduationCap size={15} /> الكلية
                </p>
                <p className="text-sm font-semibold text-zinc-900">{college || "غير معروف"}</p>
            </article>

            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Tag size={15} /> التصنيف
                </p>
                <p className="text-sm font-semibold text-zinc-900">{category || "غير معروف"}</p>
            </article>

            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <MapPin size={15} /> العنوان
                </p>
                <p className="text-sm font-semibold text-zinc-900">{address || "غير معروف"}</p>
            </article>

            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Clock3 size={15} /> الوقت التقديري للحل
                </p>
                <p className="text-sm font-semibold text-zinc-900">{estimatedTimeToComplete || "غير محدد"}</p>
                {estimatedTimeToComplete && (
                    <span className="mt-2 block text-xs text-zinc-500">
                        من {new Date(startDate).toLocaleDateString("ar-SY")} إلى {new Date(endDate).toLocaleDateString("ar-SY")}
                    </span>
                )}
            </article>
        </div>
    );
};

export default InitiativeDetailsMetaGrid;

