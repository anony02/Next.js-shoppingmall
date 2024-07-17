import { useRouter } from 'next/router';
import styles from './Kakao.module.css';
import { useEffect, useState } from 'react';

export default function Kakao(): React.ReactElement {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get(
      'code',
    );
    const getToken = async () => {
      const res = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );
      return res.json();
    };
    try {
      getToken().then((res) => {
        console.log(res.access_token);
      });
      setSuccess(true);
      router.push('/');
    } catch (error) {
      console.log(error);
      setSuccess(false);
      alert('로그인에 실패했습니다.');
    }
  }, []);

  return <div className={styles.kakao}>...</div>;
}
