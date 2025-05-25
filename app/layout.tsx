import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';

import type { Metadata } from 'next';

import './globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Простое и удобное приложение для управления задачами.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={classNames(geistSans.variable, geistMono.variable)}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
