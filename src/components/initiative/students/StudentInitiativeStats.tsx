interface Props {
    initiativesCount: number;
    totalHours: number;
}

const StudentInitiativeStats = ({initiativesCount, totalHours}: Props) => {
  return (
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-4">
              <p className="text-sm text-zinc-500">عدد المبادرات</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-900">{initiativesCount}</p>
          </div>
          <div className="rounded-lg border bg-white border-dashed border-zinc-300 p-4">
              <p className="text-sm text-zinc-500">مجموع ساعات التطوع</p>
              <p className="mt-1 text-2xl font-semibold text-zinc-900">{totalHours} ساعة</p>
          </div>
      </section>
  );
};

export default StudentInitiativeStats;