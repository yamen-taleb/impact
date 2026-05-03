import { z } from "zod";

export const initiativeStatusEnum = z.enum([
    "PENDING_APPROVAL",
    "APPROVED",
    "RESOLVED",
    "REJECTED",
]);

export const initiativePageSchema = z.object({
    id: z.union([z.string(), z.number()]),
    photo: z.string(),
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
    percentage: z
        .number(),
    maxVolunteers: z
        .number(),
});

export const initiativesSchema = z.array(initiativePageSchema);

export type Initiative = z.infer<typeof initiativePageSchema>;
export type Initiatives = z.infer<typeof initiativesSchema>;
