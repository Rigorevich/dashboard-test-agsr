import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  durationMinutes: z.number({ invalid_type_error: 'Укажите число' }).min(1, 'Минимум 1 минута'),
  status: z.enum(['todo', 'in_progress', 'done']),
});

export type TaskFormData = z.infer<typeof taskSchema>;