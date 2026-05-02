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

const InitiativeApprove = () => {
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    console.log("سبب الرفض:", rejectReason);

    setOpenRejectDialog(false);
    setRejectReason("");
  };

  const handleApprove = () => {
    console.log("تم قبول المبادرة");

    setOpenApproveDialog(false);
  };

  return (
    <>
      <article className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">
        <h1 className="text-lg">حالة المبادرة</h1>

        <div className="flex w-full flex-row justify-between">
          {/* زر الموافقة */}
          <Button
            className="w-[47%]"
            onClick={() => setOpenApproveDialog(true)}
          >
            صحيحة
          </Button>

          {/* زر الرفض */}
          <Button
            variant="destructive"
            className="w-[47%]"
            onClick={() => setOpenRejectDialog(true)}
          >
            يوجد خطأ ما!
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
              هل أنت متأكد أن هذه المبادرة صحيحة؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleApprove}>
              نعم
            </Button>

            <Button
              variant="outline"
              onClick={() => setOpenApproveDialog(false)}
            >
              لا
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
              هل أنت متأكد من أن هناك خطأ في هذه المبادرة؟
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              يرجى كتابة سبب الرفض قبل المتابعة.
            </p>

            <Textarea
              placeholder="اكتب سبب الرفض هنا..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>

          <DialogFooter>

            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              تأكيد الرفض
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setOpenRejectDialog(false);
                setRejectReason("");
              }}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeApprove;