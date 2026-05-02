import ApplicationCard from "./ApplicationCard.tsx";
import type { Applications } from "../../schemas/applicationSchema.ts";

interface Props {
    filteredApplications: Applications,
    handleOpenDialogDeleteApplication: (id: string | number) => void,
}

const ApplicationsList = ({ filteredApplications, handleOpenDialogDeleteApplication }: Props) => {
  return (
      <div className="grid grid-cols-2 gap-4">
          {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                  <ApplicationCard
                      key={application.id}
                      application={application}
                      onDelete={handleOpenDialogDeleteApplication}
                  />
              ))
          ) : (
              <div className="col-span-2 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
                  <h3 className="text-lg font-semibold text-zinc-900">
                      لا توجد تطبيقات
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 font-[Thamanyah2]">
                      لم تقدم أي طلبات مطابقة للفلتر المختار
                  </p>
              </div>
          )}
      </div>
  );
};

export default ApplicationsList;