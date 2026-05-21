import InitiativeHeader from "../components/initiative/InitiativeHeader";
import InitiativeTable from "../components/initiative/InitiativeTable.tsx";
import {useInitiativesContext} from "../context/InitiativeContext.tsx";
import { ClipboardListIcon, Table } from "lucide-react";
import ErrorDisplay from "../components/ErrorDisplay.tsx";
import Loader from "../components/Loader.tsx";
import BaseInitiatives from "../components/initiative/BaseInitiatives.tsx";

const Initiatives = () => {
    const {
        viewMode,
        setViewMode,
        initiatives,
        totalPages,
        isLoading,
        error,
        userRole,
        page,
        setPage,
        handleFiltersChange
    } = useInitiativesContext();


    return (
        <div className="flex flex-col gap-6 pr-10 mb-25">
            <InitiativeHeader onFiltersChange={handleFiltersChange} />

            {/* View Toggle for Managers */}
            {userRole === "Manager" && (
                <div className="flex gap-2 self-start font-[Thamanyah2] pl-10">
                    <button 
                        onClick={() => setViewMode("grid")}
                        className={`flex flex-row gap-4 items-center rounded-xl px-5 py-2 text-sm font-medium transition-colors ${viewMode === "grid" ? "bg-black text-white" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"}`}
                    >
                        عرض البطاقات
                        <ClipboardListIcon />
                    </button>
                    <button 
                        onClick={() => setViewMode("table")}
                        className={`flex flex-row gap-4 items-center rounded-xl px-5 py-2 text-sm font-medium transition-colors ${viewMode === "table" ? "bg-black text-white" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"}`}
                    >
                        عرض الجدول
                        <Table />
                    </button>
                </div>
            )}

            {(userRole === "Admin" || userRole === "User" || (userRole === "Manager" && viewMode === "grid")) && (
                <BaseInitiatives initiatives={initiatives} isLoading={isLoading} error={error} page={page} setPage={setPage} totalPages={totalPages} />
            )}

            {userRole === "Manager" && viewMode === "table" && (
                <div>
                    {isLoading ? (
                        <Loader className="ml-10" />
                    ) : error ? (
                        <ErrorDisplay message="حدث خطأ أثناء تحميل المبادرات" className="ml-10" />
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