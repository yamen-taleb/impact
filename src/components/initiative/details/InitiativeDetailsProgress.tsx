import {Progress} from "../../ui/progress.tsx";

interface Props {
    percentage: number;
    status: string;
}

const InitiativeDetailsProgress = ({percentage, status}: Props) => {
    return (
        <aside className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900">نسبة الإنجاز</h2>
            {(!percentage && status === "PENDING") ? (
                <p className="mt-2 text-sm text-red-600 font-[Thamanyah2]">لم يتم الموافقة على المبادرة بعد</p>
            ) : (!percentage && status === "APPROVED") ? (
                <p className="mt-2 text-sm text-green-600 font-[Thamanyah2]">تم الموافقة على المبادرة ولكن لم يتم البدأ بالعمل بها</p>
            ) : (
                <div className="flex flex-col">
                    <p className="mt-2 text-sm text-zinc-600 font-[Thamanyah2]">تم إنجاز {percentage}% من خطوات المبادرة.</p>
                    <Progress value={percentage} className="mt-5 h-2 bg-zinc-200" />
                    <div className="mt-4 rounded-xl bg-zinc-100 p-3 text-center text-2xl font-black text-zinc-900">
                        {percentage}%
                    </div>
                </div>
            )}
        </aside>
    );
};

export default InitiativeDetailsProgress;

