"use client";

import { useEffect, useMemo, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import { arSA } from "date-fns/locale";
import { useParams } from "react-router";
import {
  useUpdateCampaign,
  type UpdateCampaignPayload,
} from "../../hooks/use-initiative";

import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarClock, CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import type { Initiative } from "../../schemas/initiativePageSchema";
import { useProgress } from "../../hooks/use-progress";

interface InitiativeDatesProps {
  initiative: Initiative;
}

const InitiativeDates = ({ initiative }: InitiativeDatesProps) => {
  const { initiativeId } = useParams();
  const { mutate: updateCampaign, isPending } = useUpdateCampaign();
  const minSelectableDate = new Date();

  const [startDate, setStartDate] = useState<Date | undefined>(
    initiative.startDate ? new Date(initiative.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initiative.endDate ? new Date(initiative.endDate) : undefined
  );

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

  const { data, isLoading } = useProgress(initiative.campaignId);
    const records = useMemo(() => {
      const progressList =
        data?.progress ||
        data?.content ||
        data?.records ||
        data ||
        [];
  
      if (!Array.isArray(progressList)) return [];
  
      return [...progressList].sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }, [data]);
  const latestProgress = records?.[0];

  useEffect(() => {
    if (startDate && endDate) {
      const totalDays = calculateWorkingDays(startDate, endDate);
      setDaysCount(totalDays);
    }
  }, [startDate, endDate]);

  const handleDaysCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startDate && endDate) {
      const maxDays = calculateWorkingDays(startDate, endDate);
      const newDaysCount = Math.min(Number(e.target.value), maxDays);
      setDaysCount(newDaysCount);
    }
  };

  const handleConfirmDates = () => {
    if (!startDate || !endDate || !initiativeId) return;

    let payload: Omit<UpdateCampaignPayload, "campaignId"> & {
      campaignId: number;
    } = {
      campaignId: Number(initiativeId),
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    };

    if (initiative.maxVolunteers && !initiative.publishedAt) {
      payload = {
        ...payload,
        status: "ONGOING",
        publishedAt: new Date()
      };
    }

    updateCampaign(payload, {
      onSuccess: () => {
        setOpenDialog(false);
      },
    });
  };

  return (
    <>
      <article className="ml-auto w-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-row gap-2">
          <CalendarClock />
          <h2 className="mb-5 text-lg font-medium">تحديد مدة المبادرة</h2>
        </div>

        <div className="space-y-6">
          {/* اختيار تاريخ البداية */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>تاريخ البداية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-right font-[Thamanyah2]",
                      !startDate && "text-muted-foreground"
                    )}
                    disabled={!!initiative.startDate || latestProgress?.percentage === 100 }
                  >
                    {startDate ? (
                      format(startDate, "PPP", { locale: arSA })
                    ) : (
                      "اختر تاريخ البداية"
                    )}
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="ring-0 z-50 w-[240px] min-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    locale={arSA}
                    startMonth={minSelectableDate}
                    disabled={(date) => date < minSelectableDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* اختيار تاريخ النهاية */}
            <div className="space-y-2">
              <Label>تاريخ النهاية</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={latestProgress?.percentage === 100}
                    className={cn(
                      "w-full justify-between text-right font-[Thamanyah2]",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate ? (
                      format(endDate, "PPP", { locale: arSA })
                    ) : (
                      "اختر تاريخ النهاية"
                    )}
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="ring-0 z-50 !w-[240px] !min-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
                  align="center"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={{ before: startDate as Date }}
                    locale={arSA}
                  />
                </PopoverContent>
              </Popover>
            </div>

          </div>
            {/* عدد الأيام */}
            <div className="space-y-2">
              <Label>عدد أيام المبادرة</Label>

              <Input
                type="number"
                value={daysCount}
                onChange={handleDaysCountChange}
                className="font-[Thamanyah2]"
              />
            </div>

            {/* زر التأكيد */}
            {startDate && endDate && (
                <Button
                    className="w-full h-10 hover:curspo border shadow-sm border-zinc-300 hover:bg-zinc-200"
                    onClick={() => setOpenDialog(true)}
                    disabled={isPending || latestProgress?.percentage === 100 }
                >
                  {isPending ? "جاري التأكيد..." : "تأكيد مدة المبادرة"}
                </Button>
            )}
          </div>
      </article>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>هل أنت متأكد من تحديد مدة المبادرة؟</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 font-[Thamanyah2]">
            من تاريخ{" "}
            <strong>
              {startDate && format(startDate, "PPP", { locale: arSA })}
            </strong>{" "}
            إلى{" "}
            <strong>
              {endDate && format(endDate, "PPP", { locale: arSA })}
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
              disabled={isPending}
            >
              إلغاء
            </Button>

            <Button onClick={handleConfirmDates} disabled={isPending}>
              {isPending ? "جاري التأكيد..." : "تأكيد"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeDates;
