"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Upload } from "lucide-react";

interface ProgressRecord {
  id: number;
  percentage: number;
  comment: string;
  images: File[];
  createdAt: Date;
}

const ProgressManagement = () => {
  const [percentage, setPercentage] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [records, setRecords] = useState<ProgressRecord[]>([]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleAddProgress = () => {
    if (!percentage || !comment) return;

    const newRecord: ProgressRecord = {
      id: Date.now(),
      percentage: Number(percentage),
      comment,
      images,
      createdAt: new Date(),
    };

    setRecords((prev) => [...prev, newRecord]);

    setPercentage("");
    setComment("");
    setImages([]);
  };

  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        توثيق تقدم المبادرة
      </h2>

      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>النسبة المئوية</Label>
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="مثال: 50"
            value={percentage}
            onChange={(e) =>
              setPercentage(e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>رفع صور التقدم</Label>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            <span>اختر الصور</span>

            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          {images.length > 0 && (
            <p className="text-sm text-gray-500">
              تم اختيار {images.length} صورة
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label>تعليق حول التقدم</Label>

        <Textarea
          placeholder="اكتب تفاصيل التقدم..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />
      </div>

      <Button
        className="mt-5 w-full"
        onClick={handleAddProgress}
      >
        إضافة التوثيق
      </Button>

      {/* Progress History */}
      {records.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-md font-medium">
            سجل التوثيق
          </h3>

          {records.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    {record.percentage}%
                  </span>

                  <span className="text-sm text-gray-500">
                    {record.createdAt.toLocaleDateString()}
                  </span>
                </div>

                <p>{record.comment}</p>

                {record.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {record.images.map(
                      (image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(
                            image
                          )}
                          alt="progress"
                          className="h-28 w-full rounded-lg object-cover"
                        />
                      )
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

export default ProgressManagement;