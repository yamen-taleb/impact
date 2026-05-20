import { UserCampaignsProvider, useUserCampaignsContext } from "../context/UserCampaignsContext";
import { useGetMyUser } from "../hooks/use-user";
import Filters from "../components/initiative/Filters.tsx";
import PaginationLinks from "../components/initiative/PaginationLinks.tsx";
import StudentInitiativeHeader from "../components/initiative/students/StudentInitiativeHeader.tsx";
import StudentInitiativeStats from "../components/initiative/students/StudentInitiativeStats.tsx";
import StudentInitiativesList from "../components/initiative/students/StudentInitiativesList.tsx";
import {useParams} from "react-router";


const StudentInitiativesContent = () => {
    const { 
        campaigns, 
        isLoading, 
        error, 
        totalHours, 
        totalCampaigns,
        page,
        setPage,
        totalPages,
        handleFiltersChange,
        filters
    } = useUserCampaignsContext();

    if (error) return <p className="ml-10 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
        حدث خطأ أثناء تحميل المبادرات
    </p>;
    
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
            <StudentInitiativeHeader/>

            <StudentInitiativeStats initiativesCount={totalCampaigns} totalHours={totalHours} />

            <Filters onFiltersChange={handleFiltersChange} initialFilters={filters} />

            <StudentInitiativesList initiatives={campaigns} isLoading={isLoading}/>

            <PaginationLinks page={page} setPage={setPage} totalPages={totalPages}/>
        </div>
    );
};

const StudentInitiativesPage = () => {
    const {id} = useParams()
    return (
        <UserCampaignsProvider userId={id}>
            <StudentInitiativesContent />
        </UserCampaignsProvider>
    );
};

export default StudentInitiativesPage;
