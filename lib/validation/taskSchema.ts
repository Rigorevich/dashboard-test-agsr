import { z } from 'zod';

import { Task } from '@/types';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Название обязательно')
    .max(100, 'Максимальная длина названия 100 символов'),
  description: z
    .string()
    .max(500, 'Максимальная длина описания 500 символов')
    .optional(),
  status: z.enum(['todo', 'in_progress', 'done']),
  durationMinutes: z
    .number()
    .min(1, 'Минимальная длительность 1 минута')
    .max(1440, 'Максимальная длительность 24 часа'),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const transformTaskToFormValues = (task: Task | null): TaskFormData => ({
  title: task?.title ?? '',
  description: task?.description ?? '',
  status: task?.status ?? 'todo',
  durationMinutes: task?.durationMinutes ?? 30,
});
