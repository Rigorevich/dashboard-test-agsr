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
  mode: Mode;
  isOpen: boolean;
  onClose: () => void;
  listId: string;
  task: Task | null;
}

export const TaskForm = ({ mode, isOpen, onClose, listId, task }: TaskFormProps) => {
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

  const onSubmit = (data: TaskFormData) => {
    if (mode === 'edit' && task) {
      dispatch(
        updateTask({
          listId,
          task: {
            ...task,
            ...data,
          },
        }),
      );
    } else {
      dispatch(
        addTask({
          listId,
          task: data,
        }),
      );
    }

    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (task) {
      reset(transformTaskToFormValues(task));
    }
  }, [task, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="text"
          label="Название:"
          placeholder="Введите название"
          disabled={mode === 'view'}
          {...register('title')}
          error={errors.title?.message}
        />

        <Input
          type="text"
          label="Описание:"
          placeholder="Введите описание"
          disabled={mode === 'view'}
          {...register('description')}
          error={errors.description?.message}
        />

        <Input
          type="number"
          label="Длительность (в минутах):"
          placeholder="Введите время в минутах"
          disabled={mode === 'view'}
          {...register('durationMinutes', { valueAsNumber: true })}
          error={errors.durationMinutes?.message}
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Статус:"
              options={statusOptions}
              value={value}
              onChange={onChange}
              disabled={mode === 'view'}
            />
          )}
        />

        <div className={styles.controllers}>
          {mode !== 'view' && (
            <Button type="submit" disabled={!isValid}>
              {mode === 'edit' ? 'Сохранить' : 'Создать'}
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={handleClose}>
            {mode === 'view' ? 'Закрыть' : 'Отмена'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
