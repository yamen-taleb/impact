import { Check, Clock, UserX, XIcon } from "lucide-react";

interface Props {
  status: string;
  removed?: boolean;
}

const VolunteerStatusBadge = ({ status, removed }: Props) => {
  if (removed) {
    return (
      <div className="flex gap-2 rounded-[0.8rem] w-[26%] h-8 px-3 py-1 text-sm justify-center items-center text-red-600 bg-red-50 border border-red-200 shadow-sm">
        مفصول
        <UserX size={16} />
      </div>
    );
  }

  switch (status) {
    case "APPROVED":
      return (
        <div className="flex gap-2 rounded-[0.8rem] w-[26%] h-8 px-3 py-1 text-sm justify-center items-center text-emerald-600 bg-emerald-50 border border-green-200 shadow-sm">
          مقبول
          <Check size={18} />
        </div>
      );

    case "PENDING":
      return (
        <div className="flex gap-2 rounded-[0.8rem] w-[26%] h-8 px-3 py-1 text-sm justify-center items-center text-amber-600 bg-orange-50 border border-amber-200 shadow-sm">
          قيد المراجعة
          <Clock size={16}/>
        </div>
      );
    

    default:
      return (
        <div className="flex gap-2 rounded-[0.8rem] w-[26%] h-8 px-3 py-1 text-sm justify-center items-center text-red-600 bg-red-50 border border-red-200 shadow-sm">
          مرفوض
          <XIcon size={18} />
        </div>
      );
  }
};

export default VolunteerStatusBadge;