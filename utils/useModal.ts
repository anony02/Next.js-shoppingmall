import { useState, useCallback } from 'react';

export function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalConfirm, setModalConfirm] = useState<() => void>(() => () => {});

  const [modalMode, setModalMode] = useState<'alert' | 'confirm'>('alert');

  const modal = useCallback(
    (
      message: string,
      onConfirm: () => void = () => {},
      mode: 'alert' | 'confirm' = 'alert'
    ) => {
      setModalMessage(message);
      setModalConfirm(() => onConfirm);
      setShowModal(true);
      setModalMode(mode);
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
    modalMode,
  };
}
