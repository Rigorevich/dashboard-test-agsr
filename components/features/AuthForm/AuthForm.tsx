'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { authSchema, type AuthFormData } from '@/lib/validation/authSchema';
import { notify } from '@/utils/toast';

import styles from './AuthForm.module.scss';

export const AuthForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (userData: AuthFormData) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const { message } = await response.json();

    if (response.ok) {
      router.push('/dashboard');
      notify.success(message);
    } else {
      notify.error(message);
    }
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Авторизация</h1>
        <Input
          className={styles.input}
          type="email"
          label="Электронная почта"
          placeholder="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          className={styles.input}
          type="password"
          label="Пароль"
          placeholder="Пароль"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button className={styles.button} type="submit" size="large" disabled={!isValid}>
          Войти
        </Button>
      </form>
    </main>
  );
};
