import axiosClient from "../axiosClient";
import { useQuery } from "@tanstack/react-query";
import { paginatedVolunteersSchema } from "../schemas/volunteerSectionSchema";

interface UseVolunteersParams {
  campaignId: number;

  page?: number;
  size?: number;

  searchText?: string;
  status?: string;
  collegeId?: number | string;
}

export const useVolunteers = ({
  campaignId,
  page = 0,
  size = 6,
  searchText,
  status,
  collegeId,
}: UseVolunteersParams) => {
  const fetchVolunteers = async () => {
    const response = await axiosClient.get(
      `/v1/campaigns/${campaignId}/students`,
      {
        params: {
          page,
          size,

          searchText: searchText || undefined,
          status: status || undefined,
          collegeId: collegeId || undefined,
          campaignId,
        },
      }
    );

    return paginatedVolunteersSchema.parse(
      response.data
    );
  };

  return useQuery({
    queryKey: [
      "volunteers",
      campaignId,
      page,
      size,
      searchText,
      status,
      collegeId,
    ],

    queryFn: fetchVolunteers,

    enabled: !!campaignId,
  });
};