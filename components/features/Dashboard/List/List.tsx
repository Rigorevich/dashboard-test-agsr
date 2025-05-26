import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import type { List as ListType } from '@/types';
import { Button } from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { editList } from '@/store/slices/listsSlice';

import { EditableTitle } from './EditableHeader/EditableHeader';
import { Task } from '../Task/Task';
import styles from './List.module.scss';

interface ListProps {
  list: ListType;
}

export const List = ({ list }: ListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

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
            <Button size="small" variant="secondary">
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>

      <div className={styles.tasks}>
        {list.tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
