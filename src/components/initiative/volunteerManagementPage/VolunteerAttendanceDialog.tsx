"use client";

import * as React from "react";
import {
  isSameDay,
  format,
  parseISO,
  isWithinInterval,
  startOfDay,
} from "date-fns";

import {
  Calendar,
  CalendarDayButton,
} from "../../../components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";

import {
  Card,
  CardContent,
} from "../../../components/ui/card";

import {
  useAttendance,
  useCreateAttendance,
  useDeleteAttendance,
  useUpdateAttendance,
  type AttendanceStatus,
} from "../../../hooks/use-attendance";

import { useGetMyUser } from "../../../hooks/use-user";


interface Props {
  open: boolean;
  onClose: () => void;
  campaignId: number;
  studentId: number;
  startDate: string;
  endDate: string;
}

export default function VolunteerAttendanceDialog({
  open,
  onClose,
  campaignId,
  studentId,
  startDate,
  endDate
}: Props) {
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
  const [status, setStatus] = React.useState<AttendanceStatus>( "PRESENT" );
  const [notes, setNotes] = React.useState("");
  const [hours, setHours] = React.useState("0");
  const [popupOpen, setPopupOpen] = React.useState(false);

  const currentUser = useGetMyUser();
  const campaignStartDate = startOfDay(parseISO(startDate));
  const campaignEndDate = startOfDay(parseISO(endDate));

  const isDateDisabled = (
    date: Date
  ) => {
    const normalizedDate = startOfDay(date);
    const isOutsideCampaign = !isWithinInterval( normalizedDate,{
      start: campaignStartDate,
      end: campaignEndDate,
    });
    const isFriday = normalizedDate.getDay() === 5;

    return ( isOutsideCampaign || isFriday );
  };


  const { data } = useAttendance({
    campaignId,
    studentId,
  });
  const { mutate, isPending } = useCreateAttendance();
  const { mutate: updateAttendance } = useUpdateAttendance();
  const { mutate: deleteAttendance } = useDeleteAttendance();


  const records = data?.attendances ?? [];



  const getRecord = (date: Date) => {
    const formattedDate = format(
      date,
      "yyyy-MM-dd"
    );

    return records.find(
      (item) =>
        item.attendanceDate === formattedDate &&
        item.studentId === studentId
    );
  };

  const openAttendancePopup = ( date: Date ) => {
    setSelectedDay(date);

    const existing = getRecord(date);

    console.log(date);

    if (existing) {
      setStatus(existing.status);
      setNotes(existing.notes || "");
      setHours( String( existing.hoursThatDay || 0 ) );
    } else {
      setStatus("PRESENT");
      setNotes("");
      setHours("0");
    }

    setPopupOpen(true);
  };

  const saveAttendance = () => {
    if (!selectedDay) return;
    const existing = getRecord(selectedDay);
    const now = new Date().toISOString();
    const payload = {
      attendanceDate: format(
        selectedDay,
        "yyyy-MM-dd"
      ),
      student: studentId,
      campaign: campaignId,
      recordedBy: currentUser.currentUser ?.userId as number,
      recordedAt: now,
      createdAt: now,
      updatedAt: now,
      status,
      hoursThatDay: status === "PRESENT"
        ? Number(hours)
        : 0,
      notes: status === "EXCUSED"
        ? notes
        : "",
    };

    /*** UPDATE */
    if (existing) {
      updateAttendance(
        {
          attendanceId: existing.attendanceId,
          ...payload,
        },
        {
          onSuccess: () => {
            setPopupOpen(false);
          },
        }
      );

      return;
    }

    /*** CREATE */
    mutate(payload, {
      onSuccess: () => {
        setPopupOpen(false);
      },
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onClose}
      >
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>
              إدارة الحضور
            </DialogTitle>
          </DialogHeader>

          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={
                  selectedDay ?? undefined
                }
                numberOfMonths={2}
                captionLayout="dropdown"
                disabled={isDateDisabled}
                defaultMonth={campaignStartDate}
                className="w-full"
                onSelect={(date) => {
                  if (date) {
                    openAttendancePopup(
                      date
                    );
                  }
                }}
                components={{
                  DayButton: ({
                    children,
                    modifiers,
                    day,
                    ...props
                  }) => {

                    const record = getRecord(day.date);

                    let bgColor = "";

                    if (record?.status === "PRESENT") {
                      bgColor = "bg-green-200 hover:bg-green-300";
                    }

                    if (record?.status === "EXCUSED") {
                      bgColor = "bg-yellow-200 hover:bg-yellow-300";
                    }

                    if (record?.status === "ABSENT") {
                      bgColor = "bg-red-200 hover:bg-red-300";
                    }

                    return (
                      <CalendarDayButton
                        day={day}
                        modifiers={modifiers}
                        {...props}
                      >
                        <div className={`relative flex size-full items-center justify-center ${record && bgColor}`}>

                          <span>
                            {children}
                          </span>
                        </div>
                      </CalendarDayButton>
                    );
                  },
                }}
              />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <Dialog
        open={popupOpen}
        onOpenChange={setPopupOpen}
      >
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>
              تسجيل الحضور
            </DialogTitle>
          </DialogHeader>

          {selectedDay && (
            <p className="text-sm text-muted-foreground">
              {format(
                selectedDay,
                "yyyy-MM-dd"
              )}
            </p>
          )}

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>
                حالة الحضور
              </Label>

              <div className="grid gap-2">
                <Button
                  variant={
                    status ===
                    "PRESENT"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    setStatus("PRESENT");
                    setNotes("");
                  }}
                >
                  حاضر
                </Button>

                <Button
                  variant={
                    status ===
                    "EXCUSED"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    setStatus("EXCUSED");
                    setHours("0");
                  }}
                >
                  غائب بعذر
                </Button>

                <Button
                  variant={
                    status ===
                    "ABSENT"
                      ? "default"
                      : "outline"
                  }
                  onClick={() => {
                    setStatus("ABSENT");
                    setHours("0");
                    setNotes("");
                  }}
                >
                  غائب
                </Button>
              </div>
            </div>

            {status === "PRESENT" && (
              <div className="space-y-2">
                <Label>
                  عدد ساعات الحضور
                </Label>

                <Input
                  type="number"
                  min={0}
                  step={0.5}
                  value={hours}
                  onChange={(e) =>
                    setHours(
                      e.target.value
                    )
                  }
                />
              </div>
            )}

            {status === "EXCUSED" && (
              <div className="space-y-2">
                <Label>
                  سبب الغياب
                </Label>

                <Textarea
                  placeholder="اكتب سبب الغياب..."
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                />
              </div>
            )}
          </div>

          <DialogFooter>
            {selectedDay && getRecord(selectedDay) && (
              <Button
                variant="destructive"
                onClick={() => {

                  if (!selectedDay) return;

                  const record =
                    getRecord(selectedDay);

                  if (!record) return;

                  deleteAttendance(
                    record.attendanceId,
                    {
                      onSuccess: () => {
                        setPopupOpen(false);
                      },
                    }
                  );
                }}
              >
                حذف السجل
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() =>
                setPopupOpen(false)
              }
            >
              إلغاء
            </Button>
            

            <Button
              disabled={isPending}
              onClick={saveAttendance}
            >
              {isPending
                ? "جارٍ الحفظ..."
                : "حفظ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}