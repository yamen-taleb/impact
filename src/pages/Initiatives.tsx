import InitiativeHeader from "../components/initiative/InitiativeHeader";
import InitiativeCard from "../components/initiative/InitiativeCard.tsx";
import { initiativesSchema } from "../schemas/initiativePageSchema.ts";
import initiativesData from "../data/initiatives.json";
import {useState} from "react";
import PaginationLinks from "../components/initiative/PaginationLinks.tsx";

import userData from "../data/userData.json";

const Initiatives = () => {
    const initiatives = initiativesSchema.parse(initiativesData);
    const isLoading = false;
    const [page, setPage] = useState(0);
    const totalPages = 6;

    const userRole = userData.additionalInfo.role;


    return (
        <div className="flex flex-col gap-6 pr-10 mb-25">
            <InitiativeHeader/>

            {(userRole === "Admin" || userRole === "User") && (
                <div>
                    {isLoading ? (
                        <p className="ml-10 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-600">
                            جاري التحميل...
                        </p>
                    ) : initiatives.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 pl-10 md:grid-cols-2 xl:grid-cols-3">
                            {initiatives.map((initiative) => (
                                <InitiativeCard key={initiative.id} initiative={initiative}/>
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-lg ml-10 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-sm font-medium text-zinc-500 font-[Thamanyah2]">
                            لا يوجد مبادرات حتى الآن...
                        </p>
                    )}
                </div>
            )}

            {(userRole === "Manager") && (
                <div>
                    {isLoading ? (
                        <p className="ml-10 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-600">
                            جاري التحميل...
                        </p>
                    ) : initiatives.length > 0 ? (
                        // <div className="grid grid-cols-1 gap-5 pl-10 md:grid-cols-2 xl:grid-cols-3">
                        //     {initiatives.map((initiative) => (
                        //         <InitiativeCard key={initiative.id} initiative={initiative}/>
                        //     ))}
                        // </div>
                        <div></div>
                    ) : (
                        <p className="rounded-lg ml-10 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-sm font-medium text-zinc-500 font-[Thamanyah2]">
                            لا يوجد مبادرات حتى الآن...
                        </p>
                    )}
                </div>
            )}
            <PaginationLinks page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

export default Initiatives;