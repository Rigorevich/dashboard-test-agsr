import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

type InputSize = 'small' | 'medium';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  label?: string;
  size?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'medium', error, className, label, ...props }, ref) => (
    <div className={classNames(styles.wrapper, className)}>
      <label className={styles.label}>
        {label && <span className={styles.content}>{label}</span>}
        <input ref={ref} className={classNames(styles.input, styles[size])} {...props} />
      </label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  ),
);

Input.displayName = 'Input';
