/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  formStyle,
  inputWrapperStyle,
  buttonStyle,
} from '../styles/registerStyles';
import { buttonContainerStyle } from '../styles/findUsernameStyles';
import { validateEmail } from '../utils/validators';
import { checkEmailExists, changeEmail } from '../utils/api';
import InputField from '../components/InputField';
import { User } from '../types';
import { titleStyle } from '../styles/mypageStyles';

const userid = typeof window !== 'undefined' && localStorage.getItem('token');

export default function FindUsername(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, error, isLoading } = useQuery<User[], Error>({
    queryKey: ['user', email],
    queryFn: () => checkEmailExists(email),
    enabled,
  });

  const mutation = useMutation({
    mutationFn: (newEmail: string) => changeEmail(userid as string, newEmail),
    onSuccess: () => {
      setMessage('이메일이 성공적으로 변경되었습니다.');
      setEnabled(false);
    },
    onError: () => {
      setMessage(
        '이메일 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
      setEnabled(false);
    },
  });

  useEffect(() => {
    setEmailError(validateEmail(email));
    setMessage('');
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnabled(true);
  };

  useEffect(() => {
    if (!data) return;
    if (data.length > 0) {
      setMessage('해당 이메일로 가입된 계정이 존재합니다.');
      setEnabled(false);
    } else {
      mutation.mutate(email);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setMessage('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setEnabled(false);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      setMessage('');
      queryClient.removeQueries({ queryKey: ['user', email] });
    };
  }, [email, queryClient]);

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <h2 css={titleStyle}>이메일 변경</h2>
      <InputField
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <div css={inputWrapperStyle}>
        {isLoading && <p>로딩 중...</p>}
        {message && <p>{message}</p>}
      </div>
      <div css={buttonContainerStyle}>
        <button
          css={buttonStyle}
          type="submit"
          disabled={!email || !!emailError}
        >
          변경하기
        </button>
        <button css={buttonStyle} onClick={() => router.push('/mypage')}>
          뒤로가기
        </button>
      </div>
    </form>
  );
}
