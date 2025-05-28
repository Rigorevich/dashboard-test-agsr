'use client';

import classNames from 'classnames';
import { Pencil, Trash2, CheckCircle2 } from 'lucide-react';

import { useAppDispatch } from '@/store/hooks';
import { deleteTask, toggleTaskStatus } from '@/store/slices/listsSlice';
import type { Task as TaskType } from '@/types';
import { Button } from '@/components/ui/Button/Button';

import styles from './Task.module.scss';

interface TaskProps {
  task: TaskType;
  listId: string;
  onClick: () => void;
  onEdit: () => void;
}

export const Task = ({ listId, task, onClick, onEdit }: TaskProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask({ listId, taskId: task.id }));
  };

  const handleStatusTask = () => {
    dispatch(toggleTaskStatus({ listId, taskId: task.id }));
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.completed]: task.status === 'done',
        [styles.inProgress]: task.status === 'in_progress',
      })}
    >
      <Button className={styles.task} onClick={onClick}>
        <div>
          <h4 className={styles.title}>{task.title}</h4>
          <p className={styles.description}>{task.description}</p>
        </div>
        <span className={styles.status}>
          {task.status === 'done'
            ? 'Завершена'
            : task.status === 'in_progress'
              ? 'В процессе'
              : 'В планах'}
        </span>
      </Button>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={handleStatusTask}
          title="Изменить статус"
        >
          <CheckCircle2 size={18} />
        </button>

        <button type="button" className={styles.iconButton} onClick={onEdit} title="Редактировать">
          <Pencil size={18} />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={handleDeleteTask}
          title="Удалить"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
