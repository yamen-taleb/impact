import VolunteerManagementPage from "./VolunteerManagementPage";


interface Props {
  campaignId: number;
}

const VolunteerManagementSection = ({
  campaignId,
}: Props) => {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      <VolunteerManagementPage campaignId={campaignId} />
    </section>
  );
};

export default VolunteerManagementSection;