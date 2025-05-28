import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/store/hooks';
import { addTask, updateTask } from '@/store/slices/listsSlice';
import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input/Input';
import { Select } from '@/components/ui/Select/Select';
import { Button } from '@/components/ui/Button/Button';
import {
  taskSchema,
  transformTaskToFormValues,
  type TaskFormData,
} from '@/lib/validation/taskSchema';
import { statusOptions } from '@/lib/data/statusOptions';
import type { Task } from '@/types';

import styles from './TaskForm.module.scss';

export type Mode = 'view' | 'edit' | 'create';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: Mode;
  task: Task | null;
  listId: string;
}

export const TaskForm = ({ listId, task, isOpen, onClose, mode }: TaskFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: transformTaskToFormValues(task),
  });

  useEffect(() => {
    if (isOpen) {
      reset(transformTaskToFormValues(task));
    }
  }, [task, isOpen, reset]);

  const handleCloseModal = () => {
    onClose();
  };

  const onSubmit = (data: TaskFormData) => {
    const preparedTask = {
      ...(task ?? {
        createdAt: new Date().toISOString(),
      }),
      ...data,
      durationMinutes: parseInt(data.durationMinutes, 10),
      startedAt: data.status === 'in_progress' ? new Date().toISOString() : task?.startedAt,
    };

    if (mode === 'edit' && task) {
      dispatch(updateTask({ listId, task: { id: task.id, ...preparedTask } }));
    } else {
      dispatch(addTask({ listId, task: preparedTask }));
    }

    handleCloseModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          className={styles.title}
          type="text"
          label="Название:"
          placeholder="Введите название"
          disabled={mode === 'view'}
          {...register('title')}
          error={errors.title?.message}
        />

        <Input
          className={styles.description}
          type="text"
          label="Описание:"
          placeholder="Введите описание"
          disabled={mode === 'view'}
          {...register('description')}
          error={errors.description?.message}
        />

        <Input
          className={styles.timer}
          type="number"
          label="Время выполнения (в минутах):"
          placeholder="Введите время"
          disabled={mode === 'view'}
          {...register('durationMinutes')}
          error={errors.durationMinutes?.message}
        />

        <Controller
          control={control}
          name="status"
          rules={{ required: 'Выберите статус' }}
          render={({ field }) => (
            <Select
              label="Статус:"
              options={statusOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message}
              disabled={mode === 'view'}
            />
          )}
        />

        <div className={styles.actions}>
          {mode !== 'view' && (
            <Button type="submit" variant="primary" disabled={!isValid}>
              {mode === 'edit' ? 'Сохранить' : 'Добавить'}
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};
