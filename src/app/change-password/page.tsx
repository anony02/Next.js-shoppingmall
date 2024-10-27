/** @jsxImportSource @emotion/react */
'use client';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { validatePassword } from '../../utils/validators';
import { changePassword } from '../../utils/api';
import InputField from '../../components/InputField';
import { formStyle, inputWrapperStyle, buttonStyle } from '../../styles/registerStyles';
import { buttonContainerStyle } from '../../styles/findUsernameStyles';
import { titleStyle } from '../../styles/mypageStyles';

const userid = typeof window !== 'undefined' && localStorage.getItem('token');

export default function FindUsername(): React.ReactElement {
  const [pw, setPw] = useState<string>('');
  const [pwError, setPwError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (newPassword: string) => changePassword(userid as string, newPassword),
    onSuccess: () => setMessage('비밀번호가 성공적으로 변경되었습니다.'),
    onError: (err) => setMessage(err.message || '비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'),
  });

  useEffect(() => {
    setPwError(validatePassword(pw));
    setMessage('');
  }, [pw]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(pw);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <h2 css={titleStyle}>비밀번호 변경</h2>
      <InputField label="비밀번호" type="password" value={pw} onChange={(e) => setPw(e.target.value)} error={pwError} />
      <div css={inputWrapperStyle}>{message && <p>{message}</p>}</div>
      <div css={buttonContainerStyle}>
        <button css={buttonStyle} type="submit" disabled={!pw || !!pwError}>
          변경하기
        </button>
        <button css={buttonStyle} onClick={() => router.push('/mypage')}>
          뒤로가기
        </button>
      </div>
    </form>
  );
}
