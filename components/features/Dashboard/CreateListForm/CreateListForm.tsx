import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { Input } from '@/components/ui/Input/Input';
import { listSchema, type ListFormData } from '@/lib/validation/listSchema';
import { useAppDispatch } from '@/store/hooks';
import { addList } from '@/store/slices/listsSlice';
import { notify } from '@/utils/toast';

import styles from './CreateListForm.module.scss';

interface CreateListFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateListForm = ({ isOpen, onClose }: CreateListFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ListFormData>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: ListFormData) => {
    dispatch(addList(data));
    notify.success(`Список ${data.title} успешно создан`);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          className={styles.input}
          type="text"
          label="Название списка:"
          placeholder="Введите название"
          {...register('title')}
          error={errors.title?.message}
        />
        <div className={styles.controllers}>
          <Button type="submit" onClick={() => {}} disabled={!isValid}>
            Создать
          </Button>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </div>
      </form>
    </Modal>
  );
};
