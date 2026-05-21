import { useState } from "react";
import ApplicationsList from "../components/application/ApplicationsList.tsx";
import ApplicationHeader from "../components/application/ApplicationHeader.tsx";
import ApplicationsStats from "../components/application/ApplicationsStats.tsx";
import ApplicationsFilter from "../components/application/ApplicationsFilter.tsx";
import ApplicationWithdrawDialog from "../components/application/ApplicationWithdrawDialog.tsx";
import PaginationLinks from "../components/initiative/PaginationLinks.tsx";
import { ApplicationsProvider, useApplicationsContext } from "../context/AppilcationsContext.tsx";
import { useGetMyUser } from "../hooks/use-user.ts";
import Loader from "../components/Loader.tsx";
import ErrorDisplay from "../components/ErrorDisplay.tsx";

const ApplicationsContent = () => {
    const {
        applications,
        isLoading,
        error,
        stats,
        filterStatus,
        setFilterStatus,
        page,
        setPage,
        totalPages,
    } = useApplicationsContext();
    
    const [open, setOpen] = useState(false);
    const [deleteApplicationId, setDeleteApplicationId] = useState<string | number | null>(null);

    const handleOpenDialogDeleteApplication = (id: string | number) => {
        setOpen(true);
        setDeleteApplicationId(id);
    };

    const handleDeleteApplication = () => {
        // This should be a mutation
        console.log("Deleting", deleteApplicationId);
        setOpen(false);
    };

    if (isLoading) return <Loader />;
    if (error) return <ErrorDisplay message="حدث خطأ أثناء تحميل الطلبات" />;

    if (!applications || applications.length === 0) {
        return (
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
                <ApplicationHeader />
                <ApplicationsStats statsCount={stats} />
                <ApplicationsFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
                <p className="rounded-lg mt-4 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-md font-medium text-zinc-500">
                    لا توجد أي طلبات تطوع حتى الآن.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
            <ApplicationHeader />
            <ApplicationsStats statsCount={stats} />
            <ApplicationsFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
            <ApplicationsList filteredApplications={applications} handleOpenDialogDeleteApplication={handleOpenDialogDeleteApplication} />
            <ApplicationWithdrawDialog open={open} handleDeleteApplication={handleDeleteApplication} setOpen={setOpen} />
            <PaginationLinks page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

const Applications = () => {
    const { currentUser, isLoading } = useGetMyUser();

    if (isLoading || !currentUser) return <Loader />;

    return (
        <ApplicationsProvider userId={currentUser.userId}>
            <ApplicationsContent />
        </ApplicationsProvider>
    );
};

export default Applications;
