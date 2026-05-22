import { createContext, useContext, ReactNode } from "react";
import { type Initiative } from "../schemas/initiativePageSchema";
import type { FiltersType } from "../components/initiative/Filters";
import { usePaginatedInitiatives } from "../hooks/use-paginated-initiatives";
import {useGetMyUser} from "../hooks/use-user.ts";
import {useCollegeContext} from "./CollegeContext.tsx";
import {getCollegeId, getUserRole} from "../lib/utils.ts";

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
    userRole: string;
}

const CollegeInitiativesContext = createContext<InitiativesContextType | undefined>(undefined);

export const CollegeInitiativesProvider = ({ children }: { children: ReactNode }) => {
    const {currentUser} = useGetMyUser()
    const {collegeOptions} = useCollegeContext();
    const collegeId = getCollegeId(collegeOptions, currentUser?.collegeName);
    const userRole = getUserRole();

    const paginatedData = usePaginatedInitiatives({
        initialCollegeId: collegeId,
    });

    return (
        <CollegeInitiativesContext.Provider
            value={{
                userRole,
                ...paginatedData,
            }}
        >
            {children}
        </CollegeInitiativesContext.Provider>
    );
};

export const useCollegeInitiativesContext = () => {
    const context = useContext(CollegeInitiativesContext);
    if (!context) {
        throw new Error("useInitiativesContext must be used within an InitiativesProvider");
    }
    return context;
};