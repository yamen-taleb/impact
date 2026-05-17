import {initiativeStatusEnum, paginatedInitiativesSchema} from "../schemas/initiativePageSchema.ts";
import axiosClient from "../axiosClient.ts";
import {useQuery} from "@tanstack/react-query";
import { initiativeDetailsSchema } from "../schemas/initiativeDetailsSchema.ts";


interface InitiativeParams {
    page?: number;
    size?: number;
    sort?: string[];
    searchText?: string;
    status?: typeof initiativeStatusEnum;
    collegeId?: string|number;
    categoryId?: string|number;
    proposedByUserId?: string|number;
}


export const useGetInitiatives = ({
    page = 0,
    size = 6,
    sort = ["campaignId,desc"],
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
                status,
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


export const useGetCampaignById = (
  campaignId?: number
) => {
  const fetchCampaignById =
    async () => {
      const response =
        await axiosClient.get(
          `v1/campaigns/${campaignId}`
        );

      return initiativeDetailsSchema.parse(
        response.data
      );
    };

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "campaign-details",
      campaignId,
    ],

    queryFn: fetchCampaignById,

    enabled:
      !!campaignId &&
      !isNaN(campaignId),
  });

  if (error) {
    console.error(error);
  }

  return {
    data,
    isLoading,
    error,
  };
};