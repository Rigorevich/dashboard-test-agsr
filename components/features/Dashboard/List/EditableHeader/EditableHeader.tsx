'use client';

import { useState, ChangeEvent, KeyboardEvent, Dispatch, SetStateAction } from 'react';
import { Save } from 'lucide-react';

import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { notify } from '@/utils/toast';

import styles from './EditableHeader.module.scss';

interface EditableTitleProps {
  title: string;
  tasksCount: number;
  handleSaveTitle: (newTitle: string) => void;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const EditableTitle = ({
  isEditing,
  setIsEditing,
  title,
  tasksCount,
  handleSaveTitle,
}: EditableTitleProps) => {
  const [value, setValue] = useState(title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > 50) {
      notify.error('Название должно быть непустым и до 50 символов.');
      setValue(title);
    } else {
      if (trimmed !== title) {
        handleSaveTitle(trimmed);
        notify.success('Название успешно изменено');
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(title);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isEditing ? (
        <>
          <Input
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
            autoFocus
            size="small"
            maxLength={50}
            minLength={1}
          />
          <Button size="small" variant="secondary" onClick={handleSave}>
            <Save size={16} />
          </Button>
        </>
      ) : (
        <>
          <div className={styles.text}>
            <h2 title={title}>{title}</h2>
            <p>{tasksCount} задач</p>
          </div>
        </>
      )}
    </div>
  );
};
