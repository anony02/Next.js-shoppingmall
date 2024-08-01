/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { formStyle, buttonStyle, LogoStyle } from '../styles/registerStyles';
import {
  checkEmailExists,
  checkUsernameExists,
  registerUser,
} from '../utils/api';
import { useModal } from '../utils/useModal';
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validators';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Modal from '../components/Modal';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    modal,
    showModal,
    modalMessage,
    handleConfirm,
    handleCancel,
    modalMode,
  } = useModal();

  useEffect(() => {
    setEmailError(validateEmail(email));
    setUsernameError(validateUsername(username));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(password, confirmPassword));
  }, [email, username, password, confirmPassword]);

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      modal('회원가입이 완료되었습니다.', () => router.push('/login'));
      queryClient.invalidateQueries({
        queryKey: ['checkUsernameExists', username],
      });
    },
    onError: () => {
      modal('회원가입에 실패했습니다.');
    },
  });

  const checkUsernameExistsMutation = useMutation({
    mutationFn: checkUsernameExists,
    onSuccess: (data) => {
      if (data.length > 0) {
        modal('이미 존재하는 아이디입니다.');
      } else {
        registerUserMutation.mutate({ email, username, password });
      }
    },
    onError: () => {
      modal('회원가입 중 오류가 발생했습니다.');
    },
  });

  const checkEmailExistsMutation = useMutation({
    mutationFn: checkEmailExists,
    onSuccess: (data) => {
      if (data.length > 0) {
        modal('이미 가입된 이메일입니다.');
      } else {
        checkUsernameExistsMutation.mutate(username);
      }
    },
    onError: () => {
      modal('회원가입 중 오류가 발생했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkEmailExistsMutation.mutate(email);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <Logo customCss={LogoStyle} />
      <InputField
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <InputField
        label="아이디"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={usernameError}
      />
      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={confirmPasswordError}
      />
      <button
        css={buttonStyle}
        type="submit"
        disabled={
          !(email && username && password && confirmPassword) ||
          !!(
            emailError ||
            usernameError ||
            passwordError ||
            confirmPasswordError
          )
        }
      >
        가입하기
      </button>
      <Modal
        message={modalMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showModal}
        mode={modalMode}
      />
    </form>
  );
};

export default Register;
