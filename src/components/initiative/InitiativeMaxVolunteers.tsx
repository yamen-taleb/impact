"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

const InitiativeMaxVolunteers = () => {
  const [maxVolunteers, setMaxVolunteers] = useState<number | string>("");
  const [confirmedVolunteers, setConfirmedVolunteers] = useState<
    number | null
  >(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleConfirm = () => {
    setConfirmedVolunteers(Number(maxVolunteers));
    setOpenDialog(false);
  };

  return (
    <>
      <article className="flex flex-col mr-auto w-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-medium">
          العدد الأعظمي للطلاب المتطوعين
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>عدد الطلاب</Label>

            <Input
              type="number"
              min={1}
              placeholder="أدخل العدد الأعظمي"
              value={maxVolunteers}
              onChange={(e) =>
                setMaxVolunteers(e.target.value)
              }
            />
          </div>

          <Button
            className="w-full"
            disabled={!maxVolunteers}
            onClick={() => setOpenDialog(true)}
          >
            تأكيد العدد
          </Button>

          {confirmedVolunteers && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              العدد المحدد حالياً: {confirmedVolunteers} طالب
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

          <p className="text-sm text-gray-600">
            العدد المحدد هو{" "}
            <strong>{maxVolunteers}</strong> طالب متطوع
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              إلغاء
            </Button>

            <Button onClick={handleConfirm}>
              تأكيد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeMaxVolunteers;