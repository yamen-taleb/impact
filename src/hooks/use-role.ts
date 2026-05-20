import axiosClient from "../axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RolePayload {
  userId: number;
  role: "ROLE_ADMIN" | "ROLE_SUPERADMIN";
}

export const useRole = () => {
  const queryClient = useQueryClient();

  const addRole = useMutation({
    mutationFn: async ({ userId, role }) => {
      return axiosClient.put(
        `/v1/users/${userId}/add-role`,
        {},
        {
          params: {
            newRole: role,
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("تم إضافة الدور بنجاح");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const removeRole = useMutation({
    mutationFn: async ({ userId, role }) => {
      return axiosClient.put(
        `/v1/users/${userId}/remove-role`,
        null,
        {
          params: {
            newRole: role, // 👈 نفس الاسم هنا
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("تم إزالة الدور بنجاح");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return { addRole, removeRole };
};