import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.tsx";
import {Badge} from "../ui/badge.tsx";
import {ChevronLeft, Image} from 'lucide-react';
import userData from "../../data/userData.json";
import {Link} from "react-router";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import type {Initiative} from "../../schemas/initiativePageSchema.ts";

interface Props {
    initiative: Initiative;
}

const statusConfig = {
    RESOLVED: {
        label: "تم الحل",
        className: "bg-green-100 text-green-700 border-green-200",
    },
    REJECTED: {
        label: "مرفوضة",
        className: "bg-red-100 text-red-700 border-red-200",
    },
    APPROVED: {
        label: "جاري حل المبادرة",
        className: "bg-slate-100 text-slate-700 border-slate-200",
    },
    PENDING_APPROVAL: {
        label: "بانتظار الموافقة",
        className: "bg-amber-100 text-amber-700 border-amber-200",
    },
};

const InitiativeCard = ({initiative}: Props) => {
    const user = userData.personalInfo;
    const status = statusConfig[initiative.status as keyof typeof statusConfig] ?? {
        label: "جاري حل المبادرة",
        className: "bg-slate-100 text-slate-700 border-slate-200",
    };

  return (
      <Card className="w-full h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg !py-0 !gap-0">
          <div className="relative h-44 w-full bg-slate-100">
              {initiative.photo ? (
                  <img
                      src={initiative.photo}
                      alt="صورة المبادرة"
                      className="h-full w-full object-cover"
                  />
              ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                      <Image size={48} />
                  </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
          </div>

          <CardHeader className="space-y-4 p-5 pb-3">
              <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                      <CardDescription className="text-xs text-slate-500">
                          {user?.firstName} {user?.lastName ?? "مستخدم مجهول"} - {new Date(initiative.submissionDate).toLocaleDateString("ar-SY")}
                      </CardDescription>
                      <CardTitle className="line-clamp-2 text-lg leading-6 text-slate-900">{initiative.title}</CardTitle>
                  </div>

                  <span
                      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
                  >
                      {status.label}
                  </span>
              </div>
          </CardHeader>

          <CardContent className="space-y-4 px-5 pb-4">
              <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                  {initiative.description}
              </p>

              <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="rounded-full border-zinc-900 bg-zinc-900/90 px-3 py-1 text-white">
                      {initiative.college ?? "غير معروف"}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-800">
                      {initiative.category ?? "غير معروف"}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-zinc-300 bg-white px-3 py-1 text-zinc-700">
                      {initiative.address?.slice(0, 20) ?? "غير معروف"}
                  </Badge>
              </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-4 px-5 pb-5 pt-2">
              <Link
                  to={`/initiatives/${initiative.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                  <span>المزيد من التفاصيل</span>
                  <ChevronLeft size={16} />
              </Link>

              <CircularProgressbarWithChildren
                  value={initiative.percentage}
                  className="h-16 w-16 shrink-0"
                  styles={buildStyles({
                      pathTransitionDuration: 0.5,
                      pathColor: "#111827",
                      trailColor: "#e5e7eb",
                  })}
              >
                  <span className="text-sm font-semibold text-slate-900">{initiative.percentage}%</span>
              </CircularProgressbarWithChildren>
          </CardFooter>
      </Card>
);
};

export default InitiativeCard;