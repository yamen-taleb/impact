import { createContext, useContext, useState, ReactNode } from "react";
import { useGetInitiatives } from "../hooks/use-initiative";
import { type Initiative } from "../schemas/initiativePageSchema";
import { getUserRole } from "../lib/utils";
import type { FiltersType } from "../components/initiative/Filters";
import { usePaginatedInitiatives } from "../hooks/use-paginated-initiatives";

interface InitiativesContextType {
    page: number;
    setPage: (page: number) => void;
    viewMode: "grid" | "table";
    setViewMode: (mode: "grid" | "table") => void;
    filters: FiltersType;
    setFilters: (filters: FiltersType) => void;
    handleFiltersChange: (newFilters: FiltersType) => void;
    initiatives: Initiative[];
    totalPages: number;
    isLoading: boolean;
    error: any;
    userRole: string;
}

const InitiativesContext = createContext<InitiativesContextType | undefined>(undefined);

export const InitiativesProvider = ({ children }: { children: ReactNode }) => {
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const userRole = getUserRole();
    const isManager = userRole === "Manager";
    const statusFilter = !isManager
        ? ["APPROVED", "ONGOING", "COMPLETED"]
        : undefined;

    const paginatedData = usePaginatedInitiatives({initialStatusFilter: statusFilter});

    return (
        <InitiativesContext.Provider
            value={{
                ...paginatedData,
                viewMode,
                setViewMode,
                userRole,
            }}
        >
            {children}
        </InitiativesContext.Provider>
    );
};

export const useInitiativesContext = () => {
    const context = useContext(InitiativesContext);
    if (!context) {
        throw new Error("useInitiativesContext must be used within an InitiativesProvider");
    }
    return context;
};