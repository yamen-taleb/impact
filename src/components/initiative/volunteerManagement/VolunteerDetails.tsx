import UserCard from "./UserCard";

import VolunteerData from "../../../data/volunteer.json";
import { volunteersSchema } from "../../../schemas/volunteerSectionSchema";

const VolunteerDetails = () => {

  const volunteers = volunteersSchema.parse(VolunteerData);

  console.log(volunteers);

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-6">
      {volunteers.map((volunteer) => (
          <UserCard key={volunteer.id} volunteer={volunteer}/>
      ))}
    </div>
  );
};

export default VolunteerDetails;
