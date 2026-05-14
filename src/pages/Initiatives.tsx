import InitiativeHeader from "../components/initiative/InitiativeHeader";
import InitiativeCard from "../components/initiative/InitiativeCard.tsx";
import {useMemo, useState} from "react";
import PaginationLinks from "../components/initiative/PaginationLinks.tsx";

import InitiativeTable from "../components/initiative/InitiativeTable.tsx";
import {useGetInitiatives} from "../hooks/use-initiative.ts";
import { paginatedInitiativesSchema } from "../schemas/initiativePageSchema.ts";
import type {Initiative} from "../schemas/initiativePageSchema.ts";
import {getUserRole} from "../lib/utils.ts";
import type { FiltersType } from "../components/initiative/Filters.tsx"

const Initiatives = () => {
    const ITEMS_PER_PAGE = 1;
    const [page, setPage] = useState(0);
    const userRole = getUserRole();
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    
    const [filters, setFilters] = useState<FiltersType>({
        search: "",
        college: "",
        status: "",
        category: "",
    });

    const { data, isLoading, error } = useGetInitiatives({
        page,
        size: ITEMS_PER_PAGE,
        searchText: filters.search || undefined,
        collegeId: filters.college || undefined,
        status: (filters.status as any) || undefined,
        categoryId: filters.category || undefined,
    });

    const handleFiltersChange = (newFilters: FiltersType) => {
        setFilters(newFilters);
        setPage(0);
    };

    const { initiatives, totalPages } = useMemo(() => {
        if (!data) return { initiatives: [], totalPages: 0 };
        try {
            const validatedData = paginatedInitiativesSchema.parse(data);
            return { 
                initiatives: validatedData.content, 
                totalPages: validatedData.totalPages 
            };
        } catch (e) {
            console.error("Zod Validation Error:", e);
            return { 
                initiatives: data?.content || [], 
                totalPages: data?.totalPages || 0 
            };
        }
    }, [data]);

    return (
        <div className="flex flex-col gap-6 pr-10 mb-25">
            <InitiativeHeader onFiltersChange={handleFiltersChange} />

            {/* View Toggle for Managers */}
            {userRole === "Manager" && (
                <div className="flex gap-2 self-start font-[Thamanyah2] pl-10">
                    <button 
                        onClick={() => setViewMode("grid")}
                        className={`rounded-xl px-5 py-2 text-sm font-medium transition-colors ${viewMode === "grid" ? "bg-black text-white" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"}`}
                    >
                        عرض البطاقات
                    </button>
                    <button 
                        onClick={() => setViewMode("table")}
                        className={`rounded-xl px-5 py-2 text-sm font-medium transition-colors ${viewMode === "table" ? "bg-black text-white" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"}`}
                    >
                        عرض الجدول
                    </button>
                </div>
            )}

            {(userRole === "Admin" || userRole === "User" || (userRole === "Manager" && viewMode === "grid")) && (
                <div>
                    {isLoading ? (
                        <p className="ml-10 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-600">
                            جاري التحميل...
                        </p>
                    ) : error ? (
                        <p className="ml-10 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                            حدث خطأ أثناء تحميل المبادرات
                        </p>
                    ) : initiatives.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 pl-10 md:grid-cols-2 xl:grid-cols-3">
                            {initiatives.map((initiative: Initiative, index: number) => (
                                <InitiativeCard
                                    key={`${initiative.campaignId}-${page}-${index}`}
                                    initiative={initiative}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-lg ml-10 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-sm font-medium text-zinc-500 font-[Thamanyah2]">
                            لا يوجد مبادرات حتى الآن...
                        </p>
                    )}
                    {totalPages > 1 && (
                        <PaginationLinks page={page} setPage={setPage} totalPages={totalPages} />
                    )}
                </div>
            )}

            {userRole === "Manager" && viewMode === "table" && (
                <div>
                    {isLoading ? (
                        <p className="ml-10 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-600">
                            جاري التحميل...
                        </p>
                    ) : error ? (
                        <p className="ml-10 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                            حدث خطأ أثناء تحميل المبادرات
                        </p>
                    ) : initiatives.length > 0 ? (
                        <InitiativeTable initiatives={initiatives} page={page} setPage={setPage} totalPages={totalPages} />
                    ) : (
                        <p className="rounded-lg ml-10 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-sm font-medium text-zinc-500 font-[Thamanyah2]">
                            لا يوجد مبادرات حتى الآن...
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Initiatives;