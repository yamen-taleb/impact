import {initiativeStatusEnum, paginatedInitiativesSchema, type InitiativeStatus} from "../schemas/initiativePageSchema.ts";
import axiosClient from "../axiosClient.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { initiativeDetailsSchema } from "../schemas/initiativeDetailsSchema.ts";
import {z} from "zod";
import {initiativeSchema} from "../schemas/initiativeSchema.ts";
import {toast} from "sonner";


interface InitiativeParams {
    page?: number;
    size?: number;
    sort?: string;
    searchText?: string;

    status?: InitiativeStatus | InitiativeStatus[];

    collegeId?: string | number | null;
    categoryId?: string | number | null;
    proposedByUserId?: string | number | null;
}

interface UpdateCampaignPayload {
    campaignId: number;

    approvedById?: number;
    managedById?: number;

    status?: "PENDING" | "APPROVED" | "REJECTED" | "ONGOING" | "COMPLETED";
}


export const useGetInitiatives = ({
    page = 0,
    size = 6,
    sort = "createdAt,desc",
    status,
    searchText,
    collegeId,
    categoryId,
    proposedByUserId,
}: InitiativeParams) => {
    const fetchInitiatives = async () => {
        const response = await axiosClient.get("v1/campaigns", {
            params: {
                page,
                size,
                sort,
                ...(status ? { status } : {}),
                searchText,
                collegeId,
                categoryId,
                proposedByUserId,
            },
        });

        return paginatedInitiativesSchema.parse(response.data)
    }

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            "initiatives",
            page,
            size,
            sort,
            status,
            searchText,
            collegeId,
            categoryId,
            proposedByUserId,
        ],
        queryFn: fetchInitiatives,
    });

    if (error) {
        console.error(error);
    }

    return {
        data,
        isLoading,
        error,
    }
}

export const useCreateInitiative = () => {
    const queryClient = useQueryClient();

    const createInitiativeRequest = async (
        data: z.infer<typeof initiativeSchema> & {
            photos: File[];
            proposedById: string | number;
        }) => {
        const { title, description, location, proposedById, categoryId, collegeId, photos } = data;

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("proposedById", proposedById.toString());
        formData.append("categoryId", categoryId.toString());
        formData.append("collegeId", collegeId.toString());
        formData.append("status", "PENDING");

        photos.forEach((file) => {
            formData.append("photoFiles", file); // name must match backend
        });

        const response = await axiosClient.post("v1/campaigns", formData);

        return response.data;
    };

    return useMutation({
        mutationFn: createInitiativeRequest,
        onSuccess: () => {
            toast.success("تم إضافة مبادرة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["initiatives"],
            });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "حدث خطأ أثناء إضافة المبادرة"
            );
        },
    });
};


export const useGetCampaignById = (campaignId?: number) => {
  const fetchCampaignById = async () => {
    const response = await axiosClient.get(
      `v1/campaigns/${campaignId}`
    );

    return response.data;
  };

  return useQuery({
    queryKey: ["campaign-details", campaignId],
    queryFn: fetchCampaignById,
    enabled: !!campaignId && !isNaN(campaignId),

    // مهم: يمنع الرجوع القديم عند تغيير id
    staleTime: 0,
    gcTime: 0,
  });
};



export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  const updateCampaignRequest = async ({
    campaignId,
    ...payload
  }: UpdateCampaignPayload) => {
    const response = await axiosClient.patch(
      `/v1/campaigns/${campaignId}`,
      payload
    );

    return response.data;
  };

  return useMutation({
    mutationFn: updateCampaignRequest,

    onSuccess: (_, variables) => {
      toast.success("تم تحديث حالة المبادرة بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["campaign-details", variables.campaignId],
      });

      queryClient.invalidateQueries({
        queryKey: ["initiatives"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تحديث المبادرة"
      );
    },
  });
};