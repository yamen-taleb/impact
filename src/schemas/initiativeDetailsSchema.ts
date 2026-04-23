import { z } from "zod";

export const initiativeStatusEnum = z.enum([
    "PENDING_APPROVAL",
    "APPROVED",
    "PENDING_FUNDING",
    "RESOLVED",
    "REJECTED",
]);

export const initiativeDetailsSchema = z.object({
    id: z.union([z.string(), z.number()]),
    photos: z.array(z.string()),
    submissionDate: z
        .string(),
    title: z
        .string(),
    status: initiativeStatusEnum,
    description: z
        .string(),
    college: z.string(),
    category: z.string(),
    address: z
        .string(),
    estimatedTimeToComplete: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    percentage: z
        .number(),
});

export type InitiativeDetails = z.infer<typeof initiativeDetailsSchema>;
