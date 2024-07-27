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
import { checkUserExists, registerUser } from '../utils/api';
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validators';
import Logo from '../components/Logo';
import InputField from '../components/InputField';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const queryClient = useQueryClient();
  const router = useRouter();

  const checkUserExistsMutation = useMutation({
    mutationFn: checkUserExists,
    onSuccess: (exists) => {
      if (exists) {
        alert('이미 가입한 회원입니다.');
      } else {
        mutation.mutate({ username, password });
        useRouter;
      }
    },
    onError: () => {
      alert('회원가입 중 오류가 발생했습니다.');
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert('회원가입이 완료되었습니다.');
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['checkUserExists', username],
      });
      router.push('/login');
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });

  useEffect(() => {
    setUsernameError(validateUsername(username));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(password, confirmPassword));
  }, [username, password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkUserExistsMutation.mutate(username);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <div css={inputWrapperStyle}>
        <Logo customCss={LogoStyle} />
      </div>
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
        disabled={!!(usernameError || passwordError || confirmPasswordError)}
      >
        회원가입하기
      </button>
    </form>
  );
};

export default Register;
