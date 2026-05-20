import { z } from "zod";


export const applicationStatusEnum = z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "WITHDRAWN",
]);

export const applicationContentSchema = z.object({
    id: z.number(),
    motivationLetter: z.string().nullable(),
    status: z.string().nullable(),
    rejectionReason: z.string().nullable(),
    adminNotes: z.string().nullable(),
    appliedAt: z.string().nullable(),
    withdrawnAt: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    reviewedAt: z.string().nullable(),
    removalReason: z.string().nullable(),
    removedAt: z.string().nullable(),
    campaignId: z.number(),
    campaignTitle: z.string().nullable(),
    campaignPhoto: z.string().nullable(),
    campaignCategory: z.string().nullable(),
    campaignCollegeName: z.string().nullable(),
    reviewedByName: z.string().nullable(),
    removedByName: z.string().nullable(),
});

export const applicationsSchema = z.object({
    total: z.number(),
    pending: z.number(),
    approved: z.number(),
    rejected: z.number(),
    withdrawn: z.number(),
    cancelled: z.number(),
    applications: z.object({
        totalElements: z.number(),
        totalPages: z.number(),
        pageable: z.any().optional(),
        first: z.boolean(),
        last: z.boolean(),
        size: z.number(),
        content: z.array(applicationContentSchema),
        number: z.number(),
        sort: z.any().optional(),
        numberOfElements: z.number(),
        empty: z.boolean(),
    }),
});

export type Application = z.infer<typeof applicationContentSchema>;