import InitiativeDetailsEmptyState from "../components/initiative/details/InitiativeDetailsEmptyState.tsx";
import InitiativeDetailsHero from "../components/initiative/details/InitiativeDetailsHero.tsx";
import InitiativeDetailsMetaGrid from "../components/initiative/details/InitiativeDetailsMetaGrid.tsx";
import InitiativeDetailsDescription from "../components/initiative/details/InitiativeDetailsDescription.tsx";
import InitiativeDetailsProgress from "../components/initiative/details/InitiativeDetailsProgress.tsx";
import InitiativeDetailsActions from "../components/initiative/details/InitiativeDetailsActions.tsx";
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
import InitiativeProgressHistory from "../components/initiative/details/InitiativeProgressHistory.tsx";
import { useGetMyUser } from "../hooks/use-user.ts";

const InitiativeDetails = () => {
    const userRole = getUserRole();
    const { currentUser } = useGetMyUser();


	const { initiativeId } = useParams();
    const campaignId = Number(initiativeId);

    const {
        data: initiative,
        isLoading,
        error,
    } = useGetCampaignById(campaignId);

    console.log(initiative);
    
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
                <InitiativeDetailsDescription 
                    description={initiative.description} 
                    proposedByName={initiative.proposedByName} 
                    managedByName={initiative.managedByName} 
                    currentUserRole={userRole}
                />
                <InitiativeDetailsProgress percentage={Number(initiative.lastProgress?.percentage ?? 0)} status={initiative.status} rejectedReason={initiative.rejectedReason}/>
            </div>      

        
            <InitiativeDetailsActions 
                campaignId={campaignId}
                initiativeStatus={initiative.status}
            />

            <InitiativeDetailsVolunteersAvatar campaignId={campaignId}/>

            {(userRole === "User" && (initiative.status === "ONGOING" || initiative.status === "COMPLETED")) && (
                <InitiativeProgressHistory campaignId={campaignId} />
            )}

            {((userRole === "Admin"  && (currentUser?.collegeName === initiative?.college?.name) && (initiative.status !== "PENDING" && initiative.status !== "REJECTED")) || userRole === "Manager") && (
                <div className="flex flex-col gap-5">

                    {(userRole === "Manager") && (
                        <InitiativeApprove
                            campaignId={campaignId}
                            initiative={initiative}
                        />
                    )}

                    {(initiative.status === "APPROVED" || initiative.status === "ONGOING" || initiative.status === "COMPLETED") && (
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-6">
                                <InitiativeDates initiative={initiative} />
                                <InitiativeMaxVolunteers initiative={initiative} />
                            </div>
        
                            {/* <Volunteer campaignId={campaignId} /> */}
                            {(initiative.status === "ONGOING" || initiative.status === "COMPLETED") && (
                                <VolunteerManagementSection campaignId={campaignId} campaignStartDate={initiative.startDate} campaignEndDate={initiative.endDate}  />
                            )}
                            
                            <ProgressManagement campaignId={campaignId} />

                        </div>
                    )}
                </div>
            )}
        </section>
);
};

export default InitiativeDetails;
