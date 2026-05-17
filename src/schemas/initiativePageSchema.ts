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
    notes: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    updatedByName: z.string().nullable(),
    campaignTitle: z.string().nullable(),
});

export const initiativePageSchema = z.object({
    campaignId: z.number(),
    title: z.string(),
    description: z.string(),
    status: initiativeStatusEnum,
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    location: z.string(),
    category: z.string(),
    maxVolunteers: z.number().nullable(),
    managedById: z.number().nullable().optional(),
    approvedById: z.number().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    publishedAt: z.string().nullable().optional(),
    photo: z.string().nullable().optional(),
    photos: z.array(z.string()).nullable().optional(),
    collegeId: z.number().nullable().optional(),
    collegeName: z.string().nullable().optional(),
    lastProgress: lastProgressSchema.nullable().optional(),
    progressPhotos: z.array(z.string()).nullable().optional(),
    proposedByName: z.string(),
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
