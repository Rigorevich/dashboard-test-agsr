import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

import { useAppDispatch } from '@/store/hooks';
import { toggleTaskStatus } from '@/store/slices/listsSlice';
import { formatTimeLeft } from '@/utils/timer';

import styles from './TaskTimer.module.scss';

interface TaskTimerProps {
  taskId: string;
  listId: string;
  status: 'todo' | 'in_progress' | 'done';
  startedAt?: string;
  completedAt?: string;
  durationMinutes: number;
}

export const TaskTimer = ({
  taskId,
  listId,
  status,
  startedAt,
  durationMinutes,
}: TaskTimerProps) => {
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (status !== 'in_progress' || !startedAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const started = new Date(startedAt).getTime();
      const duration = durationMinutes * 60 * 1000;
      const endTime = started + duration;
      const remaining = Math.max(0, endTime - now);

      if (remaining === 0 && status === 'in_progress') {
        dispatch(toggleTaskStatus({ listId, taskId }));
        return;
      }

      setTimeLeft(formatTimeLeft(Math.ceil(remaining / 1000)));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [status, startedAt, durationMinutes, taskId, listId, dispatch]);

  if (status === 'todo') return null;

  if (status === 'done') {
    return (
      <div className={styles.timer}>
        <Clock size={14} />
        <span>Завершено</span>
      </div>
    );
  }

  return (
    <div className={styles.timer}>
      <Clock size={14} />
      <span>Осталось: {timeLeft}</span>
    </div>
  );
};
