import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { Application } from "../schemas/applicationsSchema.ts";

type ApplicationStatus = Application["status"];

export const applicationStatusConfig: Record<
    ApplicationStatus,
    {
        label: string;
        icon: typeof CheckCircle;
        iconClass: string;
        className: string;
    }
> = {
    PENDING: {
        label: "قيد المراجعة",
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800 border-yellow-300",
        iconClass: "text-yellow-600",
    },
    APPROVED: {
        label: "مقبول",
        icon: CheckCircle,
        className: "bg-green-100 text-green-800 border-green-300",
        iconClass: "text-green-600",
    },
    REJECTED: {
        label: "مرفوض",
        icon: XCircle,
        className: "bg-red-100 text-red-800 border-red-300",
        iconClass: "text-red-600",
    },
    WITHDRAWN: {
        label: "مسحوب",
        icon: XCircle,
        className: "bg-zinc-100 text-zinc-800 border-zinc-300",
        iconClass: "text-zinc-600",
    },
};
