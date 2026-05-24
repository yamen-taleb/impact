import { useMemo, useState } from "react";

import {
  Backpack,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";

import type { Volunteer } from "../../../schemas/volunteerSectionSchema";

import VolunteerStatusBadge from "./VolunteerStatusBadge";
import VolunteerActions from "./VolunteerActions";

import ConfirmActionDialog from "./ConfirmActionDialog";

import { useUpdateApplication } from "../../../hooks/use-application";

import { useGetMyUser } from "../../../hooks/use-user";

import { Button } from "../../../components/ui/button";

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

const VolunteerCard = ({
  volunteer,
  campaignId,
}: Props) => {
  const [dialog, setDialog] =
    useState<DialogType>(null);

    const [reason, setReason] = useState("");

  const { mutate, isPending } =
    useUpdateApplication();

  const currentUser = useGetMyUser();

  const closeDialog = () => {
    setDialog(null);
    setReason("");
  };

  const dialogTitle = useMemo(() => {
    switch (dialog) {
      case "accept":
        return "قبول المتطوع؟";

      case "reject":
        return "رفض طلب التطوع؟";

      case "dismiss":
        return "فصل المتطوع؟";

      case "restore":
        return "إعادة المتطوع؟";

      default:
        return "";
    }
  }, [dialog]);

  const submitAction = () => {
    mutate(
      {
        id: volunteer.applicationId,

        motivationLetter:
          volunteer.motivationLetter,

        status:
          dialog === "accept" ||
          dialog === "restore"
            ? "APPROVED"
            : "REJECTED",

        rejectionReason:
          dialog === "reject"
            ? reason
            : undefined,

            removalReason:
          dialog === "dismiss"
            ? reason
            : undefined,

        removedAt:
          dialog === "dismiss"
            ? new Date().toISOString()
            : undefined,

        removedBy:
          dialog === "dismiss"
            ? currentUser.currentUser
                ?.userId
            : undefined,

            reviewedAt:
          new Date().toISOString(),

        reviewedBy:
          currentUser.currentUser?.userId,

        student: volunteer.userId,
        campaign: campaignId,
      },

      {
        onSuccess: closeDialog,
      }
    );
  };

  return (
    <>
      <div className="rounded-3xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={volunteer.photo}
              alt={volunteer.firstName}
              className="size-16 rounded-2xl object-cover"
            />

            <div>
              <h3 className="font-bold">
                {volunteer.firstName}{" "}
                {volunteer.lastName}
              </h3>

              <p className="text-sm text-muted-foreground">
                {volunteer.studentNumber}
              </p>
            </div>
          </div>

          <VolunteerStatusBadge
            status={
              volunteer.applicationStatus
            }
            removed={Boolean(
              volunteer.removalReason
            )}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-zinc-700">
          <div className="flex items-center gap-2">
            <Mail className="size-4" />
            <span>{volunteer.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="size-4" />
            <span>{volunteer.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Backpack className="size-4" />
            <span>
              {volunteer.collegeName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="size-4" />
            <span>
              السنة {volunteer.academicYear}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm leading-7 text-zinc-700">
          {volunteer.motivationLetter}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl border bg-zinc-50 p-4">
          <div>
            <p className="text-sm text-muted-foreground">
              ساعات التطوع
            </p>

            <h3 className="text-xl font-bold">
              24 ساعة
            </h3>
          </div>

          <Button variant="outline">
            إدارة الحضور
          </Button>
        </div>

        <div className="mt-5">
          <VolunteerActions
            status={
              volunteer.applicationStatus
            }
            onAccept={() =>
              setDialog("accept")
            }
            onReject={() =>
              setDialog("reject")
            }
            onDismiss={() =>
              setDialog("dismiss")
            }
            onRestore={() =>
              setDialog("restore")
            }
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