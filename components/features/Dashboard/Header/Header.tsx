import { LogOut } from 'lucide-react';

import styles from './Header.module.scss';

export const Header = () => {
  const handleLogout = () => {};

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Мои списки задач</h1>
      <button onClick={handleLogout} className={styles.logout}>
        <LogOut size={18} /> Выйти
      </button>
    </header>
  );
};
