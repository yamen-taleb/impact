"use client";

import * as React from "react";
import {
  isSameDay,
  isWithinInterval,
  startOfDay,
  format,
} from "date-fns";

import { Calendar, CalendarDayButton } from "../../../components/ui/calendar";
import { Card, CardContent } from "../../../components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";

import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

type AttendanceStatus =
  | "PRESENT"
  | "ABSENT_EXCUSED"
  | "ABSENT_UNEXCUSED";

type AttendanceRecord = {
  date: Date;
  status: AttendanceStatus;
  notes?: string;
};

interface AttendanceCalendarProps {
  disabled?: boolean;
}


export function AttendanceCalendar({
  disabled = false,
}: AttendanceCalendarProps) {
  /**
   * بيانات المبادرة
   */
  const campaign = {
    startDate: new Date(2026, 3, 5),
    endDate: new Date(2026, 3, 14),
  };

  /**
   * اليوم المحدد
   */
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);

  /**
   * popup state
   */
  const [open, setOpen] = React.useState(false);

  /**
   * الحالة المختارة
   */
  const [status, setStatus] =
    React.useState<AttendanceStatus>("PRESENT");

  /**
   * سبب الغياب
   */
  const [notes, setNotes] = React.useState("");

  /**
   * السجلات
   */
  const [records, setRecords] = React.useState<AttendanceRecord[]>(
    []
  );

  const getRecord = (date: Date) =>
    records.find((item) => isSameDay(item.date, date));

  const openAttendancePopup = (date: Date) => {
    setSelectedDay(date);

    const existing = getRecord(date);

    if (existing) {
      setStatus(existing.status);
      setNotes(existing.notes ?? "");
    } else {
      setStatus("PRESENT");
      setNotes("");
    }

    setOpen(true);
  };

  const saveAttendance = () => {
    if (!selectedDay) return;

    setRecords((prev) => {
      const filtered = prev.filter(
        (item) => !isSameDay(item.date, selectedDay)
      );

      return [
        ...filtered,
        {
          date: selectedDay,
          status,
          notes:
            status === "ABSENT_EXCUSED" ? notes : "",
        },
      ];
    });

    setOpen(false);
  };

  return (
    <>
      <Card
        className={`mx-auto w-full p-0 ${
          disabled
            ? "pointer-events-none opacity-60"
            : ""
        }`}
      >
        <CardContent className="w-full p-0">
          <Calendar
            mode="single"
            selected={selectedDay ?? undefined}
            defaultMonth={campaign.startDate}
            numberOfMonths={1}
            captionLayout="dropdown"
            className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)] w-full"
            disabled={(date) =>
              disabled ||
              !isWithinInterval(startOfDay(date), {
                start: startOfDay(campaign.startDate),
                end: startOfDay(campaign.endDate),
              })
            }
            onSelect={(date) => {
              if (disabled) return;

              if (date) {
                openAttendancePopup(date);
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

                let dot = "";

                if (record?.status === "PRESENT")
                  dot = "bg-green-500";

                if (
                  record?.status === "ABSENT_EXCUSED"
                )
                  dot = "bg-yellow-500";

                if (
                  record?.status ===
                  "ABSENT_UNEXCUSED"
                )
                  dot = "bg-red-500";

                return (
                  <CalendarDayButton
                    day={day}
                    modifiers={modifiers}
                    {...props}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{children}</span>

                      {!modifiers.disabled &&
                        record && (
                          <span
                            className={`h-2 w-2 rounded-full ${dot}`}
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

      {/* Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
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

          <div className="space-y-3 mt-4">
            <Label>الحالة</Label>

            <div className="grid gap-2">
              <Button
                variant={
                  status === "PRESENT"
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  setStatus("PRESENT")
                }
              >
                حاضر
              </Button>

              <Button
                variant={
                  status ===
                  "ABSENT_EXCUSED"
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  setStatus(
                    "ABSENT_EXCUSED"
                  )
                }
              >
                غائب بعذر
              </Button>

              <Button
                variant={
                  status ===
                  "ABSENT_UNEXCUSED"
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  setStatus(
                    "ABSENT_UNEXCUSED"
                  )
                }
              >
                غائب بلا عذر
              </Button>
            </div>

            {status ===
              "ABSENT_EXCUSED" && (
              <div className="space-y-2">
                <Label>
                  سبب الغياب
                </Label>

                <Textarea
                  placeholder="اكتب سبب الغياب..."
                  value={notes}
                  onChange={(e) =>
                    setNotes(
                      e.target.value
                    )
                  }
                />
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() =>
                setOpen(false)
              }
            >
              إلغاء
            </Button>

            <Button
              onClick={saveAttendance}
            >
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}