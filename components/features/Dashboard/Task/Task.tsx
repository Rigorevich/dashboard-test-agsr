'use client';

import classNames from 'classnames';
import { Pencil, Trash2, CheckCircle2 } from 'lucide-react';

import type { Task as TaskType } from '@/types';
import { Button } from '@/components/ui/Button/Button';

import styles from './Task.module.scss';

interface TaskProps {
  task: TaskType;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export const Task = ({ task, onClick, onEdit, onDelete, onToggleStatus }: TaskProps) => {
  return (
    <div className={classNames(styles.taskContainer)}>
      <Button className={styles.task} onClick={onClick}>
        <div>
          <h4 className={styles.title}>{task.title}</h4>
          <p className={styles.description}>{task.description}</p>
        </div>
        <span
          className={classNames(styles.status, {
            [styles.completed]: task.status === 'done',
            [styles.inProgress]: task.status === 'in_progress',
          })}
        >
          {task.status === 'done' ? 'Завершена' : 'В процессе'}
        </span>
      </Button>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onToggleStatus}
          title="Изменить статус"
        >
          <CheckCircle2 size={18} />
        </button>

        <button type="button" className={styles.iconButton} onClick={onEdit} title="Редактировать">
          <Pencil size={18} />
        </button>

        <button type="button" className={styles.iconButton} onClick={onDelete} title="Удалить">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
