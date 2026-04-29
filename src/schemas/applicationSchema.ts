import { z } from "zod";

export const applicationStatusEnum = z.enum([
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "WITHDRAWN",
]);

export const applicationSchema = z.object({
    id: z.union([z.string(), z.number()]),
    initiativeId: z.union([z.string(), z.number()]),
    initiativeTitle: z.string(),
    initiativeCollege: z.string(),
    initiativeCategory: z.string(),
    initiativePhoto: z.string().optional(),
    applicantName: z.string(),
    applicantEmail: z.string(),
    applicantPhone: z.string(),
    applicationDate: z.string(),
    status: applicationStatusEnum,
    coverLetter: z.string(),
    reviewDate: z.string().optional(),
    reviewerFeedback: z.string().optional(),
});

export const applicationsSchema = z.array(applicationSchema);

export type Application = z.infer<typeof applicationSchema>;
export type Applications = z.infer<typeof applicationsSchema>;

