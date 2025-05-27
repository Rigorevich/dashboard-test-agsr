'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { useAppSelector } from '@/store/hooks';

import { Header } from './Header/Header';
import { List } from './List/List';
import { CreateListForm } from './CreateListForm/CreateListForm';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { lists } = useAppSelector(state => state.lists);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.lists}>
        {lists.map(list => (
          <List key={list.id} list={list} />
        ))}

        <button onClick={handleAdd} className={styles.addButton}>
          <Plus size={20} /> Новый список
        </button>
      </div>

      <CreateListForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};
