import { createContext, useContext, useState, ReactNode } from "react";
import { type Initiative } from "../schemas/initiativePageSchema";
import type { FiltersType } from "../components/initiative/Filters";
import { usePaginatedInitiatives } from "../hooks/use-paginated-initiatives";
import {useGetMyUser} from "../hooks/use-user.ts";

interface InitiativesContextType {
    page: number;
    setPage: (page: number) => void;
    filters: FiltersType;
    setFilters: (filters: FiltersType) => void;
    handleFiltersChange: (newFilters: FiltersType) => void;
    initiatives: Initiative[];
    totalPages: number;
    isLoading: boolean;
    error: any;
}

const StudentInitiativesContext = createContext<InitiativesContextType | undefined>(undefined);

export const StudentInitiativesProvider = ({ children }: { children: ReactNode }) => {
    const {currentUser} = useGetMyUser()
    const proposedById = currentUser?.userId

    const paginatedData = usePaginatedInitiatives({proposedInitiativeId: proposedById});

    return (
        <StudentInitiativesContext.Provider
            value={{
                ...paginatedData,
            }}
        >
            {children}
        </StudentInitiativesContext.Provider>
    );
};

export const useStudentInitiativesContext = () => {
    const context = useContext(StudentInitiativesContext);
    if (!context) {
        throw new Error("useInitiativesContext must be used within an InitiativesProvider");
    }
    return context;
};