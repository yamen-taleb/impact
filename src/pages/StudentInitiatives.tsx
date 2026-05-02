import initiativesData from "../data/initiatives.json";
import StudentInitiativeCard from "../components/initiative/StudentInitiativeCard";
import Filters from "../components/initiative/Filters.tsx";
import {initiativesSchema} from "../schemas/initiativePageSchema.ts";
import PaginationLinks from "../components/initiative/PaginationLinks.tsx";
import {useState} from "react";


const StudentInitiativesPage = () => {
    const initiatives = initiativesSchema.parse(initiativesData);
    const totalHours = 300;
    const initiativesCount = 6;
    const [page, setPage] = useState(1);

    if (initiatives.length === 0) {
        return (
            <p className="rounded-lg ml-10 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-md font-medium text-zinc-500">لم يتطوع هذا الطالب بأي مبادرة حتى الآن.</p>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900">ساعات التطوع للطالب</h1>
                <p className="mt-1 text-sm text-zinc-600">عرض ملخص ساعات التطوع في المبادرات للطالب</p>
            </header>


            <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-4">
                    <p className="text-sm text-zinc-500">عدد المبادرات</p>
                    <p className="mt-1 text-2xl font-semibold text-zinc-900">{initiativesCount}</p>
                </div>
                <div className="rounded-lg border bg-white border-dashed border-zinc-300 p-4">
                    <p className="text-sm text-zinc-500">مجموع ساعات التطوع</p>
                    <p className="mt-1 text-2xl font-semibold text-zinc-900">{totalHours} ساعة</p>
                </div>
            </section>

            <Filters/>

            <section>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {initiatives.length === 0 && (
                        <p className="text-sm text-zinc-600">لا توجد مبادرات تطابق الفلاتر المحددة.</p>
                    )}

                    {initiatives.map((initiative) => (
                        <StudentInitiativeCard key={initiative.id} initiative={initiative} hours={30} />
                    ))}
                </div>
            </section>

            <PaginationLinks page={page} setPage={setPage} totalPages={5}/>
        </div>
    );
};

export default StudentInitiativesPage;

