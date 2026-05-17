import {z} from "zod";

export const initiativeSchema = z.object({
    title: z.string()
        .min(2, "يجب أن يكون اسم المبادرة على الأقل حرفين")
        .max(100, "يجب أن يكون اسم المبادرة أقل من 100 حرف"),
    description: z.string()
        .min(10, "يجب أن تكون التفاصيل على الأقل 10 أحرف")
        .max(1000, "يجب أن تكون التفاصيل أقل من 1000 حرف"),
    location: z.string()
        .min(2, "يجب أن يكون الموقع على الأقل حرفين")
        .max(100, "يجب أن يكون الموقع أقل من 100 حرف"),
    collegeId: z.string(),
    categoryId: z.string()
});

