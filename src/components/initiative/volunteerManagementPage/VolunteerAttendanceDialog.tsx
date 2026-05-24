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
  const [selectedDay, setSelectedDay] =
    React.useState<Date | null>(null);

  const [status, setStatus] =
    React.useState<AttendanceStatus>(
      "PRESENT"
    );

  const [notes, setNotes] =
    React.useState("");

  const [hours, setHours] =
    React.useState("0");

  const [popupOpen, setPopupOpen] =
    React.useState(false);

  const currentUser = useGetMyUser();

  const campaignStartDate =
  startOfDay(parseISO(startDate));

  const campaignEndDate =
    startOfDay(parseISO(endDate));

  const isDateDisabled = (
    date: Date
  ) => {
    const normalizedDate =
      startOfDay(date);

    const isOutsideCampaign =
      !isWithinInterval(
        normalizedDate,
        {
          start: campaignStartDate,
          end: campaignEndDate,
        }
      );

    const isFriday =
      normalizedDate.getDay() === 5;

    return (
      isOutsideCampaign || isFriday
    );
  };


  const { data } = useAttendance({
    campaignId,
    studentId,
  });

  const { mutate, isPending } =
    useCreateAttendance();

  const {
    mutate: updateAttendance,
  } = useUpdateAttendance();

  const records = data?.content ?? [];


  const getRecord = (date: Date) =>
    records.find((item) =>
      isSameDay(
        parseISO(item.attendanceDate),
        date
      )
    );

  const openAttendancePopup = (
    date: Date
  ) => {
    setSelectedDay(date);

    const existing = getRecord(date);

    if (existing) {
      setStatus(existing.status);

      setNotes(existing.notes || "");

      setHours(
        String(
          existing.hoursThatDay || 0
        )
      );
    } else {
      setStatus("PRESENT");
      setNotes("");
      setHours("0");
    }

    setPopupOpen(true);
  };

  const saveAttendance = () => {
  if (!selectedDay) return;

  const attendanceDate = format(
    selectedDay,
    "yyyy-MM-dd"
  );

  const existing =
    getRecord(selectedDay);

  /**
   * تجهيز البيانات الأساسية
   */
  const basePayload = {
    attendanceDate,

    student: studentId,

    campaign: campaignId,

    recordedBy:
      currentUser.currentUser
        ?.userId,

    recordedAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  };

  /**
   * حاضر
   */
  if (status === "PRESENT") {
    const payload = {
      ...basePayload,

      status: "PRESENT",

      hoursThatDay:
        Number(hours),

      notes: "",
    };

    if (existing) {
      updateAttendance(
        {
          attendanceId:
            existing.attendanceId,

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

    mutate(payload, {
      onSuccess: () => {
        setPopupOpen(false);
      },
    });

    return;
  }

  /**
   * غياب بعذر
   */
  if (status === "EXCUSED") {
    const payload = {
      ...basePayload,

      status: "EXCUSED",

      hoursThatDay: 0,

      notes,
    };

    if (existing) {
      updateAttendance(
        {
          attendanceId:
            existing.attendanceId,

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

    mutate(payload, {
      onSuccess: () => {
        setPopupOpen(false);
      },
    });

    return;
  }

  /**
   * غياب بلا عذر
   */
  if (status === "ABSENT") {
    const payload = {
      ...basePayload,

      status: "ABSENT",

      hoursThatDay: 0,

      notes: "",
    };

    if (existing) {
      updateAttendance(
        {
          attendanceId:
            existing.attendanceId,

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

    mutate(payload, {
      onSuccess: () => {
        setPopupOpen(false);
      },
    });
  }
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
                    const record =
                      getRecord(day.date);

                    let dot = "";

                    if (
                      record?.status ===
                      "PRESENT"
                    ) {
                      dot = "bg-green-500";
                    }

                    if (
                      record?.status ===
                      "EXCUSED"
                    ) {
                      dot = "bg-yellow-500";
                    }

                    if (
                      record?.status ===
                      "ABSENT"
                    ) {
                      dot = "bg-red-500";
                    }

                    return (
                      <CalendarDayButton
                        day={day}
                        modifiers={
                          modifiers
                        }
                        {...props}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span>
                            {children}
                          </span>

                          {record && (
                            <span
                              className={`size-2 rounded-full ${dot}`}
                            />
                          )}
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