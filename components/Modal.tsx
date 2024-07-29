/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  modalOverlayStyle,
  modalStyle,
  buttonStyle,
} from '../styles/modalStyles';

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

const Modal: React.FC<ModalProps> = ({
  message,
  onConfirm,
  onCancel,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div css={modalOverlayStyle}>
      <div css={modalStyle}>
        <p>{message}</p>
        <button css={buttonStyle} onClick={onConfirm}>
          확인
        </button>
        <button css={buttonStyle} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default Modal;
