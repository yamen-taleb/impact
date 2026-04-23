import type { Initiative } from "../schemas/initiativePageSchema.ts";

type InitiativeStatus = Initiative["status"];

export const initiativeStatusConfig: Record<InitiativeStatus, { label: string; className: string }> = {
    RESOLVED: {
        label: "تم الحل",
        className: "bg-green-100 text-green-700 border-green-200",
    },
    REJECTED: {
        label: "مرفوضة",
        className: "bg-red-100 text-red-700 border-red-200",
    },
    APPROVED: {
        label: "جاري حل المبادرة",
        className: "bg-slate-100 text-slate-700 border-slate-200",
    },
    PENDING_APPROVAL: {
        label: "بانتظار الموافقة",
        className: "bg-amber-100 text-amber-700 border-amber-200",
    },
};

export const getInitiativeStatus = (status: InitiativeStatus) => {
    return initiativeStatusConfig[status] ?? {
        label: "جاري حل المبادرة",
        className: "bg-slate-100 text-slate-700 border-slate-200",
    };
};

