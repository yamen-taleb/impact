import {
  useMutation,
  useQueries,
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



// ***
const STUDENTS_PAGE_SIZE = 100;

export const useGetAllStudents = () => {
  const firstPageQuery = useQuery({
    queryKey: ["students", "first-page", STUDENTS_PAGE_SIZE],
    queryFn: async () => {
      const response = await axiosClient.get("v1/users", {
        params: {
          page: 0,
          size: STUDENTS_PAGE_SIZE,
          sort: "createdAt,desc",
        },
      });

      return response.data;
    },
  });

  const totalPages = firstPageQuery.data?.totalPages ?? 0;

  const remainingQueries = useQueries({
    queries: Array.from(
      { length: Math.max(totalPages - 1, 0) },
      (_, index) => ({
        queryKey: ["students", index + 1, STUDENTS_PAGE_SIZE],
        queryFn: async () => {
          const response = await axiosClient.get("v1/users", {
            params: {
              page: index + 1,
              size: STUDENTS_PAGE_SIZE,
              sort: "createdAt,desc",
            },
          });

          return response.data;
        },
        enabled: !!firstPageQuery.data,
      }))
  })

  const isLoading =
    firstPageQuery.isLoading ||
    remainingQueries.some((query) => query.isLoading);

  const isError =
    firstPageQuery.isError ||
    remainingQueries.some((query) => query.isError);

  const students = [
    ...(firstPageQuery.data?.content ?? []),
    ...remainingQueries.flatMap(
      (query) => query.data?.content ?? []
    ),
  ];

  return {
    students,
    isLoading,
    isError,
    totalStudents: students.length,
  };
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