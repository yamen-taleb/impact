import {CheckCircle, Clock, XCircle} from "lucide-react";
interface Props {
    statsCount: {
        total: number;
        accepted: number;
        pending: number;
        rejected: number;
    }
}

const ApplicationsStats = ({statsCount} : Props) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-zinc-600">إجمالي الطلبات</p>
                <p className="mt-2 text-3xl font-bold text-zinc-900">{statsCount.total}</p>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-700">مقبول</p>
                    <CheckCircle size={20} className="text-green-600" />
                </div>
                <p className="mt-2 text-3xl font-bold text-green-900">{statsCount.accepted}</p>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-amber-700">قيد الانتظار</p>
                    <Clock size={20} className="text-amber-600" />
                </div>
                <p className="mt-2 text-3xl font-bold text-amber-900">{statsCount.pending}</p>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-red-700">مرفوض</p>
                    <XCircle size={20} className="text-red-600" />
                </div>
                <p className="mt-2 text-3xl font-bold text-red-900">{statsCount.rejected}</p>
            </div>
        </div>
    );
};

export default ApplicationsStats;