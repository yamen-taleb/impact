"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useParams } from "react-router";
import { useUpdateCampaign, type UpdateCampaignPayload } from "../../hooks/use-initiative";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import type {Initiative} from "../../schemas/initiativePageSchema.ts";
import { Users } from "lucide-react";

interface InitiativeMaxVolunteersProps {
  initiative: Initiative;
}

const InitiativeMaxVolunteers = ({ initiative }: InitiativeMaxVolunteersProps) => {
  const { initiativeId } = useParams();
  const { mutate: updateCampaign, isPending } = useUpdateCampaign();

  const [maxVolunteers, setMaxVolunteers] = useState<number | string>(initiative.maxVolunteers || "");
  const [openDialog, setOpenDialog] = useState(false);

  const handleConfirm = () => {
    if (!maxVolunteers || !initiativeId) return;

    let payload: UpdateCampaignPayload = {
      campaignId: Number(initiativeId),
      maxVolunteers: Number(maxVolunteers),
    };

    if (initiative.startDate && initiative.endDate && !initiative.publishedAt) {
      payload = {
        ...payload,
        status: "ONGOING",
        publishedAt: new Date(),
      }
    }

    updateCampaign(payload, {
      onSuccess: () => {
        setOpenDialog(false);
      },
    });
  };

  return (
    <>
      <article className="flex flex-col mr-auto w-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-row gap-2">
          <Users />
          <h2 className="mb-5 text-lg font-medium">
            العدد الأعظمي للطلاب المتطوعين
          </h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>عدد الطلاب</Label>

            <Input
              type="number"
              min={1}
              placeholder="أدخل العدد الأعظمي"
              value={maxVolunteers}
              className="font-[Thamanyah2]"
              onChange={(e) =>
                setMaxVolunteers(e.target.value)
              }
            />
          </div>

          <Button
            className="w-full h-10 hover:cursor-pointer border shadow-sm border-zinc-300 hover:bg-zinc-200"
            disabled={!maxVolunteers || isPending}
            onClick={() => setOpenDialog(true)}
          >
            {isPending ? "جاري التأكيد..." : "تأكيد العدد"}
          </Button>

          {initiative.maxVolunteers && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 font-[Thamanyah2]">
              العدد المحدد حالياً: {initiative.maxVolunteers} طالب
            </div>
          )}
        </div>
      </article>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              هل أنت متأكد من تحديد العدد الأعظمي؟
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 font-[Thamanyah2]">
            العدد المحدد هو{" "}
            <strong>{maxVolunteers}</strong> طالب متطوع
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              disabled={isPending}
            >
              إلغاء
            </Button>

            <Button onClick={handleConfirm} disabled={isPending}>
              {isPending ? "جاري التأكيد..." : "تأكيد"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeMaxVolunteers;