import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/Button/Button';

import styles from './Header.module.scss';

export const Header = () => {
  const handleLogout = () => {};

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Мои списки задач</h1>
      <Button onClick={handleLogout} className={styles.logout}>
        <LogOut size={18} /> Выйти
      </Button>
    </header>
  );
};
