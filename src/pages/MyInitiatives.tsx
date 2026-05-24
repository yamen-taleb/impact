import BaseInitiatives from "../components/initiative/BaseInitiatives.tsx";
import {useStudentInitiativesContext} from "../context/StudentIniativesContext.tsx";
import InitiativeHeader from "../components/initiative/InitiativeHeader.tsx";

const MyInitiatives = () => {
    const {
        initiatives,
        totalPages,
        isLoading,
        error,
        page,
        setPage,
        handleFiltersChange
    } = useStudentInitiativesContext();
    return (
        <div className="flex flex-col gap-6 pr-10 mb-25">
            <InitiativeHeader onFiltersChange={handleFiltersChange} />
            <BaseInitiatives initiatives={initiatives} isLoading={isLoading} error={error} page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    );
};

export default MyInitiatives;