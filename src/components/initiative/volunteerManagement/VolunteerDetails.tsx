import UserCard from "./UserCard";

import VolunteerData from "../../../data/volunteer.json";
import { volunteersSchema } from "../../../schemas/volunteerSectionSchema";
import { useState } from "react";
import PaginationLinks from "../../../components/initiative/PaginationLinks.tsx";

const VolunteerDetails = () => {

  const volunteers = volunteersSchema.parse(VolunteerData);

  const [page, setPage] = useState(0);
  const totalPages = 6;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 grid-rows-2 gap-6">
        {volunteers.map((volunteer) => (
            <UserCard key={volunteer.id} volunteer={volunteer}/>
        ))}
      </div>

      <PaginationLinks page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default VolunteerDetails;
