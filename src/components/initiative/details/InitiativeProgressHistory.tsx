"use client";

import { useMemo } from "react";
import { BookMarked, User } from "lucide-react";

import { Card, CardContent } from "../../ui/card";
import { useProgress } from "../../../hooks/use-progress";
import { toArabicNumbers } from "../../../lib/utils";

interface Props {
  campaignId: number;
}

const InitiativeProgressHistory = ({ campaignId }: Props) => {
  const { data, isLoading } = useProgress(campaignId);

  const records = useMemo(() => {
    const progressList =
      data?.progress ||
      data?.content ||
      data?.records ||
      data ||
      [];

    if (!Array.isArray(progressList)) return [];

    return [...progressList].sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }, [data]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <BookMarked className="size-5" />
        <h2 className="text-lg font-semibold">سجل التوثيق</h2>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          جارٍ تحميل سجل التوثيق...
        </div>
      )}

      {!isLoading && records.length === 0 && (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          لا يوجد أي توثيق حتى الآن.
        </div>
      )}

      {!isLoading && records.length > 0 && (
        <div className="space-y-4">
          {records.map((record: any) => (
            <Card
              key={record.progressId}
              className="border-zinc-200 shadow-sm"
            >
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold">
                      {toArabicNumbers(record.percentage)}%
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground font-[Thamanyah2]">
                      {new Date(record.createdAt).toLocaleDateString("ar-SY")}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="leading-7 text-zinc-700 font-[Thamanyah2] whitespace-pre-line">
                    {record.notes}
                  </p>
                </div>

                {record.updatedByName && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-[Thamanyah2]">
                    <User className="size-5" />
                    <span>
                      تم التوثيق من قبل:{" "}
                      <span className="font-bold text-zinc-800">
                        {record.updatedByName}
                      </span>
                    </span>
                  </div>
                )}

                {Array.isArray(record.photos) &&
                  record.photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {record.photos.map(
                        (
                          photo: {
                            progressPhotoId?: number;
                            photoUrl?: string;
                            url?: string;
                          },
                          index: number
                        ) => {
                          const imageUrl =
                            photo.photoUrl || photo.url;

                          if (!imageUrl) return null;

                          return (
                            <img
                              key={
                                photo.progressPhotoId ??
                                index
                              }
                              src={imageUrl}
                              alt={`صورة التوثيق ${index + 1}`}
                              className="aspect-square w-full rounded-xl border object-cover"
                            />
                          );
                        }
                      )}
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default InitiativeProgressHistory;