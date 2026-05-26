import {Clock3, GraduationCap, MapPin, Tag} from "lucide-react";
import { toArabicNumbers } from "../../../lib/utils";


interface Props {
    college: string;
    category: string;
    address: string;
    startDate: string;
    endDate: string;
}

const InitiativeDetailsMetaGrid = ({
    college,
    category,
    address,
    startDate,
    endDate,
}: Props) => {

    const estimatedTimeToComplete = (() => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    })();



    return (
        <div className="grid gap-4 p-6 md:grid-cols-4">
            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <GraduationCap size={15} /> الكلية
                </p>
                <p className="text-sm font-semibold text-zinc-900 font-[Thamanyah2]">{college || "غير معروف"}</p>
            </article>

            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <Tag size={15} /> التصنيف
                </p>
                <p className="text-sm font-semibold text-zinc-900 font-[Thamanyah2]">{category || "غير معروف"}</p>
            </article>

            <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                    <MapPin size={15} /> العنوان
                </p>
                <p className="text-sm font-semibold text-zinc-900 font-[Thamanyah2]">{address || "غير معروف"}</p>
            </article>

            {estimatedTimeToComplete === 0 ? (
                <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                        <Clock3 size={15} /> الوقت التقديري للإنتهاء
                    </p>    
                    <p className="text-sm font-semibold text-zinc-900 font-[Thamanyah2]">لم يتم تحديده بعد</p>
                </article>
            ) : (
                <article className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-500">
                        <Clock3 size={15} /> الوقت التقديري للإنتهاء
                    </p>    
                    <p className="text-sm font-semibold text-zinc-900 font-[Thamanyah2]">{toArabicNumbers(estimatedTimeToComplete) + " " + (
                        estimatedTimeToComplete === 2 ? "يومين" 
                        : estimatedTimeToComplete <= 10 && estimatedTimeToComplete > 2 ? "أيام" 
                        : "يوم") || "غير محدد"
                    }</p>
                    {estimatedTimeToComplete && (
                        <span className="mt-2 block text-xs text-zinc-500 font-[Thamanyah2]">
                            من {new Date(startDate).toLocaleDateString("ar-SY")} إلى {new Date(endDate).toLocaleDateString("ar-SY")}
                        </span>
                    )}
                </article>
            )}
        </div>
    );
};

export default InitiativeDetailsMetaGrid;

