import { z } from 'zod';

import { Task } from '@/types';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Название обязательно')
    .max(50, 'Максимальная длина названия 50 символов'),
  description: z.string().max(100, 'Максимальная длина названия 100 символов').optional(),
  durationMinutes: z
    .string()
    .regex(/^\d+$/, 'Укажите корректное число')
    .refine(val => parseInt(val, 10) > 0, 'Минимум 1 минута'),
  status: z.enum(['todo', 'in_progress', 'done']),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const transformTaskToFormValues = (task: Task | null): TaskFormData => ({
  title: task?.title ?? '',
  description: task?.description ?? '',
  status: task?.status ?? 'todo',
  durationMinutes: task?.durationMinutes?.toString() ?? '0',
});
