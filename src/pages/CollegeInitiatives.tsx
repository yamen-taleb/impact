import InitiativeHeader from "../components/initiative/InitiativeHeader.tsx";
import BaseInitiatives from "../components/initiative/BaseInitiatives.tsx";
import {useCollegeInitiativesContext} from "../context/CollegeInitiativeContext.tsx";

const CollegeInitiatives = () => {
  const {
    initiatives,
    totalPages,
    isLoading,
    error,
    page,
    setPage,
    handleFiltersChange
  } = useCollegeInitiativesContext();
  return (
      <div className="flex flex-col gap-6 pr-10 mb-25">
        <InitiativeHeader onFiltersChange={handleFiltersChange} />
        <BaseInitiatives initiatives={initiatives} isLoading={isLoading} error={error} page={page} setPage={setPage}
                         totalPages={totalPages}/>
      </div>
  );
};

export default CollegeInitiatives;