import { useMemo, useState } from "react";
import ApplicationsList  from "../components/application/ApplicationsList.tsx";
import { applicationsSchema } from "../schemas/applicationSchema.ts";
import applicationsData from "../data/applications.json";
import ApplicationHeader from "../components/application/ApplicationHeader.tsx";
import ApplicationsStats from "../components/application/ApplicationsStats.tsx";
import ApplicationsFilter from "../components/application/ApplicationsFilter.tsx";
import type {FilterStatus} from "../types.ts";
import ApplicationWithdrawDialog from "../components/application/ApplicationWithdrawDialog.tsx";
import PaginationLinks from "../components/initiative/PaginationLinks.tsx";

const Applications = () => {
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
    const [applications, setApplications] = useState(
        applicationsSchema.parse(applicationsData)
    );
    const [open, setOpen] = useState(false);
    const [deleteApplicationId, setDeleteApplicationId] = useState<string | number | null>(null);
    const [page, setPage] = useState(1);

    const filteredApplications = useMemo(() => {
        if (filterStatus === "ALL") {
            return applications;
        }
        return applications.filter((app) => app.status === filterStatus);
    }, [applications, filterStatus]);

    const statsCount = {
        total: applications.length,
        accepted: applications.filter((a) => a.status === "ACCEPTED").length,
        pending: applications.filter((a) => a.status === "PENDING").length,
        rejected: applications.filter((a) => a.status === "REJECTED").length,
    };

    const handleOpenDialogDeleteApplication = (id: string | number) => {
        setOpen(true);
        setDeleteApplicationId(id);
    };

    const handleDeleteApplication = () => {
        if (deleteApplicationId !== null) {
            setApplications((prev) =>
                prev.filter((app) => app.id !== deleteApplicationId)
            );
            setDeleteApplicationId(null);
            setOpen(false);
        }
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
            <ApplicationHeader/>

            <ApplicationsStats statsCount={statsCount} />

            <ApplicationsFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

            <ApplicationsList filteredApplications={filteredApplications} handleOpenDialogDeleteApplication={handleOpenDialogDeleteApplication} />

            <ApplicationWithdrawDialog open={open} handleDeleteApplication={handleDeleteApplication} setOpen={setOpen} />

            <PaginationLinks page={page} setPage={setPage} totalPages={5}  />
        </div>
    );
};

export default Applications;

