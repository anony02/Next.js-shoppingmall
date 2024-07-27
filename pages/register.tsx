/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formStyle, inputStyle, buttonStyle } from '../styles/registerStyles';
import { checkUserExists, registerUser } from '../utils/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { data: existingUsers, refetch } = useQuery({
    queryKey: ['checkUserExists', username],
    queryFn: () => checkUserExists(username),
    enabled: false,
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert('회원가입이 완료되었습니다.');
      console.log(data);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || '회원가입에 실패했습니다.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    await refetch();

    if (existingUsers && existingUsers.length > 0) {
      alert('이미 가입한 회원입니다.');
      return;
    }

    mutation.mutate({ username, password });
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <input
        css={inputStyle}
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        css={inputStyle}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        css={inputStyle}
        type="password"
        placeholder="비밀번호확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button css={buttonStyle} type="submit">
        회원가입하기
      </button>
    </form>
  );
};

export default Register;
