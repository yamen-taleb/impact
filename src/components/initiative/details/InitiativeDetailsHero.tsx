import {CalendarDays, ImageIcon} from "lucide-react";
import type {InitiativeDetails} from "../../../schemas/initiativeDetailsSchema.ts";
import {Badge} from "../../ui/badge.tsx";
import AttachmentsPreview from "../../AttachmentsPreview.tsx";
import {getInitiativeStatus} from "../../../lib/initiativeStatus.ts";

interface Props {
    initiative: InitiativeDetails;
}

const InitiativeDetailsHero = ({initiative}: Props) => {
    const primaryPhoto = initiative.photos[0];
    const status = getInitiativeStatus(initiative.status);

    return (
            <div className="relative h-72 w-full bg-zinc-100">
                {primaryPhoto ? (
                    <img
                        src={primaryPhoto}
                        alt={initiative.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-zinc-400">
                        <ImageIcon size={56} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white">
                    <div>
                        <Badge className={`font-[Thamanyah2] mb-3 border ${status.className}`}>{status.label}</Badge>
                        <h1 className="text-2xl font-black leading-tight md:text-3xl">{initiative.title}</h1>
                        <p className="mt-2 flex items-center gap-2 text-sm text-zinc-200">
                            <CalendarDays size={16} />
                            تاريخ النشر: {new Date(initiative.submissionDate).toLocaleDateString("ar-SY")}
                        </p>
                    </div>

                    <AttachmentsPreview
                        attachments={initiative.photos}
                        title="صور المبادرة"
                        trigger={
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                            >
                                <ImageIcon size={16} />
                                عرض الصور
                            </button>
                        }
                    />
                </div>
            </div>
    );
};

export default InitiativeDetailsHero;

