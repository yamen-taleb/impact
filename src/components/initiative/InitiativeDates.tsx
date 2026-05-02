"use client";

import { useEffect, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

const InitiativeDates = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [daysCount, setDaysCount] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(false);

  const calculateWorkingDays = (from: Date, to: Date) => {
    const allDays = eachDayOfInterval({
      start: from,
      end: to,
    });

    const workingDays = allDays.filter((day) => {
      return day.getDay() !== 5; // الجمعة
    });

    return workingDays.length;
  };

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const totalDays = calculateWorkingDays(
        dateRange.from,
        dateRange.to
      );
      setDaysCount(totalDays);
    }
  }, [dateRange]);

  const handleConfirmDates = () => {
    console.log("تم تأكيد التواريخ", dateRange, daysCount);
    setOpenDialog(false);
  };

  return (
    <>
      <article className="ml-auto w-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-lg font-medium">
          تحديد مدة المبادرة
        </h2>

        <div className="space-y-5">
          {/* اختيار التاريخ */}
          <div className="space-y-2">
            <Label>تاريخ البداية والنهاية</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between text-right font-[Thamanyah2]",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "yyyy/MM/dd")} -{" "}
                        {format(dateRange.to, "yyyy/MM/dd")}
                      </>
                    ) : (
                      format(dateRange.from, "yyyy/MM/dd")
                    )
                  ) : (
                    "اختر تاريخ البداية والنهاية"
                  )}

                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto bg-white p-0"
                align="start"
              >
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* عدد الأيام */}
          <div className="space-y-2">
            <Label>عدد أيام المبادرة</Label>

            <Input
              type="number"
              value={daysCount}
              onChange={(e) =>
                setDaysCount(Number(e.target.value))
              }
              className="font-[Thamanyah2]"
            />
          </div>

          {/* زر التأكيد */}
          {dateRange?.from && dateRange?.to && (
            <Button
              className="w-full"
              onClick={() => setOpenDialog(true)}
            >
              تأكيد مدة المبادرة
            </Button>
          )}
        </div>
      </article>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              هل أنت متأكد من تحديد مدة المبادرة؟
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 font-[Thamanyah2]">
            من تاريخ{" "}
            <strong>
              {dateRange?.from &&
                format(dateRange.from, "yyyy/MM/dd")}
            </strong>{" "}
            إلى{" "}
            <strong>
              {dateRange?.to &&
                format(dateRange.to, "yyyy/MM/dd")}
            </strong>
          </p>

          <p className="text-sm text-gray-500 font-[Thamanyah2]">
            عدد أيام المبادرة: {daysCount} يوم
          </p>

          <p className="text-sm text-gray-500 font-[Thamanyah2]">
            ملاحظة: عدد الأيام لا تشمل يوم الجمعة.
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              إلغاء
            </Button>

            <Button onClick={handleConfirmDates}>
              تأكيد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeDates;