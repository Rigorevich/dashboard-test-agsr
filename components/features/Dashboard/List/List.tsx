import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import type { List as ListType } from '@/types';
import { ConfirmModal } from '@/components/ui/Modal/ConfirmModal/ConfirmModal';
import { Button } from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { editList, deleteList } from '@/store/slices/listsSlice';
import { notify } from '@/utils/toast';

import { EditableTitle } from './EditableHeader/EditableHeader';
import { Task } from '../Task/Task';
import { TaskForm, type Mode } from '../../TaskForm/TaskForm';
import styles from './List.module.scss';

interface ListProps {
  list: ListType;
}

export const List = ({ list }: ListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('view');

  const dispatch = useAppDispatch();

  const handleDeleteList = () => {
    dispatch(deleteList(list.id));

    notify.success(`Список ${list.title} успешно удален!`);

    setIsConfirmModalOpen(false);
  };

  const handleSaveTitle = (newTitle: string) => {
    dispatch(editList({ ...list, title: newTitle }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.section}>
          <EditableTitle
            title={list.title}
            tasksCount={list.tasks.length}
            handleSaveTitle={handleSaveTitle}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
        {!isEditing && (
          <div className={styles.actions}>
            <Button size="small" variant="secondary" onClick={() => setIsEditing(true)}>
              <Pencil size={16} />
            </Button>
            <Button size="small" variant="secondary" onClick={() => setIsConfirmModalOpen(true)}>
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>

      <div className={styles.tasks}>
        {list.tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onClick={() => {
              setMode('view');
              setIsFormOpen(true);
            }}
          />
        ))}

        <Button
          className={styles.newTask}
          onClick={() => {
            setMode('create');
            setIsFormOpen(true);
          }}
        >
          Добавить задачу
        </Button>
      </div>

      <ConfirmModal
        message={`Вы уверены что хотите удалить список ${list.title}?`}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteList}
      />

      <TaskForm mode={mode} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};
