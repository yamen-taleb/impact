import { z } from "zod";

export const volunteerSchema = z.object({
  userId: z.number(),
  studentNumber: z.string(),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  academicYear: z.number().nullable().optional(),
  photo: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  birthdate: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  collegeName: z.string().nullable().optional(),
  applicationId: z.number(),
  applicationStatus: z.string(),
  motivationLetter: z.string().nullable().optional(),
  rejectionReason: z.string().nullable().optional(),
  adminNotes: z.string().nullable().optional(),
  appliedAt: z.string().nullable().optional(),
  reviewedAt: z.string().nullable().optional(),
  withdrawnAt: z.string().nullable().optional(),
  removedAt: z.string().nullable().optional(),
  removalReason: z.string().nullable().optional(),
  reviewedByName: z.string().nullable().optional(),
});

export const paginatedVolunteersSchema =
  z.object({
    content: z.array(volunteerSchema),
    totalElements: z.number(),
    totalPages: z.number(),
    size: z.number(),
    number: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    numberOfElements: z.number(),
    empty: z.boolean(),
  });

export type Volunteer = z.infer<
  typeof volunteerSchema
>;

export type PaginatedVolunteers =
  z.infer<
    typeof paginatedVolunteersSchema
  >;