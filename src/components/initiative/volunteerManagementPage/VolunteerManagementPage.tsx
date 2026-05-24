import { useMemo, useState } from "react";
import Loader from "../../../components/Loader";
import ErrorDisplay from "../../../components/ErrorDisplay";
import PaginationComp from "../../../components/initiative/PaginationLinks";
import { useVolunteers } from "../../../hooks/use-volunteers";
import VolunteerToolbar, { type VolunteerFiltersType } from "./VolunteerToolbar.tsx";
import VolunteerStats from "./VolunteerStats.tsx";
import VolunteerGrid from "./VolunteerGrid.tsx";


interface Props {
  campaignId: number;
  campaignStartDate: String;
  campaignEndDate: String;
}

const DEFAULT_FILTERS: VolunteerFiltersType = {
  search: "",
  status: "",
  college: "",
};

const VolunteerManagementPage = ({ campaignId, campaignStartDate, campaignEndDate }: Props) => {

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<VolunteerFiltersType>( DEFAULT_FILTERS );

  const { data, isLoading, error, } = useVolunteers({
    campaignId,
    page,
    size: 4,

    searchText: filters.search,
    status: filters.status,
    collegeId: filters.college,
  });

  const volunteers = data?.content ?? [];

  const stats = useMemo(() => {
    return {
      total: volunteers.length,
      approved: volunteers.filter( (v) => v.applicationStatus === "APPROVED" ).length,
      pending: volunteers.filter( (v) => v.applicationStatus === "PENDING" ).length,
      rejected: volunteers.filter( (v) => v.applicationStatus === "REJECTED" ).length,
    };
  }, [volunteers]);

  if (isLoading) { return <Loader />; }

  if (error) { return ( <ErrorDisplay message="حدث خطأ أثناء تحميل المتطوعين" /> ); }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          إدارة المتطوعين
        </h2>

        <p className="text-sm text-muted-foreground font-[Thamanyah2]">
          قبول ورفض الطلبات وإدارة الحضور والساعات التطوعية.
        </p>
      </div>

      <VolunteerStats stats={stats} />

      <VolunteerToolbar
        filters={filters}
        onChange={(newFilters) => {
          setPage(0);
          setFilters(newFilters);
        }}
      />

      <VolunteerGrid
        volunteers={volunteers}
        campaignId={campaignId}
        campaignStartDate={campaignStartDate}
        campaignEndDate={campaignEndDate}
      />

      <PaginationComp
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages ?? 0}
      />
    </div>
  );
};

export default VolunteerManagementPage;