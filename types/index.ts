export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  durationMinutes: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Dashboard {
  lists: List[];
}
