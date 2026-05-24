import UserCard from "./UserCard";
import { useState } from "react";

import PaginationLinks from "../../../components/initiative/PaginationLinks.tsx";

import VolunteerFilters, { type VolunteerFiltersType } from "../VolunteerFilters.tsx";

import { useVolunteers } from "../../../hooks/use-volunteers";

import Loader from "../../../components/Loader.tsx";
import ErrorDisplay from "../../../components/ErrorDisplay.tsx";

interface Props {
  campaignId: number;
}

const VolunteerDetails = ({
  campaignId, 
}: Props) => {
  const [page, setPage] = useState(0);

  const [filters, setFilters] =
    useState<VolunteerFiltersType>({
      search: "",
      status: "",
      college: "",
    });

  const {
    data,
    isLoading,
    error,
  } = useVolunteers({
    campaignId,

    page,
    size: 6,

    searchText: filters.search,
    status: filters.status,
    collegeId: filters.college,
  });

  console.log(data);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <ErrorDisplay message="حدث خطأ أثناء تحميل المتطوعين" />
    );

  const volunteers = data?.content || [];

  const totalPages = data?.totalPages || 0;

  return (
    <div className="flex flex-col gap-5">
      <VolunteerFilters
        onFiltersChange={(newFilters) => {
          setPage(0);

          setFilters(newFilters);
        }}
      />

      {volunteers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-zinc-500">
          لا يوجد متطوعين مطابقين
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6">
            {volunteers.map((volunteer) => (
              <UserCard
                key={volunteer.applicationId}
                volunteer={volunteer}
                campaignId={campaignId}
              />
            ))}
          </div>

          <PaginationLinks
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default VolunteerDetails;