import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import keycloak from "../lib/keycloak";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    const token = keycloak.token;

    const response = await axios.get(
      `${API_BASE_URL}/api/v1/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    const token = keycloak.token;

    const response = await axios.get(
      `${API_BASE_URL}/api/v1/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    const token = keycloak.token;

    const payload = {
      name,
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/v1/categories`,
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
    const token = keycloak.token;

    await axios.delete(
      `${API_BASE_URL}/api/v1/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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