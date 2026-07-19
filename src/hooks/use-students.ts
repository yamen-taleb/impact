import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import axiosClient from "../axiosClient.ts";
import { toast } from "sonner";

export interface User {
  userId: number;
  studentNumber: string;
  keycloakId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  academicYear: number;
  createdAt: string;
  updatedAt: string;
  college: string;
  isBanned: boolean;
}

interface GetStudentsParams {
  page?: number;
  size?: number;
  sort?: string;
}






// GET ALL STUDENTS
export const useGetStudents = ({
  page = 0,
  size = 10,
  sort = "createdAt,desc",
}: GetStudentsParams) => {
  return useQuery({
    queryKey: [
      "students",
      page,
      size,
      sort,
    ],

    queryFn: async () => {
      const response =
        await axiosClient.get(
          'v1/users',
          {
            params: {
              page,
              size,
              sort,
            },
          }
        );

      return response.data;
    },
  });
};


// GET ALL CAMPAIGNS STUDENTS
export const useGetCampaignsStudents = ({
  page = 0,
  size = 1000, // مهم: نحتاج كل الطلاب
  sort = []
}: GetStudentsParams) => {
  return useQuery({
    queryKey: ["students", page, size, sort],
    queryFn: async () => {
      const response = await axiosClient.get("v1/users", {
        params: { page, size, sort },
      });

      return response.data;
    },
  });
};




// BAN / UNBAN STUDENT
export const useToggleStudentBan = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      isBanned,
    }: {
      userId: number;
      isBanned: boolean;
    }) => {
      const response =
        await axiosClient.patch(
          `v1/users/${userId}/ban`,
          {
            isBanned,
          },
        );

      return response.data;
    },

    onSuccess: () => {
      toast.success(
        "تم تحديث حالة الطالب"
      );

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },

    onError: (error: any) => {
      console.log(
        error.response?.data
      );

      toast.error(
        "فشل في تحديث حالة الطالب"
      );
    },
  });
};