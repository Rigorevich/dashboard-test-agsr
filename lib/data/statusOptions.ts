import { TaskStatus } from '@/types';

interface StatusOption {
  value: TaskStatus;
  label: string;
}

export const statusOptions: StatusOption[] = [
  { value: 'todo', label: '📝 В планах' },
  { value: 'in_progress', label: '🚧 В работе' },
  { value: 'done', label: '✅ Завершено' },
];
