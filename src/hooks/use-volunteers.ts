import axiosClient from "../axiosClient";
import { useQuery } from "@tanstack/react-query";
import { paginatedVolunteersSchema } from "../schemas/volunteerSectionSchema";

interface UseVolunteersParams {
  campaignId: number;
  page?: number;
  size?: number;
}

export const useVolunteers = ({
  campaignId,
  page = 0,
  size = 100,
}: UseVolunteersParams) => {
  const fetchVolunteers = async () => {
    const response = await axiosClient.get(
      `/v1/campaigns/${campaignId}/students`,
      {
        params: {
          status: "APPROVED",
          page,
          size,
        },
      }
    );

    return paginatedVolunteersSchema.parse(response.data);
  };

  return useQuery({
    queryKey: ["volunteers", campaignId, page, size],
    queryFn: fetchVolunteers,
    enabled: !!campaignId,
  });
};