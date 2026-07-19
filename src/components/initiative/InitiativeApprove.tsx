"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useGetStudents } from "../../hooks/use-students";
import { useUpdateCampaign, useUpdateCampaignStatus } from "../../hooks/use-initiative";
import { useGetMyUser } from "../../hooks/use-user";
import { useGetCollegeById } from "../../hooks/use-college";


interface Props {
  campaignId: number;
  initiative: {
    status?: string;
    publishedAt?: string | null;
    rejectedReason?: string | null;
    lastProgress?: any | null;
    college?: {
      id: number;
      name: string;
    };
  };
}

const InitiativeApprove = ({ campaignId, initiative }: Props) => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const { mutate: updateCampaign } = useUpdateCampaign();
  const { mutate: updateCampaignStatus, } = useUpdateCampaignStatus();

  const { currentUser } = useGetMyUser();
  const currentUserId = Number(currentUser?.userId);

  const { data: studentsData } = useGetStudents({ page: 0, size: 1000, });
  const { data: campaignCollege } = useGetCollegeById( Number(initiative.college?.id) );

  const students = studentsData?.content || [];

  const managerAdmin = students.find(
    (student: any) =>
      student.role === "ROLE_ADMIN" &&
      student.collegeName === campaignCollege?.name
  );

  // CHECK Business logic
  const isApproved = initiative.status === "APPROVED" || initiative.status === "ONGOING";
  const isRejected = initiative.status === "REJECTED";
  const hasPublishedAt = !!initiative.publishedAt;
  const hasProgress = !!initiative.lastProgress;
  // هل يمكن إعادة الرفض؟
  const canReject = !hasPublishedAt && !hasProgress;
  // هل يمكن إعادة الموافقة؟
  const canApprove = !hasPublishedAt && !hasProgress;

  const handleReject = () => {
    if (!currentUserId) {
      return;
    }

    updateCampaign(
      {
        campaignId,
        approvedById: currentUserId,
      },
      {
        onSuccess: () => {
          updateCampaignStatus(
            {
              campaignId,
              status: "REJECTED",
              rejectedReason: rejectReason,
            },
            {
              onSuccess: () => {
                setOpenRejectDialog(false);
                setRejectReason("");
              },
            }
          );
        },
      }
    );
  };

  const handleApprove = () => {
    if (!currentUserId) {
      return;
    }

    if (!managerAdmin?.userId) {
      console.error(
        "لم يتم العثور على Admin لنفس الكلية"
      );
      return;
    }

    updateCampaign(
      {
        campaignId,
        approvedById: currentUserId,
        managedById: managerAdmin.userId,
        status: "APPROVED",
      },
      {
        onSuccess: () => {
          // تنظيف سبب الرفض عند إعادة الموافقة
          if (initiative.status === "REJECTED") {
            updateCampaignStatus({
              campaignId,
              status: "APPROVED",
              rejectedReason: "",
            });
          }
          setOpenApproveDialog(false);
        },
      }
    );
  };

  return (
    <>
      <article className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">
        <h1 className="text-lg">
          حالة المبادرة
        </h1>

        <div className="flex w-full flex-row justify-between">
          {/* زر الموافقة */}
          <Button
            className={`w-[47%] ${ isApproved ? "bg-green-600 hover:bg-green-600 text-white" : "" }`}
            // disabled={ isApproved && !canReject }
            disabled={ isApproved }
            onClick={() => setOpenApproveDialog(true) }
          >
            {isApproved ? "تمت الموافقة" : "صحيحة"}
          </Button>

          {/* زر الرفض */}
          <Button
            variant="destructive"
            className={`w-[47%] ${ isRejected ? "bg-red-700 hover:bg-red-700" : "" }`}
            // disabled={ isRejected && !canApprove }
            disabled={ isRejected }
            onClick={() => setOpenRejectDialog(true) }
          >
            {isRejected ? "تم الرفض" : "يوجد خطأ ما!"}
          </Button>
        </div>
      </article>

      {/* Dialog الموافقة */}
      <Dialog
        open={openApproveDialog}
        onOpenChange={setOpenApproveDialog}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              هل أنت متأكد أن هذه
              المبادرة صحيحة؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setOpenApproveDialog(false)
              }
            >
              لا
            </Button>

            <Button onClick={handleApprove}>
              نعم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog الرفض */}
      <Dialog
        open={openRejectDialog}
        onOpenChange={setOpenRejectDialog}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              هل أنت متأكد من أن هناك
              خطأ في هذه المبادرة؟
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <p className="font-[Thamanyah2] text-sm text-gray-500">
              يرجى كتابة سبب الرفض قبل
              المتابعة.
            </p>

            <Textarea
              placeholder="اكتب سبب الرفض هنا..."
              value={rejectReason}
              onChange={(e) =>
                setRejectReason(
                  e.target.value
                )
              }
              className="font-[Thamanyah2]"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpenRejectDialog(false);
                setRejectReason("");
              }}
            >
              إلغاء
            </Button>

            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={
                !rejectReason.trim()
              }
            >
              تأكيد الرفض
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeApprove;