interface Props {
  status: string;
  removed?: boolean;
}

const VolunteerStatusBadge = ({
  status,
  removed,
}: Props) => {
  if (removed) {
    return (
      <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
        مفصول
      </div>
    );
  }

  switch (status) {
    case "APPROVED":
      return (
        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          مقبول
        </div>
      );

    case "PENDING":
      return (
        <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          قيد المراجعة
        </div>
      );

    default:
      return (
        <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
          مرفوض
        </div>
      );
  }
};

export default VolunteerStatusBadge;