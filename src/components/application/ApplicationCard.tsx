import { Trash2, Image as ImageIcon } from "lucide-react";
import { Badge } from "../ui/badge.tsx"
import type {Application} from "../../schemas/applicationSchema.ts";
import { applicationStatusConfig } from "../../lib/applicationStatus.ts";

interface Props {
    application: Application;
    onDelete?: (id: string | number) => void;
}

const ApplicationCard = ({ application, onDelete }: Props) => {
    const status = applicationStatusConfig[application.status];
    const StatusIcon = status.icon;

    return (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="grid h-full grid-cols-1 md:flex md:items-stretch">
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100 md:w-56 md:self-stretch md:h-auto">
                    {application.initiativePhoto ? (
                        <img
                            src={application.initiativePhoto}
                            alt={application.initiativeTitle}
                            className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-zinc-400">
                            <ImageIcon size={48} />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="relative flex flex-1 flex-col gap-4 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold text-zinc-900 line-clamp-2">
                                {application.initiativeTitle}
                            </h3>
                            <p className="mt-1 text-sm text-zinc-600 font-[Thamanyah2]">
                                {application.initiativeCollege}
                            </p>
                        </div>
                        <Badge className={`shrink-0 border rounded-full  font-[Thamanyah2] ${status.className}`}>
                            {status.label}
                        </Badge>
                    </div>

                    {/* Status and Timeline */}
                    <div className="flex items-center gap-2">
                        <StatusIcon size={18} className={status.iconClass} />
                        <div className="text-sm text-zinc-600">
                            <p className="font-[Thamanyah2]">
                                قُدمت في:{" "}
                                <span className="font-medium font-[Thamanyah2]">
                                    {new Date(application.applicationDate).toLocaleDateString("ar-SY")}
                                </span>
                            </p>
                            {application.reviewDate && (
                                <p className="mt-1 font-[Thamanyah2]">
                                    تمت المراجعة:{" "}
                                    <span className="font-medium font-[Thamanyah2]">
                                        {new Date(application.reviewDate).toLocaleDateString("ar-SY")}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Cover Letter */}
                    {application.coverLetter && (
                        <div>
                            <p className="text-xs font-semibold text-zinc-600 mb-1 tracking-wide">رسالة التوصية:</p>
                            <p className="text-sm leading-6 text-zinc-700 whitespace-pre-line break-words font-[Thamanyah2]">
                                {application.coverLetter.slice(0, 100)} {application.coverLetter.length > 100 && "..."}
                            </p>
                        </div>
                    )}


                    {/* Feedback */}
                    {application.reviewerFeedback && (
                        <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-200">
                            <p className="text-xs font-semibold text-zinc-600 mb-1">تعليق المراجع:</p>
                            <p className="text-sm text-zinc-700 font-[Thamanyah2]">{application.reviewerFeedback}</p>
                        </div>
                    )}

                    {/* Meta and Actions */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-3">
                        <Badge variant="outline" className="text-xs rounded-full font-[Thamanyah2]">
                            {application.initiativeCategory}
                        </Badge>
                        {onDelete && application.status === "PENDING" && (
                            <button
                                onClick={() => onDelete(application.id)}
                                className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-100"
                            >
                                <Trash2 size={14} />
                                سحب الطلب
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;

