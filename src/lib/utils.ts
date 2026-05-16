import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import keycloak from "./keycloak.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const toArabicNumbers = (
  value: string | number | null | undefined
) => {
  if (value === null || value === undefined) {
    return "-";
  }

  return value
    .toString()
    .replace(/\d/g, (digit) =>
      "٠١٢٣٤٥٦٧٨٩"[Number(digit)]
    );
};

export const getUserRole = () => {
  return keycloak.hasRealmRole?.("ROLE_ADMIN") ? "Admin"
      : keycloak.hasRealmRole?.("ROLE_SUPERADMIN") ? "Manager"
          : "User"
}

export const getImageUrl = (url: string|null) => {
  return url?.startsWith("https")
      ? url
      : import.meta.env.VITE_API_BASE_URL + url;
}