import { useQuery } from "@tanstack/react-query";
import keycloak from "../lib/keycloak";
import type { User } from "../types/userType";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const getMyUserRequest =
    async (): Promise<User> => {
      const accessToken =
        keycloak.token;

      const response =
        await axios.get(
          `${API_BASE_URL}/api/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type":
                "application/json",
            },
          }
        );

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