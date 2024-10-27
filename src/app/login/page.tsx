/** @jsxImportSource @emotion/react */
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../utils/useLogin';
import { useModal } from '../../utils/useModal';
import Logo from '../../components/Logo';
import Modal from '../../components/Modal';
import { inputStyle, buttonStyle, linkContainerStyle, linkStyle } from '../../styles/loginStyles';
import { formStyle, LogoStyle } from '../../styles/registerStyles';

export default function Login(): React.ReactElement {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const { modal, showModal, modalMessage, handleConfirm, handleCancel, modalMode } = useModal();

  const useLogin = useMutation({
    mutationFn: loginUser,
    onSuccess: (id) => {
      localStorage.setItem('token', id);
      router.push('/');
    },
    onError: (error) => modal(error.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useLogin.mutate({ username, password });
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <Logo customCss={LogoStyle} />
      <input css={inputStyle} onChange={(e) => setUsername(e.target.value)} placeholder="아이디"></input>
      <input
        css={inputStyle}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      ></input>
      <button css={buttonStyle} type="submit">
        로그인
      </button>
      <div css={linkContainerStyle}>
        <Link css={linkStyle} href="/find-username">
          아이디 찾기
        </Link>
        <Link css={linkStyle} href="/reset-password">
          비밀번호 찾기
        </Link>
        <Link css={linkStyle} href="/register">
          회원가입하기
        </Link>
      </div>
      <Modal
        message={modalMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showModal}
        mode={modalMode}
      />
    </form>
  );
}
