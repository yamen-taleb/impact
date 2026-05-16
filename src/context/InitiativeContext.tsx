import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { useGetInitiatives } from "../hooks/use-initiative";
import { paginatedInitiativesSchema, type Initiative } from "../schemas/initiativePageSchema";
import { getUserRole } from "../lib/utils";
import type { FiltersType } from "../components/initiative/Filters";

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
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const userRole = getUserRole();

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
        totalPages: validatedData.totalPages,
      };
    } catch (e) {
      console.error("Zod Validation Error:", e);
      return {
        initiatives: data?.content || [],
        totalPages: data?.totalPages || 0,
      };
    }
  }, [data]);

  return (
    <InitiativesContext.Provider
      value={{
        page,
        setPage,
        viewMode,
        setViewMode,
        filters,
        setFilters,
        handleFiltersChange,
        initiatives,
        totalPages,
        isLoading,
        error,
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
