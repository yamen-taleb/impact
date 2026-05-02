import {Filter} from "lucide-react";
import type {FilterStatus} from "../../types.ts";

interface Props {
    filterStatus: string;
    setFilterStatus: (status: FilterStatus) => void;
}


const ApplicationsFilter = ({ filterStatus, setFilterStatus }: Props) => {
    return (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <Filter size={18} className="text-zinc-600" />
                <h3 className="font-semibold text-zinc-900">فلترة حسب الحالة</h3>
            </div>
            <div className="flex flex-wrap gap-2 font-[Thamanyah2]">
                {(["ALL", "ACCEPTED", "PENDING", "REJECTED", "WITHDRAWN"] as const).map(
                    (status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                filterStatus === status
                                    ? "bg-black text-white"
                                    : "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                            }`}
                        >
                            {status === "ALL"
                                ? "الكل"
                                : status === "ACCEPTED"
                                    ? "مقبول"
                                    : status === "PENDING"
                                        ? "قيد الانتظار"
                                        : status === "REJECTED"
                                            ? "مرفوض"
                                            : "مسحوب"}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default ApplicationsFilter;