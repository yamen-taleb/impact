import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient.ts";
import { toast } from "sonner";

export interface Category {
  categoryId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface GetCategoriesParams {
  page?: number;
  size?: number;
  sort?: string[];
}

/* =========================
   Get All Categories
========================= */
export const useGetCategories = ({
  page = 0,
  size = 10,
  sort = ["categoryId,desc"],
}: GetCategoriesParams) => {
  const fetchCategories = async () => {

    const response = await axiosClient.get(
        'v1/categories',
      {
        params: {
          page,
          size,
          sort,
        },
      }
    );

    return response.data;
  };

  return useQuery({
    queryKey: ["categories", page, size, sort],
    queryFn: fetchCategories,
  });
};

/* =========================
   Get Category By ID
========================= */
export const useGetCategoryById = (id: number) => {
  const fetchCategoryById = async (): Promise<Category> => {

    const response = await axiosClient.get(`v1/categories/${id}`);

    return response.data;
  };

  return useQuery({
    queryKey: ["category", id],
    queryFn: fetchCategoryById,
    enabled: !!id,
  });
};

/* =========================
   Create Category
========================= */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const createCategoryRequest = async (
    name: string
  ): Promise<Category> => {

    const payload = {
      name,
    };

    const response = await axiosClient.post(
        'v1/categories',
        payload,
    );

    return response.data;
  };

  return useMutation({
    mutationFn: createCategoryRequest,

    onSuccess: () => {
      toast.success("تم إضافة التصنيف بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء إضافة التصنيف"
      );
    },
  });
};

/* =========================
   Delete Category
========================= */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const deleteCategoryRequest = async (
    categoryId: number
  ) => {

    await axiosClient.delete(`v1/categories/${categoryId}`);
  };

  return useMutation({
    mutationFn: deleteCategoryRequest,

    onSuccess: () => {
      toast.success("تم حذف التصنيف بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء حذف التصنيف"
      );
    },
  });
};