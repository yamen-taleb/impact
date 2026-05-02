import initiativesData from "../data/initiatives.json";
import Filters from "../components/initiative/Filters.tsx";
import {initiativesSchema} from "../schemas/initiativePageSchema.ts";
import PaginationLinks from "../components/initiative/PaginationLinks.tsx";
import {useState} from "react";
import StudentInitiativeHeader from "../components/initiative/students/StudentInitiativeHeader.tsx";
import StudentInitiativeStats from "../components/initiative/students/StudentInitiativeStats.tsx";
import StudentInitiativesList from "../components/initiative/students/StudentInitiativesList.tsx";


const StudentInitiativesPage = () => {
    const initiatives = initiativesSchema.parse(initiativesData);
    const totalHours = 300;
    const initiativesCount = 6;
    const [page, setPage] = useState(1);

    if (initiatives.length === 0) {
        return (
            <p className="rounded-lg ml-10 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-md font-medium text-zinc-500">لم يتطوع هذا الطالب بأي مبادرة حتى الآن.</p>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
            <StudentInitiativeHeader/>

            <StudentInitiativeStats initiativesCount={initiativesCount} totalHours={totalHours} />

            <Filters/>

            <StudentInitiativesList initiatives={initiatives}/>

            <PaginationLinks page={page} setPage={setPage} totalPages={5}/>
        </div>
    );
};

export default StudentInitiativesPage;

