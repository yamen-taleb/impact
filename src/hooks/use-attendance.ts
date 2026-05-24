import axiosClient from "../axiosClient";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

export type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "EXCUSED";

interface CreateAttendancePayload {
  attendanceDate: string;

  status: AttendanceStatus;

  hoursThatDay: number;

  notes?: string;

  student: number;

  campaign: number;

  recordedBy: number;
}

export const useAttendance = ({
  campaignId,
  studentId,
}: {
  campaignId: number;
  studentId: number;
}) => {
  const getAttendance = async () => {
    const response = await axiosClient.get(
      `/v1/campaigns/${campaignId}/attendance`,
      {
        params: {
          studentId,
        },
      }
    );

    return response.data;
  };

  return useQuery({
    queryKey: [
      "attendance",
      campaignId,
      studentId,
    ],

    queryFn: getAttendance,

    enabled:
      !!campaignId && !!studentId,
  });
};

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  const createAttendance = async ({
    campaign,
    ...payload
  }: CreateAttendancePayload) => {
    const response = await axiosClient.post(
      `/v1/campaigns/${campaign}/attendance`,
      {
        ...payload,

        campaign,

        recordedAt:
          new Date().toISOString(),

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      }
    );

    return response.data;
  };

  return useMutation({
    mutationFn: createAttendance,

    onSuccess: () => {
      toast.success(
        "تم تسجيل الحضور بنجاح"
      );

      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تسجيل الحضور"
      );
    },
  });
};


export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  const updateAttendance = async ({
    attendanceId,
    ...payload
  }: any) => {
    const response = await axiosClient.put(
      `/v1/attendance/${attendanceId}`,
      payload
    );

    return response.data;
  };

  return useMutation({
    mutationFn: updateAttendance,

    onSuccess: () => {
      toast.success(
        "تم تحديث الحضور"
      );

      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تحديث الحضور"
      );
    },
  });
};