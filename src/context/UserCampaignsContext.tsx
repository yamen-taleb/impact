import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { useGetUserCampaigns } from "../hooks/use-user";
import { campaignsSchema, type AttendedCampaign } from "../schemas/campaignsSchema";
import type { FiltersType } from "../components/initiative/Filters";

interface UserCampaignsContextType {
  page: number;
  setPage: (page: number) => void;
  filters: FiltersType;
  handleFiltersChange: (newFilters: FiltersType) => void;
  campaigns: AttendedCampaign[];
  totalPages: number;
  totalHours: number;
  totalCampaigns: number;
  isLoading: boolean;
  error: any;
}

const UserCampaignsContext = createContext<UserCampaignsContextType | undefined>(undefined);

export const UserCampaignsProvider = ({ userId, children }: { userId: string | number | undefined; children: ReactNode }) => {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState<FiltersType>({
    search: "",
    college: "",
    status: "",
    category: "",
  });

  const { data, isLoading, error } = useGetUserCampaigns({
    userId,
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

  const { campaigns, totalPages, totalHours, totalCampaigns } = useMemo(() => {
    if (!data) return { campaigns: [], totalPages: 0, totalHours: 0, totalCampaigns: 0 };
    try {
      const validatedData = campaignsSchema.parse(data);
      return {
        campaigns: validatedData.campaigns.content,
        totalPages: validatedData.campaigns.totalPages,
        totalHours: validatedData.totalHours,
        totalCampaigns: validatedData.totalCampaigns,
      };
    } catch (e) {
      console.error("Zod Validation Error:", e);
      return {
        campaigns: data?.campaigns?.content || [],
        totalPages: data?.campaigns?.totalPages || 0,
        totalHours: data?.totalHours || 0,
        totalCampaigns: data?.totalCampaigns || 0,
      };
    }
  }, [data]);

  return (
    <UserCampaignsContext.Provider
      value={{
        page,
        setPage,
        filters,
        handleFiltersChange,
        campaigns,
        totalPages,
        totalHours,
        totalCampaigns,
        isLoading,
        error,
      }}
    >
      {children}
    </UserCampaignsContext.Provider>
  );
};

export const useUserCampaignsContext = () => {
  const context = useContext(UserCampaignsContext);
  if (!context) {
    throw new Error("useUserCampaignsContext must be used within a UserCampaignsProvider");
  }
  return context;
};
