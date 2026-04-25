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