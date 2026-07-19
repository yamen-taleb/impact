import { toArabicNumbers } from "../../../lib/utils";

interface Props {
    initiativesCount: number;
    totalHours: number;
}

export const formatHours = (hours: number) => {
  if (hours === 1) return "ساعة";
  if (hours === 2) return "ساعتان";
  if (hours >= 3 && hours <= 10) return "ساعات";

  return "ساعة";
};

const StudentInitiativeStats = ({initiativesCount, totalHours}: Props) => {
  return (
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-4">
              <p className="text-sm text-zinc-500">عدد المبادرات</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-900 font-[Thamanyah2]">{toArabicNumbers(initiativesCount)}</p>
          </div>
          <div className="rounded-lg border bg-white border-dashed border-zinc-300 p-4">
              <p className="text-sm text-zinc-500">مجموع ساعات التطوع</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-900 font-[Thamanyah2]">
                {toArabicNumbers(totalHours ?? 0)} {formatHours(totalHours ?? 0)}
              </p>
          </div>
      </section>
  );
};

export default StudentInitiativeStats;