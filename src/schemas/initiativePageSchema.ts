import { z } from "zod";

export const initiativeStatusEnum = z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "ONGOING",
    "COMPLETED",
    "CANCELED",
]);

export const lastProgressSchema = z.object({
    progressId: z.number(),
    percentage: z.number(),
    notes: z.string().optional().nullable(),
    createdAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
    campaign: z.number(),
    updatedBy: z.number().optional().nullable(),
});

export const initiativePageSchema = z.object({
    campaignId: z.number(),
    title: z.string(),
    description: z.string(),
    status: initiativeStatusEnum,
    startDate: z.string(),
    endDate: z.string(),
    location: z.string(),
    category: z.string(),
    maxVolunteers: z.number(),
    proposedById: z.number(),
    managedById: z.number().optional().nullable(),
    approvedById: z.number().optional().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string().optional().nullable(),
    photo: z.string().optional().nullable(),
    collegeId: z.number().optional().nullable(),
    collegeName: z.string().optional().nullable(),
    lastProgress: lastProgressSchema.optional().nullable(),
    progressPhotos: z.array(z.string()).optional().nullable(),
});

export const initiativesSchema = z.array(initiativePageSchema);

export const paginatedInitiativesSchema = z.object({
    content: z.array(initiativePageSchema),
    totalPages: z.number(),
    totalElements: z.number(),
    size: z.number(),
    number: z.number(),
    empty: z.boolean().optional(),
    first: z.boolean().optional(),
    last: z.boolean().optional(),
    numberOfElements: z.number().optional(),
    pageable: z.any().optional(),
}).passthrough();

export type Initiative = z.infer<typeof initiativePageSchema>;
export type Initiatives = z.infer<typeof initiativesSchema>;
export type PaginatedInitiatives = z.infer<typeof paginatedInitiativesSchema>;
