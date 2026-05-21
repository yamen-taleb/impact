import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";
import { statisticsSchema, Statistics } from "../schemas/statisticsSchema";

export const useGetStatistics = () => {
  return useQuery<Statistics>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await axiosClient.get('v1/users/me/statistics');
      return statisticsSchema.parse(response.data);
    },
  });
};

