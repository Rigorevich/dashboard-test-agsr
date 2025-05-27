import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input/Input';
import { Select } from '@/components/ui/Select/Select';
import { Button } from '@/components/ui/Button/Button';
import { taskSchema, type TaskFormData } from '@/lib/validation/taskSchema';
import { statusOptions } from '@/lib/data/statusOptions';
import type { Task } from '@/types';

import styles from './TaskForm.module.scss';

export type Mode = 'view' | 'edit' | 'create';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  mode: Mode;
  task?: Task;
}

export const TaskForm = ({ isOpen, onClose, mode: _mode }: TaskFormProps) => {
  const [mode, setMode] = useState(_mode);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      durationMinutes: 30,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          {...register('description')}
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
            <Button type="submit" variant="primary">
              {mode === 'edit' ? 'Сохранить' : 'Добавить'}
            </Button>
          )}
          {mode === 'view' && (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setMode('edit');
              }}
            >
              Изменить
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};
