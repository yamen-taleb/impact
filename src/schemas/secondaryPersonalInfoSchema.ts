import {z} from "zod";

export const secondaryPersonalInfoSchema = z.object({
    governorate: z.string()
        .min(1, "يجب اختيار محافظة"),
    address: z.string()
        .min(5, "يجب أن يكون العنوان على الأقل 5 أحرف")
        .max(200, "يجب أن يكون العنوان أقل من 200 حرف"),
    birthDate: z.string()
        .min(1, "تاريخ الميلاد مطلوب"),
    education: z.string()
        .min(1, "المستوى التعليمي مطلوب"),
    description: z.string()
        .min(10, "يجب أن يكون الوصف على الأقل 10 أحرف")
        .max(500, "يجب أن يكون الوصف أقل من 500 حرف")
        .optional(),
});
