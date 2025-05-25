import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, label, ...props }, ref) => (
    <div className={classNames(styles.wrapper, className)}>
      <label className={styles.label}>
        {label && <span className={styles.content}>{label}</span>}
        <input ref={ref} className={styles.input} {...props} />
      </label>
      <span className={styles.error}>{error}</span>
    </div>
  ),
);

Input.displayName = 'Input';
