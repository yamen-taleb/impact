import { z } from "zod";

export const campaignContentSchema = z.object({
  campaignId: z.number().or(z.string()),
  title: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  status: z.string(),
  categoryName: z.string(),
  proposedByName: z.string(),
  collegeName: z.string(),
  photo: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  daysAttended: z.number().nullable(),
  totalHours: z.number().nullable(),
});

export const campaignsSchema = z.object({
  totalCampaigns: z.number(),
  totalHours: z.number(),
  campaigns: z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    pageable: z.any(), // You can further define this if needed
    first: z.boolean(),
    last: z.boolean(),
    size: z.number(),
    content: z.array(campaignContentSchema),
    number: z.number(),
    sort: z.any(),
    numberOfElements: z.number(),
    empty: z.boolean(),
  }),
});

export type AttendedCampaign = z.infer<typeof campaignContentSchema>;
