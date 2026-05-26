import { LucideGanttChartSquare, UserCog, UserPen } from "lucide-react";

interface Props {
    description: string;
    proposedByName: string;
    managedByName: string;
}

const InitiativeDetailsDescription = ({description, proposedByName, managedByName}: Props) => {
    return (
        <article className="w-full flex flex-row justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">
            <div className="w-[50%] flex flex-col gap-4">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                        <UserPen />
                        <h2 className="text-lg font-bold text-zinc-900">مقدم المبادرة</h2>
                    </div>
                    <p className="whitespace-pre-line text-sm leading-7 text-zinc-700 font-[Thamanyah2]">
                        {proposedByName}
                    </p>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                        <LucideGanttChartSquare />
                        <h2 className="text-lg font-bold text-zinc-900">تفاصيل المبادرة</h2>
                    </div>
                    <p className="whitespace-pre-line text-sm leading-7 text-zinc-700 font-[Thamanyah2]">
                        {description}
                    </p>
                </div>
            </div>
            <div className="w-[50%]">
                {managedByName && (
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <UserCog />
                            <h2 className="text-lg font-bold text-zinc-900">مدير المبادرة</h2>
                        </div>
                        <p className="whitespace-pre-line text-sm leading-7 text-zinc-700 font-[Thamanyah2]">
                            {managedByName}
                        </p>
                    </div>
                )}
            </div>
        </article>
    );
};

export default InitiativeDetailsDescription;

