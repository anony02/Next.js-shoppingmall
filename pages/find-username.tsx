/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  formStyle,
  inputWrapperStyle,
  buttonStyle,
  LogoStyle,
} from '../styles/registerStyles';
import { buttonContainerStyle } from '../styles/findUsernameStyles';
import { validateEmail } from '../utils/validators';
import { checkEmailExists } from '../utils/api';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import { User } from '../types';

export default function FindUsername(): React.ReactElement {
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
    if (data) {
      if (data.length > 0) {
        setMessage(data[0].username);
        setUserFound(true);
      } else {
        setMessage('일치하는 회원정보가 없습니다');
        setUserFound(false);
      }
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
            <p>
              {userFound ? (
                <>
                  회원님의 아이디는
                  <strong css={{ fontWeight: 'bold', color: 'blue' }}>
                    {` ${message} `}
                  </strong>
                  입니다.
                </>
              ) : (
                message
              )}
            </p>
          )
        )}
        {error && <p>{error.message}</p>}
      </div>
      <div css={buttonContainerStyle}>
        <button
          css={buttonStyle}
          type="submit"
          disabled={!email || !!emailError}
        >
          아이디 찾기
        </button>
        <button css={buttonStyle} onClick={() => router.push('/login')}>
          로그인 하기
        </button>
      </div>
    </form>
  );
}
