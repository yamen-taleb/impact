import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import keycloak from "./keycloak.ts";
import {useCollegeContext} from "../context/CollegeContext.tsx";

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


export const getAcademicYearLabel = (
  year: number | string | null | undefined
) => {
  if (year === null || year === undefined) {
    return "-";
  }

  const academicYears: Record<number, string> = {
    1: "الأولى",
    2: "الثانية",
    3: "الثالثة",
    4: "الرابعة",
    5: "الخامسة",
    6: "السادسة",
    7: "السابعة",
  };

  const parsedYear = Number(year);

  return academicYears[parsedYear] || "-";
};


export const formatArabicPhoneNumber = (
  phone: string | number | null | undefined
) => {
  if (!phone) {
    return "-";
  }

  const cleanedPhone = phone
    .toString()
    .replace(/\s+/g, "");

  const formattedPhone = cleanedPhone.replace(
    /^(\d{4})(\d{3})(\d{3})$/,
    "$1 $2 $3"
  );

  return toArabicNumbers(formattedPhone);
};

export const formatArabicDate = (
  date: string | null | undefined
) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString(
    "ar-SY",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
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

export const getCollegeId = (collegeOptions, collegeName) => {
  return collegeOptions.find((option) => option.label === collegeName)?.value
}