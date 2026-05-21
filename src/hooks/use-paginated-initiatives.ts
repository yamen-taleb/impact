import { useState, useMemo } from "react";
import { paginatedInitiativesSchema } from "../schemas/initiativePageSchema";
import type { FiltersType } from "../components/initiative/Filters";
import {useGetInitiatives} from "./use-initiative.ts";


export const usePaginatedInitiatives = (
    {
        initialCollegeId,
        initialStatusFilter,
        proposedInitiativeId,
    }: {
        initialCollegeId?: number|string|null;
        initialStatusFilter?: string[];
        proposedInitiativeId?: number;
    }
) => {
    const ITEMS_PER_PAGE = 6;
    const [page, setPage] = useState(0);
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
        collegeId: filters.college || initialCollegeId || undefined,
        status: (filters.status as any) || initialStatusFilter,
        categoryId: filters.category || undefined,
        proposedByUserId: proposedInitiativeId ?? undefined,
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
                totalPages: validatedData.totalPages,
            };
        } catch (e) {
            console.error("Zod Validation Error:", e);
            return {
                initiatives: (data as any)?.content || [],
                totalPages: (data as any)?.totalPages || 0,
            };
        }
    }, [data]);

    return {
        page,
        setPage,
        filters,
        setFilters,
        handleFiltersChange,
        initiatives,
        totalPages,
        isLoading,
        error,
    };
};
