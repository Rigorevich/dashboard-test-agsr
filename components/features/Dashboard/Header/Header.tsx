import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/Button/Button';
import { notify } from '@/utils/toast';

import styles from './Header.module.scss';

export const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    const { message } = await response.json();

    if (response.ok) {
      router.push('/');
      notify.success(message);
    } else {
      notify.error(message);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Мои списки задач</h1>
      <Button onClick={handleLogout} className={styles.logout}>
        <LogOut size={18} /> Выйти
      </Button>
    </header>
  );
};
