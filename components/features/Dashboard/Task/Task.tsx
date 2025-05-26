import type { Task as TaskType } from '@/types';

import styles from './Task.module.scss';

interface TaskProps {
  task: TaskType;
}

export const Task = ({ task }: TaskProps) => {
  return (
    <div className={styles.task}>
      <div>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
    </div>
  );
};
