import InitiativeHeader from "../components/initiative/InitiativeHeader.tsx";
import BaseInitiatives from "../components/initiative/BaseInitiatives.tsx";
import {useCollegeInitiativesContext} from "../context/CollegeInitiativeContext.tsx";
import type {Initiative} from "../schemas/initiativePageSchema.ts";
import InitiativeCard from "../components/initiative/InitiativeCard.tsx";

const CollegeInitiatives = () => {
  const {
    initiatives,
    totalPages,
    isLoading,
    error,
    page,
    setPage,
    handleFiltersChange,
      userRole
  } = useCollegeInitiativesContext();
  const isAdmin = userRole === "Admin";
  return isAdmin && (
      <div className="flex flex-col gap-6 pr-10 mb-25">
        <InitiativeHeader onFiltersChange={handleFiltersChange} />
        <BaseInitiatives initiatives={initiatives} isLoading={isLoading} error={error} page={page} setPage={setPage}
                         totalPages={totalPages}>
            <div className="grid grid-cols-1 gap-5 pl-10 md:grid-cols-2 xl:grid-cols-3">
                {initiatives.map((initiative: Initiative, index: number) => (
                    <InitiativeCard
                        key={`${initiative.campaignId}-${page}-${index}`}
                        initiative={initiative}
                    />
                ))}
            </div>
        </BaseInitiatives>
      </div>
  );
};

export default CollegeInitiatives;
