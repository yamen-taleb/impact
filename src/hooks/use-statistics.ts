import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { statisticsSchema, type Statistics } from "../schemas/statisticsSchema";

export const useGetStatistics = () => {
  return useQuery<Statistics>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await axiosClient.get('v1/users/me/statistics');
      return statisticsSchema.parse(response.data);
    },
  });
};

export const useGetAdminStatistics = (collegeId?: string) => {
  return useQuery({
    queryKey: ["admin-statistics", collegeId],
    queryFn: async () => {
      const response = await axiosClient.get(`v1/statistics`, {
        params: {
          collegeId,
        },
      });
      return response.data;
    },
  });
};
