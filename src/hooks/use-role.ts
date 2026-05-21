import axiosClient from "../axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RolePayload {
  userId: number;
  role: "ROLE_USER" | "ROLE_ADMIN" | "ROLE_SUPERADMIN";
}

export const useRole = () => {
  const queryClient = useQueryClient();

  const updateRole = useMutation({
    mutationFn: async ({ userId, role }: RolePayload) => {
      return axiosClient.put(
        `/v1/users/${userId}/role`,
        null,
        {
          params: {
            role,
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("تم تحديث الدور بنجاح");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return { updateRole };
};