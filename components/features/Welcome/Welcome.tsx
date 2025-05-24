'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button/Button';

import styles from './Welcome.module.scss';

export const Welcome = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/auth');
  };

  return (
    <main className={styles.hero}>
      <h1 className={styles.hero__title}>Добро пожаловать в Task Manager</h1>
      <p className={styles.hero__description}>
        Управляйте своими задачами просто и эффективно. Начните прямо сейчас!
      </p>
      <Button variant="secondary" size="large" onClick={handleButtonClick}>
        Войти
      </Button>
    </main>
  );
};
