import type {Initiative} from "../../../schemas/initiativePageSchema.ts";
import StudentInitiativeCard from "./StudentInitiativeCard.tsx";

interface Props {
    initiatives: Initiative[];
}

const StudentInitiativesList = ({initiatives}: Props) => {
    return (
        <section>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {initiatives.length === 0 && (
                    <p className="text-sm text-zinc-600">لا توجد مبادرات تطابق الفلاتر المحددة.</p>
                )}

                {initiatives.map((initiative) => (
                    <StudentInitiativeCard key={initiative.id} initiative={initiative} hours={30} />
                ))}
            </div>
        </section>

    );
};

export default StudentInitiativesList;