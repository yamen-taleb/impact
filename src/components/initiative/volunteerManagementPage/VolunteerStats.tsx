import {
  CheckCircle2,
  Clock3,
  Users,
  XCircle,
} from "lucide-react";

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
  },

  {
    key: "approved",
    label: "المقبولين",
    icon: CheckCircle2,
  },

  {
    key: "pending",
    label: "قيد المراجعة",
    icon: Clock3,
  },

  {
    key: "rejected",
    label: "المرفوضين",
    icon: XCircle,
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
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.label}
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {stats[card.key]}
                </h3>
              </div>

              <div className="rounded-xl bg-zinc-100 p-3">
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