// hooks/use-progress.ts

import axiosClient from "../axiosClient";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

export interface ProgressPayload {
  percentage: number;
  notes: string;
  campaign: number;
  updatedBy: number;
}

export interface UpdateProgressPayload
  extends ProgressPayload {
  progressId: number;
}

export interface ProgressPhotoPayload {
  campaignId: number;
  photos: File[];
}

/** =========================
 * GET ALL PROGRESS
 * ========================= */
export const useProgress = (
  campaignId?: number
) => {
  const getProgress = async () => {
    const response =
      await axiosClient.get(`/v1/campaigns/${campaignId}/progress`);

    return response.data;
  };

  return useQuery({
    queryKey: [
      "campaign-progress",
      campaignId,
    ],

    queryFn: getProgress,

    enabled: !!campaignId,
  });
};

/** =========================
 * CREATE PROGRESS
 * ========================= */
export const useCreateProgress =
  () => {
    const queryClient =
      useQueryClient();

    const createProgress =
      async ({
        campaign,
        ...payload
      }: ProgressPayload) => {
        const now =
          new Date().toISOString();

        const response =
          await axiosClient.post(
            `/v1/campaigns/${campaign}/progress`,
            {
              ...payload,

              campaign,

              createdAt: now,

              updatedAt: now,
            }
          );

        return response.data;
      };

    return useMutation({
      mutationFn: createProgress,

      onSuccess: () => {
        toast.success(
          "تم إضافة التوثيق بنجاح"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "campaign-progress",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "campaign-details",
          ],
        });
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "حدث خطأ أثناء إضافة التوثيق"
        );
      },
    });
  };

/** =========================
 * UPDATE PROGRESS
 * ========================= */
export const useUpdateProgress =
  () => {
    const queryClient =
      useQueryClient();

    const updateProgress =
      async ({
        progressId,
        ...payload
      }: UpdateProgressPayload) => {
        const response =
          await axiosClient.patch(
            `/v1/progress/${progressId}`,
            {
              ...payload,

              updatedAt:
                new Date().toISOString(),
            }
          );

        return response.data;
      };

    return useMutation({
      mutationFn: updateProgress,

      onSuccess: () => {
        toast.success(
          "تم تحديث التوثيق"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "campaign-progress",
          ],
        });
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "حدث خطأ أثناء تحديث التوثيق"
        );
      },
    });
  };

/** =========================
 * DELETE PROGRESS
 * ========================= */
export const useDeleteProgress =
  () => {
    const queryClient =
      useQueryClient();

    const deleteProgress =
      async ({
        campaignId,
        progressId,
      }: {
        campaignId: number;
        progressId: number;
      }) => {
        const response =
          await axiosClient.delete(
            `/v1/campaigns/${campaignId}/progress/${progressId}`
          );

        return response.data;
      };

    return useMutation({
      mutationFn: deleteProgress,

      onSuccess: () => {
        toast.success(
          "تم حذف التوثيق"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "campaign-progress",
          ],
        });
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "حدث خطأ أثناء حذف التوثيق"
        );
      },
    });
  };

/** =========================
 * UPLOAD CAMPAIGN PHOTOS
 * =========================
 *
 * بما أن backend لا يدعم ربط الصور بالتقدم
 * سنرفع الصور مباشرة إلى المبادرة
 */
export const useUploadProgressPhotos =
  () => {
    const queryClient =
      useQueryClient();

    const uploadPhotos =
      async ({
        campaignId,
        photos,
      }: ProgressPhotoPayload) => {
        const formData =
          new FormData();

        photos.forEach((file) => {
          formData.append(
            "files",
            file
          );
        });

        const response =
          await axiosClient.post(
            `/v1/campaigns/${campaignId}/photos/uploads`,
            formData
          );

        return response.data;
      };

    return useMutation({
      mutationFn: uploadPhotos,

      onSuccess: () => {
        toast.success(
          "تم رفع الصور بنجاح"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "campaign-details",
          ],
        });
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data
            ?.message ||
            "حدث خطأ أثناء رفع الصور"
        );
      },
    });
  };