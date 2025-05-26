'use client';

import { Plus } from 'lucide-react';

import { useAppSelector } from '@/store/hooks';

import { Header } from './Header/Header';
import { List } from './List/List';
import styles from './Dashboard.module.scss';

export const Dashboard = () => {
  const { lists } = useAppSelector(state => state.lists);

  const handleAdd = () => {};

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
    </main>
  );
};
