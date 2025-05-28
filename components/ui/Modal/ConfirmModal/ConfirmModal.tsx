import { Button } from '../../Button/Button';
import { Modal } from '../Modal';
import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className={styles.confirm}>{message}</p>
      <div className={styles.actions}>
        <Button variant="secondary" size="large" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="primary" size="large" onClick={onConfirm}>
          Удалить
        </Button>
      </div>
    </Modal>
  );
};
