import type { Task as TaskType } from '@/types';
import { Button } from '@/components/ui/Button/Button';

import styles from './Task.module.scss';

interface TaskProps {
  task: TaskType;
}

export const Task = ({ task }: TaskProps) => {
  return (
    <Button className={styles.task}>
      <h4 className={styles.title}>{task.title}</h4>
      <p className={styles.description}>{task.description}</p>
    </Button>
  );
};
