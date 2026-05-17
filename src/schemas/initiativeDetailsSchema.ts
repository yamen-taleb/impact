import { z } from "zod";

export const initiativeStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "ONGOING",
  "COMPLETED"
]);

export const initiativeDetailsSchema = z.object({
  campaignId: z.number(),
  title: z.string(),
  description: z.string(),
  location: z.string(),

  startDate: z.string(),
  endDate: z.string(),

  maxVolunteers: z.number(),

  photo: z.string().nullable().optional(),

  status: initiativeStatusEnum,

  publishedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),

  proposedById: z.number().nullable().optional(),
  approvedById: z.number().nullable().optional(),
  managedById: z.number().nullable().optional(),

  category: z.string(),

  collegeId: z.number().nullable().optional(),

  // هنا التعديل المهم
  collegeName: z.string().nullable().optional(),

  // هنا أيضًا
  progressPhotos: z
    .array(z.string())
    .nullable()
    .optional(),

  lastProgress: z
    .object({
      progressId: z.number(),
      percentage: z.number(),
      notes: z.string(),
      createdAt: z.string(),
      updatedAt: z.string().nullable(),
      campaign: z.number(),
      updatedBy: z.number(),
    })
    .nullable()
    .optional(),
});

export type InitiativeDetails =
  z.infer<
    typeof initiativeDetailsSchema
  >;