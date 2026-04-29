import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { Application } from "../schemas/applicationSchema.ts";

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
    ACCEPTED: {
        label: "مقبول",
        icon: CheckCircle,
        className: "bg-green-100 text-green-700 border-green-200",
        iconClass: "text-green-600",
    },
    REJECTED: {
        label: "مرفوض",
        icon: XCircle,
        className: "bg-red-100 text-red-700 border-red-200",
        iconClass: "text-red-600",
    },
    PENDING: {
        label: "قيد الانتظار",
        icon: Clock,
        className: "bg-amber-100 text-amber-700 border-amber-200",
        iconClass: "text-amber-600",
    },
    WITHDRAWN: {
        label: "مسحوب",
        icon: XCircle,
        className: "bg-slate-100 text-slate-700 border-slate-200",
        iconClass: "text-slate-600",
    },
};


