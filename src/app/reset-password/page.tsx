/** @jsxImportSource @emotion/react */
'use client';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { formStyle, inputWrapperStyle, buttonStyle, LogoStyle } from '../../styles/registerStyles';
import { buttonContainerStyle } from '../../styles/findUsernameStyles';
import { validateEmail } from '../../utils/validators';
import { checkEmailExists, updatePassword } from '../../utils/api';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import { User } from '../../types';

export default function FindPassword(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);
  const [userFound, setUserFound] = useState<boolean | null>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, error, isLoading } = useQuery<User[], Error>({
    queryKey: ['user', email],
    queryFn: () => checkEmailExists(email),
    enabled,
  });

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      setMessage('임시 비밀번호가 이메일로 발송되었습니다.');
      setEnabled(false);
    },
    onError: () => {
      setMessage('비밀번호 업데이트 중 오류가 발생했습니다.');
      setEnabled(false);
    },
  });

  useEffect(() => {
    setEmailError(validateEmail(email));
    setMessage('');
    setUserFound(null);
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnabled(true);
  };

  useEffect(() => {
    if (!data) return;
    if (data.length > 0) {
      mutation.mutate(data[0]);
      setUserFound(true);
    } else {
      setMessage('일치하는 회원정보가 없습니다');
      setUserFound(false);
      setEnabled(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setMessage('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setEnabled(false);
      setUserFound(null);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['user', email] });
    };
  }, [email, queryClient]);

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
      <div css={inputWrapperStyle}>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          userFound !== null && (
            <p>{userFound ? <span>임시 비밀번호가 이메일로 발송되었습니다.</span> : <span>{message}</span>}</p>
          )
        )}
        {error && <p>{message}</p>}
      </div>
      <div css={buttonContainerStyle}>
        <button css={buttonStyle} type="submit" disabled={!email || !!emailError}>
          임시 비밀번호 받기
        </button>
        <button css={buttonStyle} onClick={() => router.push('/login')}>
          로그인 하기
        </button>
      </div>
    </form>
  );
}
