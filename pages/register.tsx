/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  formStyle,
  buttonStyle,
  inputWrapperStyle,
  LogoStyle,
} from '../styles/registerStyles';
import {
  checkEmailExists,
  checkUsernameExists,
  registerUser,
} from '../utils/api';
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validators';
import Logo from '../components/Logo';
import InputField from '../components/InputField';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const queryClient = useQueryClient();
  const router = useRouter();

  const checkEmailExistsMutation = useMutation({
    mutationFn: checkEmailExists,
    onSuccess: (exists) => {
      if (exists) {
        alert('이미 가입된 이메일입니다.');
      } else {
        checkUsernameExistsMutation.mutate(username);
      }
    },
    onError: () => {
      setEmailError('회원가입 중 오류가 발생했습니다.');
    },
  });

  const checkUsernameExistsMutation = useMutation({
    mutationFn: checkUsernameExists,
    onSuccess: (exists) => {
      if (exists) {
        alert('이미 존재하는 아이디입니다.');
      } else {
        registerUserMutation.mutate({ email, username, password });
        router.push('/login');
      }
    },
    onError: () => {
      alert('회원가입 중 오류가 발생했습니다.');
    },
  });

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert('회원가입이 완료되었습니다.');
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['checkUsernameExists', username],
      });
      router.push('/login');
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });

  useEffect(() => {
    setEmailError(validateEmail(email));
    setUsernameError(validateUsername(username));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(password, confirmPassword));
  }, [email, username, password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkEmailExistsMutation.mutate(email);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <div css={inputWrapperStyle}>
        <Logo customCss={LogoStyle} />
      </div>
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
          !(email || username || password || confirmPassword) ||
          !!(
            emailError ||
            usernameError ||
            passwordError ||
            confirmPasswordError
          )
        }
      >
        회원가입하기
      </button>
    </form>
  );
};

export default Register;
