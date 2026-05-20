import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { useGetInitiatives } from "../hooks/use-initiative";
import { paginatedInitiativesSchema, type Initiative } from "../schemas/initiativePageSchema";
import { getUserRole } from "../lib/utils";
import type { FiltersType } from "../components/initiative/Filters";
import { useGetMyUser } from "../hooks/use-user";

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

interface InitiativesProviderProps {
  children: ReactNode;
  mode: "initiatives" | "my-initiatives" | "our-initiatives";
}

const InitiativesContext = createContext<InitiativesContextType | undefined>(undefined);

export const InitiativesProvider = ({
  children,
  mode,
}: InitiativesProviderProps) => {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const me = useGetMyUser();
  const userRole = getUserRole();
  const currentUserId = me.currentUser?.userId;
  const currentCollegeId = me.currentUser?.collegeId;

  const isManager = userRole === "Manager";
  const isAdmin = userRole === "Admin";

  /*** /initiatives * فقط الحالات المعروضة */

  const statusFilter =
    mode === "initiatives" && !isManager
      ? ["APPROVED", "ONGOING", "COMPLETED"]
      : undefined;

  /**
   * /my-initiatives
   * مبادرات المستخدم الحالي
   */
  const proposedByUserFilter =
    mode === "my-initiatives" &&
    currentUserId != null
      ? Number(currentUserId)
      : undefined;

  /**
   * /our-initiatives
   * مبادرات نفس الكلية
   */
  const collegeFilter =
    mode === "our-initiatives" &&
    isAdmin &&
    currentCollegeId != null
      ? Number(currentCollegeId)
      : undefined;

  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    college: "",
    status: "",
    category: "",
  });

  const { data, isLoading, error } = useGetInitiatives({
    page,

    size: ITEMS_PER_PAGE,

    /**
     * الأحدث أولاً
     */
    sort: "createdAt,desc",

    searchText:
      filters.search || undefined,

    categoryId:
      filters.category || undefined,

    collegeId:
      mode === "our-initiatives"
        ? collegeFilter
        : filters.college || undefined,

    status:
      filters.status || statusFilter,

    proposedByUserId:
      proposedByUserFilter,
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
