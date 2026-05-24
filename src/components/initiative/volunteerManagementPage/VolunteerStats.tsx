import { CheckCircle2, Clock3, Users, XCircle } from "lucide-react";
import { toArabicNumbers } from "../../../lib/utils";

interface Props {
  stats: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
}

const cards = [
  {
    key: "total",
    label: "إجمالي المتطوعين",
    icon: Users,
    textColor: "text-zinc-600",
    numberColor: "text-zinc-900",
    bgColor: "bg-white",
    borderColor: "border-zinc-200"
  },

  {
    key: "approved",
    label: "المقبولين",
    icon: CheckCircle2,
    textColor: "text-green-600",
    numberColor: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },

  {
    key: "pending",
    label: "قيد المراجعة",
    icon: Clock3,
    textColor: "text-amber-600",
    numberColor: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  },

  {
    key: "rejected",
    label: "المرفوضين والمفصولين",
    icon: XCircle,
    textColor: "text-red-600",
    numberColor: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
] as const;

const VolunteerStats = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className={`rounded-2xl border ${card.bgColor} p-5 shadow-sm ${card.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${card.textColor}`}>
                  {card.label}
                </p>

                <h3 className={`mt-2 text-3xl font-bold ${card.numberColor}`}>
                  {toArabicNumbers(stats[card.key])}
                </h3>
              </div>

              <div className={`rounded-xl ${card.textColor} p-3`}>
                <Icon className="size-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VolunteerStats;