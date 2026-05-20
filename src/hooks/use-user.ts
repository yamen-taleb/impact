import { toast } from "sonner";
import { useEffect } from "react";
import axiosClient from "../axiosClient.ts";
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import {userSchema, type UserType} from "../schemas/userSchema.ts";
import { campaignsSchema } from "../schemas/campaignsSchema";

export const useGetMyUser = () => {
    const getMyUserRequest =
        async (): Promise<UserType> => {
            const response =
                await axiosClient.get("v1/users/me");

            return userSchema.parse(response.data);
        };

    const {
        data: currentUser,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["fetchCurrentUser"],
        queryFn: getMyUserRequest,
    });

    useEffect(() => {
        if (error) {
            toast.error(
                (error as Error).message
            );
        }
    }, [error]);

    return {
        currentUser,
        isLoading,
        error,
        refetch,
    };
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const updateUserRequest = async (data: Partial<UserType> & { userId: number; photoFile?: File }) => {
        const { userId, photoFile, ...rest } = data;

        if (photoFile) {
            const payload = {
                firstName: rest.firstName || "",
                lastName: rest.lastName || "",
                email: rest.email || "",
                photo: photoFile,
            };

            const formData = new FormData();
            formData.append("photo", photoFile);
            formData.append("firstName", payload.firstName);
            formData.append("lastName", payload.lastName);
            formData.append("email", payload.email);

            const response = await axiosClient.put(`v1/users/${userId}`, formData);
            return response.data;

        } else {
            const payload = {
                firstName: rest.firstName || undefined,
                lastName: rest.lastName || undefined,
                email: rest.email || undefined,
                phone: rest.phone || undefined,
                birthdate: typeof rest.birthdate === 'string' ? rest.birthdate : undefined,
                location: typeof rest.location === 'string' ? rest.location : undefined,
                collegeId: rest.collegeId ? Number(rest.collegeId) : undefined,
                academicYear: rest.academicYear ? String(rest.academicYear) : undefined,
                description: rest.description ? rest.description : undefined,
            };
            const response = await axiosClient.put(`v1/users/${userId}`, payload, {});
            return response.data;
        }
    };

    return useMutation({
        mutationFn: updateUserRequest,
        onSuccess: () => {
            toast.success("تم تحديث البيانات بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["fetchCurrentUser"],
            });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "حدث خطأ أثناء تحديث البيانات"
            );
        },
    });
};

export const useGetUserById = (id: string|undefined) => {
    const getUserByIdRequest = async (): Promise<UserType> => {
        const response = await axiosClient.get(`v1/users/${id}`);
        return userSchema.parse(response.data);
    }

    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["fetchUserById"],
        queryFn: getUserByIdRequest,
    });

    useEffect(() => {
        if (error) {
            toast.error(
                (error as Error).message
            );
        }
    }, [error]);

    return {
        user,
        isLoading,
        error,
        refetch,
    };
}

export const useGetUserCampaigns = ({
  userId,
  page,
  size,
  searchText,
  collegeId,
  status,
  categoryId,
}: {
  userId: number | string | undefined;
  page?: number;
  size?: number;
  searchText?: string;
  collegeId?: string;
  status?: string;
  categoryId?: string;
}) => {
  return useQuery({
    queryKey: ["fetchUserCampaigns", userId, page, searchText, collegeId, status, categoryId],
    queryFn: async () => {
      const response = await axiosClient.get(`/v1/users/${userId}/attended-campaigns`, {
        params: {
            page,
            size,
            searchText,
            collegeId,
            status,
            categoryId,
        },
      });
      return campaignsSchema.parse(response.data);
    },
  });
};

