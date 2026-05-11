import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import keycloak from "../lib/keycloak";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface College {
  collegeId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GetCollegesParams {
  page?: number;
  size?: number;
}






// GET ALL COLLEGES
export const useGetColleges = ({
  page = 0,
  size = 20,
}: GetCollegesParams) => {
  return useQuery({
    queryKey: ["colleges", page, size],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/colleges`,
        {
          params: {
            page,
            size,
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




// GET COLLEGE BY ID
export const useGetCollegeById = (id: number) => {
  return useQuery({
    queryKey: ["college", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/colleges/${id}`,
        {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      );

      return response.data;
    },
    enabled: !!id,
  });
};




// CREATE COLLEGE
export const useCreateCollege = () => {
  const queryClient = useQueryClient();

  const createCollegeRequest = async (
    name: string
  ): Promise<College> => {
    const token = keycloak.token;

    const payload = {
      name,
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/v1/colleges`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  return useMutation({
    mutationFn: createCollegeRequest,

    onSuccess: () => {
      toast.success("تم إضافة الكلية بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["colleges"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء إضافة الكلية"
      );
    },
  });
};




// DELETE COLLEGE
export const useDeleteCollege = () => {
  const queryClient = useQueryClient();

  const deleteCollegeRequest = async (
    collegeId: number
  ) => {
    const token = keycloak.token;

    await axios.delete(
      `${API_BASE_URL}/api/v1/colleges/${collegeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return useMutation({
    mutationFn: deleteCollegeRequest,

    onSuccess: () => {
      toast.success("تم حذف الكلية بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["colleges"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء حذف الكلية"
      );
    },
  });
};