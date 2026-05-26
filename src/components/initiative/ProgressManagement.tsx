"use client";

import { useMemo, useState } from "react";
import {Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Trash2, Upload, User } from "lucide-react";
import {
  useCreateProgress,
  useDeleteProgress,
  useProgress,
  useUploadProgressPhotos,
} from "../../hooks/use-progress";
import { useGetMyUser } from "../../hooks/use-user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toArabicNumbers } from "../../lib/utils";
import { useUpdateCampaignStatus } from "../../hooks/use-initiative";

interface Props {
  campaignId: number;
}

const ProgressManagement = ({campaignId}: Props) => {
  const [percentage, setPercentage] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [ createDialogOpen, setCreateDialogOpen, ] = useState(false);
  const [ deleteDialogOpen, setDeleteDialogOpen, ] = useState(false);
  const [ selectedProgressId, setSelectedProgressId, ] = useState<number | null>(null);

  const currentUser = useGetMyUser();
  const { data, isLoading } = useProgress(campaignId);

  const {
    mutate: createProgress,
    isPending,
  } = useCreateProgress();

  const {
    mutate: uploadPhotos,
  } = useUploadProgressPhotos();

  const {
    mutate: deleteProgress,
    isPending:isDeletingProgress,
  } = useDeleteProgress();

  const { mutate: updateCampaignStatus } = useUpdateCampaignStatus();

  const setCampaignStatus = (status: "ONGOING" | "COMPLETED") => {
    updateCampaignStatus({
      campaignId,
      status,
    });
  };

  /*** ترتيب التوثيقات */
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

  /*** آخر نسبة */
  const latestProgress = records?.[0];
  const latestProgressId = latestProgress?.progressId;
  const latestPercentage = latestProgress?.percentage || 0;

  /*** رفع الصور */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setImages(files);
  };

  /*** إعادة ضبط */
  const resetForm = () => {
    setPercentage("");
    setComment("");
    setImages([]);
  };

  /*** حصر النسبة */
  const handlePercentageChange = (value: string) => {
    if (value === "") {
      setPercentage("");
      return;
    }

    let number = Number(value);

    if (isNaN(number)) return;

    if (number < latestPercentage) {
      number = latestPercentage;
    }

    if (number > 100) {
      number = 100;
    }

    setPercentage(number.toString());
  };

  /*** إضافة توثيق */
  const submitProgress =() => {
    createProgress(
      {
        percentage: Number(percentage),
        notes: comment,
        campaign: campaignId,
        updatedBy: currentUser.currentUser ?.userId as number,
      },
      {
        onSuccess: () => {
          if (images.length > 0) {
            uploadPhotos({
              campaignId,
              photos: images,
            });
          }

          const newPercentage = Number(percentage);

          resetForm();
          setCreateDialogOpen(false);

          // إذا وصل إلى 100%
          const finalPercentage = latestPercentage + newPercentage;

          if (finalPercentage >= 100) {
            setCampaignStatus("COMPLETED");
          }
        },
      }
    );
  };

  /*** حذف توثيق */
  const submitDelete = () => {
  if (!selectedProgressId) return;

  const progressToDelete = records.find(
    (r: any) => r.progressId === selectedProgressId
  );

  const wasCompleted = latestPercentage === 100;

  deleteProgress(
    {
      campaignId,
      progressId: selectedProgressId,
    },
    {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedProgressId(null);

        // ⬇️ الحل الحقيقي
        const updatedRecords = records.filter(
          (r: any) => r.progressId !== selectedProgressId
        );

        const newLatest = updatedRecords[0];

        const newLatestPercentage = newLatest?.percentage || 0;

        if (wasCompleted && newLatestPercentage < 100) {
          setCampaignStatus("ONGOING");
        }
      },
    }
  );
};

  return (
    <>
      <section className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold">توثيق تقدم المبادرة</h2>

        {/* FORM */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label>النسبة المئوية</Label>

            <Input
              type="number"
              min={latestPercentage}
              max={100}
              placeholder={`من ${latestPercentage} إلى 100`}
              className="font-[Thamanyah2] placeholder:text-zinc-500
                [&::-webkit-inner-spin-button]:h-10
                [&::-webkit-inner-spin-button]:w-10
                [&::-webkit-outer-spin-button]:h-10
                [&::-webkit-outer-spin-button]:w-10
                [&::-webkit-inner-spin-button]:opacity-100
              "
              value={percentage}
              onChange={(e) =>
                handlePercentageChange(e.target.value)
              }
            />

            {latestPercentage >
              0 && (
              <p className="text-sm text-muted-foreground font-[Thamanyah2]">
                آخر تقدم مسجل: {" "} {latestPercentage}%
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>رفع صور التقدم</Label>

            <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition hover:bg-gray-50">
              <Upload className="size-4 text-zinc-500" />

              <span className="font-[Thamanyah2] text-zinc-500">اختر الصور</span>

              <input
                type="file"
                multiple
                className="hidden"
                accept="image/*"
                onChange={
                  handleImageUpload
                }
              />
            </label>

            {images.length >
              0 && (
              <p className="text-sm text-gray-500 font-[Thamanyah2]">
                تم اختيار{" "}
                {
                  images.length
                }{" "}
                صورة
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Label>تعليق حول التقدم</Label>

          <Textarea
            placeholder="اكتب تفاصيل التقدم..."
            className="font-[Thamanyah2] placeholder:text-zinc-500"
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />
        </div>

        <Button
          className="mt-5 w-full h-10 hover:cursor-pointer border shadow-sm border-zinc-300 hover:bg-zinc-200"
          disabled={isPending || !percentage || !comment}
          onClick={() =>
            setCreateDialogOpen(true)
          }
        >
          {isPending ? "جارٍ الحفظ..." : "إضافة التوثيق"}
        </Button>

        {/* HISTORY */}
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">سجل التوثيق</h3>

          {isLoading && (
            <div className="rounded-xl border p-6 text-center text-sm text-muted-foreground">
              جارٍ تحميل التوثيقات...
            </div>
          )}

          {!isLoading && records.length === 0 && (
            <div className="rounded-xl border p-6 text-center text-sm text-muted-foreground">
              لا يوجد أي توثيق حالياً
            </div>
          )}

          <div className="space-y-4">
            {records.map((record: any) => {
                const isLatest = record.progressId === latestProgressId;

                return (
                  <Card key={record.progressId}>
                    <CardContent className="space-y-2 px-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-3xl font-bold">{toArabicNumbers(record.percentage)}%</h3>

                          <p className="mt-1 text-sm text-muted-foreground font-[Thamanyah2]">
                            {new Date(record.createdAt).toLocaleDateString("ar-SY")}
                          </p>
                        </div>

                        {isLatest && (
                          <Button
                            size="icon"
                            variant="destructive"
                            disabled={isDeletingProgress}
                            onClick={() => {
                              setSelectedProgressId(record.progressId);
                              setDeleteDialogOpen(true);
                            }}
                            className="border border-red-400 shadow-sm"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>

                      <div className="rounded-2xl bg-zinc-50 p-4">
                        <p className="leading-7 text-zinc-700 font-[Thamanyah2]">
                          {record.notes}
                        </p>
                      </div>

                      {record.updatedByName && (
                        <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground font-[Thamanyah2]">
                          <User size={20} />
                          تم التوثيق من قبل:{" "} <span className="font-bold">{record.updatedByName}</span> 
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* CREATE DIALOG */}
      <AlertDialog
        open={
          createDialogOpen
        }
        onOpenChange={
          setCreateDialogOpen
        }
      >
        <AlertDialogContent dir="rtl" className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد إضافة التوثيق</AlertDialogTitle>
            <AlertDialogDescription className="w-full space-y-3 pt-3 text-right">
              <p className="font-[Thamanyah2]">هل أنت متأكد من أنك تريد التوثيق؟</p>

              <div className="rounded-xl border bg-zinc-50 p-4 space-y-2">
                <p className="font-[Thamanyah2]"> النسبة المئوية: {" "} <span className="font-bold"> {percentage} % </span></p>
                <p className="font-[Thamanyah2]">عدد الصور: {" "} <span className="font-bold"> {images.length} </span></p>
                <p className="font-[Thamanyah2]">الوصف: </p>
                <p className="rounded-lg bg-white p-3 text-sm leading-6 font-[Thamanyah2]"> {comment} </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer hover:bg-zinc-200">إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={submitProgress} className="hover:cursor-pointer bg-zinc-200 border border-zinc-300 shadow-sm hover:bg-zinc-300">تأكيد الإضافة</AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>

      {/* DELETE DIALOG */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent dir="rtl" className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف التوثيق</AlertDialogTitle>

            <AlertDialogDescription className="font-[Thamanyah2] text-right leading-7">
              هل أنت متأكد من أنك تريد حذف هذا التوثيق؟ <br /> لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer hover:bg-zinc-200">إلغاء</AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              className="border border-red-400 shadow-sm"
              onClick={submitDelete}
            >
              حذف التوثيق
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProgressManagement;