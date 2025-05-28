'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hydrateDashboard } from '@/store/slices/listsSlice';
import type { Dashboard as DashboardType } from '@/types';

import { Header } from './Header/Header';
import { List } from './List/List';
import { CreateListForm } from './CreateListForm/CreateListForm';
import styles from './Dashboard.module.scss';

interface DashboardProps {
  initialData: DashboardType;
}

export const Dashboard = ({ initialData }: DashboardProps) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { lists } = useAppSelector(state => state.lists);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(hydrateDashboard(initialData));
  }, [dispatch, initialData]);

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
