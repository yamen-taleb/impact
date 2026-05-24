import { useMemo, useState } from "react";
import { Backpack, GraduationCap, Mail, Phone } from "lucide-react";
import type { Volunteer } from "../../../schemas/volunteerSectionSchema";
import VolunteerStatusBadge from "./VolunteerStatusBadge";
import VolunteerActions from "./VolunteerActions";
import ConfirmActionDialog from "./ConfirmActionDialog";
import { useUpdateApplication } from "../../../hooks/use-application";
import { useGetMyUser } from "../../../hooks/use-user";
import { Button } from "../../../components/ui/button";
import { toArabicNumbers, getAcademicYearLabel, formatArabicPhoneNumber, formatArabicDate } from "../../../lib/utils";

interface Props {
  volunteer: Volunteer;
  campaignId: number;
}

type DialogType =
  | "accept"
  | "reject"
  | "dismiss"
  | "restore"
  | null;

const VolunteerCard = ({ volunteer, campaignId }: Props) => {

  const [dialog, setDialog] = useState<DialogType>(null);

  const [reason, setReason] = useState("");

  const { mutate, isPending } = useUpdateApplication();

  const currentUser = useGetMyUser();

  const closeDialog = () => {
    setDialog(null);
    setReason("");
  };

  const dialogTitle = useMemo(() => {
    switch (dialog) {
      case "accept":
        return `هل أنت متأكد من أنك تريد قبول الطالب ${volunteer.firstName}؟`;

      case "reject":
        return `هل أنت متأكد من أنك تريد رفض الطالب ${volunteer.firstName}؟`;

      case "restore":
        return `هل أنت متأكد من أنك تريد إعادة الطالب ${volunteer.firstName}؟`;

      case "dismiss":
        return `هل أنت متأكد من أنك تريد فصل الطالب ${volunteer.firstName}؟`;

      default:
        return "";
    }
  }, [dialog]);

  const submitAction = () => {
    mutate(
      {
        id: volunteer.applicationId,
        motivationLetter: volunteer.motivationLetter,
        status: dialog === "accept" || dialog === "restore" 
          ? "APPROVED" 
          : "REJECTED",

        rejectionReason: dialog === "reject"
          ? reason
          : null,

        removalReason: dialog === "dismiss"
          ? reason
          : null,

        removedAt: dialog === "dismiss" || dialog === "reject"
          ? new Date().toISOString()
          : null,

        removedBy: dialog === "dismiss"
          ? currentUser.currentUser
          ?.userId
          : null,

        adminNotes: null,
        appliedAt: volunteer.appliedAt,
        withdrawnAt: volunteer.withdrawnAt,
        createdAt: volunteer.createdAt,
        updatedAt: new Date().toISOString(),
        reviewedAt: new Date().toISOString(),
        reviewedBy: currentUser.currentUser?.userId,
        student: volunteer.userId,
        campaign: campaignId,
      },
      {
        onSuccess: closeDialog,
      }
    );
  };

  console.log(volunteer);

  return (
    <>
      <div className="rounded-3xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={volunteer.photo}
              alt={volunteer.firstName}
              className="size-16 rounded-full object-cover"
            />

            <div className="w-full flex flex-col">
              <div>
                <h3 className="font-bold">{volunteer.firstName}{" "}{volunteer.lastName}</h3>
                <p className="text-sm text-muted-foreground font-[Thamanyah2]">
                  {toArabicNumbers(volunteer.studentNumber)}
                </p>
              </div>
              <div>
                <h3 className="text-sm"><span className="font-[Thamanyah2]">تاريخ تقديم الطلب: </span>{formatArabicDate(volunteer.appliedAt)}</h3>
              </div>
            </div>
          </div>

          <VolunteerStatusBadge
            status={ volunteer.applicationStatus }
            removed={Boolean( (volunteer.removalReason && volunteer.applicationStatus === "REJECTED") )}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-zinc-700">
          <div className="flex items-center gap-2">
            <Mail className="size-4" />
            <span className="font-[Thamanyah2]">{volunteer.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0" />
            <span className="font-[Thamanyah2] text-md">{toArabicNumbers(volunteer.phone)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Backpack className="size-4" />
            <span className="font-[Thamanyah2]">{volunteer.collegeName}</span>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="size-4" />
            <span className="font-[Thamanyah2]"> السنة {getAcademicYearLabel(volunteer.academicYear)}</span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm leading-7 text-zinc-700 font-[Thamanyah2]">
          <h2 className="font-bold">رسالة الدافع:</h2>
          <h3 className="font-[Thamanyah2]">{volunteer.motivationLetter}</h3>
        </div>

        {(volunteer.rejectionReason && volunteer.applicationStatus === "REJECTED") && (
          <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm leading-7 font-[Thamanyah2]">
            <h3 className="text-sm"><span className="font-[Thamanyah2]">تاريخ الرفض: </span>{formatArabicDate(volunteer.removedAt)}</h3>
            <h2 className="font-bold">سبب الرفض:</h2>
            <h3 className="text-zinc-700 font-[Thamanyah2]">{volunteer.rejectionReason}</h3>
          </div>
        )}

        {(volunteer.removalReason && volunteer.applicationStatus === "REJECTED") && (
          <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm leading-7 font-[Thamanyah2]">
            <h3 className="text-sm"><span className="font-[Thamanyah2]">تاريخ الفصل: </span>{formatArabicDate(volunteer.removedAt)}</h3>
            <h2 className="font-bold">سبب الفصل:</h2>
            <h3 className="text-zinc-700 font-[Thamanyah2]">{volunteer.removalReason}</h3>
          </div>
        )}

        

        <div className="mt-5 flex items-center justify-between rounded-2xl border bg-zinc-50 p-4">
          <div>
            <p className="text-sm">ساعات التطوع</p> 
            <h3 className="text-xl font-[Thamanyah2]">24 ساعة</h3>
          </div>

          <Button variant="outline">
            إدارة الحضور
          </Button>
        </div>

        <div className="w-full mt-5">
          <VolunteerActions
            status={ volunteer.applicationStatus }
            onAccept={() => setDialog("accept")}
            onReject={() => setDialog("reject")}
            onDismiss={() => setDialog("dismiss")}
            onRestore={() => setDialog("restore")}
          />
        </div>
      </div>

      <ConfirmActionDialog
        open={dialog !== null}
        title={dialogTitle}
        loading={isPending}
        reason={reason}
        setReason={setReason}
        reasonRequired={
          dialog === "reject" ||
          dialog === "dismiss"
        }
        onClose={closeDialog}
        onConfirm={submitAction}
      />
    </>
  );
};

export default VolunteerCard;