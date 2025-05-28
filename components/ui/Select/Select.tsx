'use client';

import classNames from 'classnames';

import styles from './Select.module.scss';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  label?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Select = ({
  options,
  label,
  disabled,
  className,
  error,
  value,
  onChange,
}: SelectProps) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        value={value}
        onChange={event => {
          onChange(event.target.value);
        }}
        disabled={disabled}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
