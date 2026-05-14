import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/userType";
import { toast } from "sonner";
import { useEffect } from "react";
import axiosClient from "../axiosClient.ts";

export const useGetMyUser = () => {
  const getMyUserRequest =
    async (): Promise<User> => {
      const response =
        await axiosClient.get("v1/users/me");

      return response.data as User;
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

  if (error) {
    useEffect(() => {
      if (error) {
        toast.error(
          (error as Error).message
        );
      }
    }, [error]);
  }

  return {
    currentUser,
    isLoading,
    refetch,
  };
};