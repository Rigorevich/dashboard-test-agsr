'use client';

import classNames from 'classnames';
import { Pencil, Trash2, CheckCircle2 } from 'lucide-react';

import { useAppDispatch } from '@/store/hooks';
import { deleteTask, toggleTaskStatus } from '@/store/slices/listsSlice';
import type { Task as TaskType } from '@/types';
import { Button } from '@/components/ui/Button/Button';
import { TaskTimer } from '@/components/ui/TaskTimer/TaskTimer';

import styles from './Task.module.scss';

interface TaskProps {
  task: TaskType;
  listId: string;
  onClick: () => void;
  onEdit: () => void;
}

export const Task = ({ task, listId, onClick, onEdit }: TaskProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask({ listId, taskId: task.id }));
  };

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleTaskStatus({ listId, taskId: task.id }));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div className={styles.task} onClick={onClick}>
      <div className={styles.content}>
        <h3 className={classNames(styles.title, { [styles.done]: task.status === 'done' })}>
          {task.title}
        </h3>
        {task.description && <p className={styles.description}>{task.description}</p>}
        <TaskTimer
          taskId={task.id}
          listId={listId}
          status={task.status}
          startedAt={task.startedAt}
          completedAt={task.completedAt}
          durationMinutes={task.durationMinutes}
        />
      </div>

      <div className={styles.actions}>
        <Button size="small" variant="secondary" onClick={handleToggleStatus}>
          <CheckCircle2 size={16} className={task.status === 'done' ? styles.done : ''} />
        </Button>
        <Button size="small" variant="secondary" onClick={handleEdit}>
          <Pencil size={16} />
        </Button>
        <Button size="small" variant="secondary" onClick={handleDelete}>
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};
