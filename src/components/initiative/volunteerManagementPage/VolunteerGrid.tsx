import type { Volunteer } from "../../../schemas/volunteerSectionSchema";
import VolunteerCard from "./VolunteerCard";


interface Props {
  volunteers: Volunteer[];
  campaignId: number;
}

const VolunteerGrid = ({
  volunteers,
  campaignId,
}: Props) => {
  if (volunteers.length === 0) {
    return (
      <div className="flex min-h-[250px] items-center justify-center rounded-3xl border border-dashed bg-zinc-50 text-muted-foreground">
        لا يوجد متطوعين مطابقين
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {volunteers.map((volunteer) => (
        <VolunteerCard
          key={volunteer.applicationId}
          volunteer={volunteer}
          campaignId={campaignId}
        />
      ))}
    </div>
  );
};

export default VolunteerGrid;