import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import type { List as ListType } from '@/types';
import { ConfirmModal } from '@/components/ui/Modal/ConfirmModal/ConfirmModal';
import { Button } from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { editList, deleteList } from '@/store/slices/listsSlice';
import { notify } from '@/utils/toast';
import { type Task as TaskType } from '@/types';

import { EditableTitle } from './EditableHeader/EditableHeader';
import { Task } from '../Task/Task';
import { TaskForm, type Mode } from '../../TaskForm/TaskForm';
import styles from './List.module.scss';

interface ListProps {
  list: ListType;
}

export const List = ({ list }: ListProps) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('view');

  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const handleSaveTitle = (newTitle: string) => {
    dispatch(editList({ ...list, title: newTitle }));
  };

  const handleOpenCreateForm = () => {
    setMode('create');
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleOpenViewForm = (task: TaskType) => {
    setMode('view');
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task: TaskType) => {
    setMode('edit');
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteList = () => {
    dispatch(deleteList(list.id));
    notify.success(`Список ${list.title} успешно удален!`);
    setIsConfirmModalOpen(false);
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
            listId={list.id}
            task={task}
            onToggleStatus={() => {}}
            onEdit={() => handleOpenEditForm(task)}
            onClick={() => handleOpenViewForm(task)}
          />
        ))}

        <Button className={styles.newTask} onClick={handleOpenCreateForm}>
          Добавить задачу
        </Button>
      </div>

      <ConfirmModal
        message={`Вы уверены что хотите удалить список ${list.title}?`}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteList}
      />

      <TaskForm
        mode={mode}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        listId={list.id}
        task={selectedTask}
      />
    </div>
  );
};
