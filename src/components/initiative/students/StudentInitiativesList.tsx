import StudentInitiativeCard from "./StudentInitiativeCard.tsx";
import type {AttendedCampaign} from "../../../schemas/campaignsSchema.ts";

interface Props {
    initiatives: AttendedCampaign[];
    isLoading: boolean;
}

const StudentInitiativesList = ({initiatives, isLoading}: Props) => {
    if (isLoading) return <p className="ml-10 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-600">
        جاري التحميل...
    </p>;
    return (
        <section>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {initiatives.length === 0 && (
                    <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-600 col-span-2 font-[Thamanyah2]">لا توجد مبادرات.</p>
                )}

                {initiatives.map((initiative) => (
                    <StudentInitiativeCard key={initiative.campaignId} initiative={initiative} hours={initiative.totalHours} />
                ))}
            </div>
        </section>

    );
};

export default StudentInitiativesList;