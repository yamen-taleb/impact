import { Image as ImageIcon } from "lucide-react";
import { Badge } from "../../ui/badge.tsx";
import type { Initiative } from "../../../schemas/initiativePageSchema.ts";

interface Props {
    initiative: Initiative;
    hours: number;
}

const StudentInitiativeCard = ({ initiative, hours }: Props) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="grid grid-cols-1 md:flex md:items-stretch">
                <div className="relative h-40 w-full overflow-hidden bg-zinc-100 md:w-48 md:self-stretch md:h-auto">
                    {initiative.photo ? (
                        <img
                            src={initiative.photo}
                            alt={initiative.title}
                            className="absolute inset-0 object-cover w-full h-full"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-zinc-400">
                            <ImageIcon size={40} />
                        </div>
                    )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="text-base font-semibold text-zinc-900 line-clamp-2">
                                {initiative.title}
                            </h3>
                            <p className="mt-1 text-sm text-zinc-600 line-clamp-2 font-[Thamanyah2]">
                                {initiative.description}
                            </p>
                        </div>
                        <Badge className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-zinc-800 font-[Thamanyah2]">
                            {hours} ساعة تطوع
                        </Badge>
                    </div>

                    <div className="mt-auto flex items-center justify-start gap-2 text-sm text-zinc-600">
                        <span className={"rounded-full border-zinc-900 bg-zinc-900/90 px-2 py-1 text-white text-xs font-[Thamanyah2]"}>{initiative.college ?? "غير معروف"}</span>
                        <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-800 text-xs font-[Thamanyah2]">{initiative.category ?? "غير معروف"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentInitiativeCard;

