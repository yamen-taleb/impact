import { z } from "zod";

export const userSchema = z.object({
    userId: z.number(),
    keycloakId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().nullable().optional(),
    birthdate: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    photo: z.string().nullable().optional(),
    collegeId: z.number().nullable().optional(),
    collegeName: z.string().nullable().optional(),
    studentNumber: z.string().nullable().optional(),
    academicYear: z.string().nullable().optional().or(z.number().nullable().optional()),
    isBanned: z.boolean().optional(),
    isbanned: z.boolean().optional(),
    createdAt: z.string(),
    updatedAt: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
}).transform((user) => ({
    ...user,
    isBanned: user.isBanned ?? user.isbanned ?? false,
}));

export type UserType = z.infer<typeof userSchema>;
