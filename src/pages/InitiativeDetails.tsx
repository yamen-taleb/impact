import initiativeDetails from "../data/initiativeDetails.json";
import { initiativeDetailsSchema } from "../schemas/initiativeDetailsSchema.ts";
import InitiativeDetailsEmptyState from "../components/initiative/details/InitiativeDetailsEmptyState.tsx";
import InitiativeDetailsHero from "../components/initiative/details/InitiativeDetailsHero.tsx";
import InitiativeDetailsMetaGrid from "../components/initiative/details/InitiativeDetailsMetaGrid.tsx";
import InitiativeDetailsDescription from "../components/initiative/details/InitiativeDetailsDescription.tsx";
import InitiativeDetailsProgress from "../components/initiative/details/InitiativeDetailsProgress.tsx";
import InitiativeDetailsActions from "../components/initiative/details/InitiativeDetailsActions.tsx";

const InitiativeDetails = () => {
	const parsed = initiativeDetailsSchema.safeParse(initiativeDetails);

	if (!parsed.success) {
		return <InitiativeDetailsEmptyState />;
	}

	const initiative = parsed.data;

	return (
        <section className="mx-auto max-w-5xl space-y-6">

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <InitiativeDetailsHero initiative={initiative}/>
                <InitiativeDetailsMetaGrid
                    college={initiative.college}
                    category={initiative.category}
                    address={initiative.address}
                    estimatedTimeToComplete={initiative.estimatedTimeToComplete}
                    startDate={initiative.startDate}
                    endDate={initiative.endDate}
                />
            </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <InitiativeDetailsDescription description={initiative.description}/>
                    <InitiativeDetailsProgress percentage={initiative.percentage}/>
                </div>

                <InitiativeDetailsActions/>
        </section>
);
};

export default InitiativeDetails;
