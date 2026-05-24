import InitiativeDetailsEmptyState from "../components/initiative/details/InitiativeDetailsEmptyState.tsx";
import InitiativeDetailsHero from "../components/initiative/details/InitiativeDetailsHero.tsx";
import InitiativeDetailsMetaGrid from "../components/initiative/details/InitiativeDetailsMetaGrid.tsx";
import InitiativeDetailsDescription from "../components/initiative/details/InitiativeDetailsDescription.tsx";
import InitiativeDetailsProgress from "../components/initiative/details/InitiativeDetailsProgress.tsx";
import InitiativeDetailsActions from "../components/initiative/details/InitiativeDetailsActions.tsx";
import Volunteer from "../components/initiative/volunteerManagement/Volunteer.tsx";
import InitiativeApprove from "../components/initiative/InitiativeApprove.tsx";
import InitiativeDates from "../components/initiative/InitiativeDates.tsx";
import InitiativeMaxVolunteers from "../components/initiative/InitiativeMaxVolunteers.tsx";
import ProgressManagement from "../components/initiative/ProgressManagement.tsx";
import InitiativeDetailsVolunteersAvatar from "../components/initiative/details/InitiativeDetailsVolunteersAvatar.tsx";
import { useParams } from "react-router";
import { useGetCampaignById } from "../hooks/use-initiative.ts";
import { getUserRole } from "../lib/utils.ts";
import Loader from "../components/Loader.tsx";
import VolunteerManagementSection from "../components/initiative/volunteerManagementPage/VolunteerManagementSection.tsx";

const InitiativeDetails = () => {
    const userRole = getUserRole();

	const { initiativeId } = useParams();
    const campaignId = Number(initiativeId);

    const {
        data: initiative,
        isLoading,
        error,
    } = useGetCampaignById(campaignId);

    
    if (isLoading) {
        return <Loader />;
    }

    if (error || !initiative) {
        return <InitiativeDetailsEmptyState />;
    }

	return (
        <section className="mx-auto max-w-6xl space-y-6">

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <InitiativeDetailsHero initiative={initiative}/>
                <InitiativeDetailsMetaGrid
                    college={String(initiative.college.name)}
                    category={initiative.category}
                    address={initiative.location}
                    startDate={initiative.startDate}
                    endDate={initiative.endDate}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <InitiativeDetailsDescription description={initiative.description} proposedByName={initiative.proposedByName} managedByName={initiative.managedByName} />
                <InitiativeDetailsProgress percentage={Number(initiative.lastProgress?.percentage ?? 0)} status={initiative.status} rejectedReason={initiative.rejectedReason}/>
            </div>      

        
            <InitiativeDetailsActions campaignId={campaignId}/>

            <InitiativeDetailsVolunteersAvatar campaignId={campaignId}/>

            {((userRole === "Admin" && (initiative.status !== "PENDING" && initiative.status !== "REJECTED")) || userRole === "Manager") && (
                <div className="flex flex-col gap-5">

                    {(userRole === "Manager") && (
                        <InitiativeApprove
                            campaignId={campaignId}
                            initiative={initiative}
                        />
                    )}

                    <div className="flex gap-6">
                        <InitiativeDates initiative={initiative} />
                        <InitiativeMaxVolunteers initiative={initiative} />
                    </div>

                    {/* <Volunteer campaignId={campaignId} /> */}
                    <VolunteerManagementSection campaignId={campaignId} campaignStartDate={initiative.startDate} campaignEndDate={initiative.endDate}  />
                    
                    <ProgressManagement />
                </div>
            )}
        </section>
);
};

export default InitiativeDetails;
