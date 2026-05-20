import { createContext, useContext, useState, useMemo, ReactNode } from "react";

import { applicationsSchema, type applicationContentSchema } from "../schemas/applicationsSchema";
import type { FilterStatus } from "../types";
import {useGetUserApplications} from "../hooks/use-application.ts";

interface ApplicationsContextType {
  page: number;
  setPage: (page: number) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  applications: (typeof applicationContentSchema)[];
  totalPages: number;
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    withdrawn: number;
    cancelled: number;
  };
  isLoading: boolean;
  error: any;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export const ApplicationsProvider = ({ userId, children }: { userId: string | number; children: ReactNode }) => {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");

  const { data, isLoading, error } = useGetUserApplications({
    userId,
    page,
    size: ITEMS_PER_PAGE,
    status: filterStatus === "ALL" ? undefined : filterStatus,
  });

  const { applications, totalPages, stats } = useMemo(() => {
    if (!data) return { applications: [], totalPages: 0, stats: { total: 0, pending: 0, approved: 0, rejected: 0, withdrawn: 0, cancelled: 0 } };
    try {
      const validatedData = applicationsSchema.parse(data);

      return {
        applications: validatedData.applications.content,
        totalPages: validatedData.applications.totalPages,
        stats: {
          total: validatedData.total,
          pending: validatedData.pending,
          approved: validatedData.approved,
          rejected: validatedData.rejected,
          withdrawn: validatedData.withdrawn,
          cancelled: validatedData.cancelled,
        },
      };
    } catch (e) {
      console.error("Zod Validation Error:", e);
      return {
        applications: data?.applications?.content || [],
        totalPages: data?.applications?.totalPages || 0,
        stats: {
          total: data?.total || 0,
          pending: data?.pending || 0,
          approved: data?.approved || 0,
          rejected: data?.rejected || 0,
          withdrawn: data?.withdrawn || 0,
          cancelled: data?.cancelled || 0,
        },
      };
    }
  }, [data]);

  return (
    <ApplicationsContext.Provider
      value={{
        page,
        setPage,
        filterStatus,
        setFilterStatus,
        applications,
        totalPages,
        stats,
        isLoading,
        error,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export const useApplicationsContext = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error("useApplicationsContext must be used within an ApplicationsProvider");
  }
  return context;
};

