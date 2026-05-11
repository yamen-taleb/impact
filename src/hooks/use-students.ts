import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import axios from "axios";
import keycloak from "../lib/keycloak";
import { toast } from "sonner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

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
  sort?: string[];
}






// GET ALL STUDENTS
export const useGetStudents = ({
  page = 0,
  size = 10,
  sort = [],
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
        await axios.get(
          `${API_BASE_URL}/api/v1/users`,
          {
            params: {
              page,
              size,
              sort,
            },

            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          }
        );

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
        await axios.patch(
          `${API_BASE_URL}/api/v1/users/${userId}/ban`,
          {
            isBanned,
          },
          {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              "Content-Type":
                "application/json",
            },
          }
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