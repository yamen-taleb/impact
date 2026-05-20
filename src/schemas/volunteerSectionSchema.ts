import { z } from "zod";

export const volunteerSectionSchema = z.object({
    id: z.union([z.string(), z.number()]),
    sutdentNumber: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    photo: z.string(),
    birthDate: z.coerce.date(),
    college: z.string(),
    academicYear: z.string(),
    motivationLetter: z.string(),
    status: z.string()
})

export const volunteersSchema = z.array(volunteerSectionSchema);

export type Volunteer = z.infer<typeof volunteerSectionSchema>;
export type Volunteers = z.infer<typeof volunteersSchema>;


export const volunteerSchema = z.object({
  userId: z.number(),
  studentNumber: z.string(),
  fullName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  academicYear: z.number().nullable().optional(),
  photo: z.string().nullable().optional(),
  applicationId: z.number(),
  applicationStatus: z.string(),
});

export const paginatedVolunteersSchema = z.object({
  content: z.array(volunteerSchema),
  totalElements: z.number(),
});