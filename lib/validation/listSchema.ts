import { z } from 'zod';

export const listSchema = z.object({
  title: z
    .string()
    .min(1, 'Название обязательно')
    .max(50, 'Максимальная длина названия 50 символов'),
});

export type ListFormData = z.infer<typeof listSchema>;
