import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient.ts";
import { toast } from "sonner";

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
      const response = await axiosClient.get(
        'v1/colleges',
        {
          params: {
            page,
            size,
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
      const response = await axiosClient.get(`v1/colleges/${id}`);

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

    const payload = {
      name,
    };

    const response = await axiosClient.post(
      'v1/colleges',
      payload,
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

    await axiosClient.delete(`/v1/colleges/${collegeId}`);
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