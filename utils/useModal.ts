import { useState, useCallback } from 'react';

export function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalConfirm, setModalConfirm] = useState<() => void>(() => () => {});

  const modal = useCallback(
    (message: string, onConfirm: () => void = () => {}) => {
      setModalMessage(message);
      setModalConfirm(() => onConfirm);
      setShowModal(true);
    },
    []
  );

  const handleConfirm = () => {
    modalConfirm();
    setShowModal(false);
  };

  const handleCancel = () => setShowModal(false);

  return {
    modal,
    showModal,
    modalMessage,
    handleConfirm,
    handleCancel,
  };
}
