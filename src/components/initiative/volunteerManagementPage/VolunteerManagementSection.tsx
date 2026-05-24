import VolunteerManagementPage from "./VolunteerManagementPage";


interface Props {
  campaignId: number;
  campaignStartDate: String;
  campaignEndDate: String;
}

const VolunteerManagementSection = ({
  campaignId,
  campaignStartDate,
  campaignEndDate
}: Props) => {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      <VolunteerManagementPage campaignId={campaignId} campaignStartDate={campaignStartDate} campaignEndDate={campaignEndDate} />
    </section>
  );
};

export default VolunteerManagementSection;