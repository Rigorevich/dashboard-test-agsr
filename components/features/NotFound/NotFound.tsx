'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button/Button';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <main className={styles.hero}>
      <h1 className={styles.hero__title}>404</h1>
      <p className={styles.hero__message}>Упс! Такой страницы не существует.</p>
      <Button variant="secondary" size="large" onClick={handleButtonClick}>
        На главную
      </Button>
    </main>
  );
};
