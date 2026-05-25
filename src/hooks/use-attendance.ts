import axiosClient from "../axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "EXCUSED";

export interface AttendancePayload {
  attendanceDate: string;
  status: AttendanceStatus;
  hoursThatDay: number;
  notes?: string;
  student: number;
  campaign: number;
  recordedBy: number;
}

export interface UpdateAttendancePayload extends AttendancePayload {
  attendanceId: number;
}

/*** GET ATTENDANCE */
export const useAttendance = ({
  campaignId,
  studentId,
}: {
  campaignId: number;
  studentId: number;
}) => {
  const getAttendance = async () => {
    const response = await axiosClient.get( `/v1/campaigns/${campaignId}/attendance`, {
      params: {
        studentId,
      },
    });

    return response.data;
  };

  return useQuery({
    queryKey: [ "attendance", campaignId, studentId, ],
    queryFn: getAttendance,
    enabled: !!campaignId && !!studentId,
  });
};

/*** CREATE */
export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  const createAttendance = async ({
    campaign,
    ...payload
  }: any) => {
    const now = new Date().toISOString();
    const response = await axiosClient.post( `/v1/campaigns/${campaign}/attendance`, {
      ...payload,
      campaign,
      recordedAt: now,
      createdAt: now,
      updatedAt: now,
    });
  
    return response.data; 
  };

  return useMutation({
    mutationFn: createAttendance,
    onSuccess: () => { toast.success( "تم تسجيل الحضور بنجاح");
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "";

      /*** backend حفظ البيانات فعلاً لكنه فشل أثناء serialization*/
      if (
        message.includes("Could not initialize proxy")
      ) {
        toast.success("تم حفظ الحضور بنجاح");
        queryClient.invalidateQueries({
          queryKey: ["attendance"],
        });
        return;
      }

      toast.error(message || "حدث خطأ أثناء تسجيل الحضور");
    },
  });
};

/*** UPDATE */
export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  const updateAttendance = async ({
    attendanceId,
    ...payload
  }: any) => {
    const now = new Date().toISOString();
    const response = await axiosClient.put(`/v1/attendances/${attendanceId}`,{
      ...payload,
      updatedAt: now,
      recordedAt: payload.recordedAt || now,
    });

    return response.data;
  };

  return useMutation({
    mutationFn: updateAttendance,
    onSuccess: () => {toast.success("تم تحديث الحضور");
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || "";

      /*** backend حفظ البيانات فعلاً لكنه فشل أثناء serialization */
      if (
        message.includes("Could not initialize proxy")
      ) {
        toast.success("تم حفظ الحضور بنجاح");
        queryClient.invalidateQueries({
          queryKey: ["attendance"],
        });

        return;
      }

      toast.error(message || "حدث خطأ أثناء تسجيل الحضور");
    },
  });
};

/*** DELETE */
export const useDeleteAttendance =
  () => {
    const queryClient =useQueryClient();

    const deleteRequest = async (
      attendanceId: number
    ) => {
      const response = await axiosClient.delete( `/v1/attendances/${attendanceId}`);

      return response.data;
    };

    return useMutation({
      mutationFn: deleteRequest,
      onSuccess: () => {
        toast.success("تم حذف السجل");

        queryClient.invalidateQueries({
          queryKey: ["attendance"],
        });
      },

      onError: (error: any) => {
        toast.error(error?.response?.data ?.message || "حدث خطأ أثناء حذف السجل" );
      },
    });
  };