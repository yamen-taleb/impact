import initiativeDetails from "../data/initiativeDetails.json";
import { initiativeDetailsSchema } from "../schemas/initiativeDetailsSchema.ts";
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
import userData from "../../src/data/userData.json";
import InitiativeDetailsVolunteersAvatar from "../components/initiative/details/InitiativeDetailsVolunteersAvatar.tsx";
import { useGetCampaignById } from "../hooks/use-initiative.ts";
import { useParams } from "react-router";

const InitiativeDetails = () => {
	const { initiativeId } = useParams();

    const campaignId = Number(initiativeId);

    const {
        data: initiative,
        isLoading,
        error
    } = useGetCampaignById(campaignId);

    const userRole =
        userData.additionalInfo.role;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error || !initiative) {
        return (
        <InitiativeDetailsEmptyState />
        );
    }

    console.log(initiative);


	return (
        <section className="mx-auto max-w-6xl space-y-6">

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <InitiativeDetailsHero initiative={initiative}/>
                <InitiativeDetailsMetaGrid
                    college={String(initiative.collegeId)}
                    category={initiative.category}
                    address={initiative.location}
                    estimatedTimeToComplete={String(initiative.endDate ? new Date(initiative.endDate).getTime() - new Date(initiative.startDate).getTime() : null)}
                    startDate={initiative.startDate}
                    endDate={initiative.endDate}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <InitiativeDetailsDescription description={initiative.description}/>
                <InitiativeDetailsProgress percentage={Number(initiative.lastProgress?.percentage)}/>
            </div>      

            <InitiativeDetailsActions/>

            <InitiativeDetailsVolunteersAvatar />

            {(userRole === "Admin" || userRole === "Manager") && (
                <div className="flex flex-col gap-5">

                    {(userRole === "Manager") && (
                        <InitiativeApprove />
                    )}

                    <div className="flex gap-6">
                        <InitiativeDates />
                        <InitiativeMaxVolunteers />
                    </div>

                    <Volunteer />
                    
                    <ProgressManagement />
                </div>
            )}
        </section>
);
};

export default InitiativeDetails;
