/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import Search from './Search';
import { categoryListState } from '../recoil/atoms';
import { fetchCategories } from '../utils/api';
import {
  nav,
  leftwrap,
  rightwrap,
  btnwrap,
  category,
  listStyle,
  popupStyle,
} from '../styles/navStyles';
import Logo from './Logo';
import { HamburgerButton, UserButton, CartButton } from './NavButtons';

const isLoggedIn = () => {
  if (typeof window !== 'undefined') return !!localStorage.getItem('token');
};

export default function Nav(): React.ReactElement {
  const [hoverMessage, setHoverMessage] = useState<string>('');
  const router = useRouter();
  const setCategoryList = useSetRecoilState(categoryListState);
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (data) {
      setCategoryList(data);
    }
  }, [data, setCategoryList]);

  const handleMouseEnter = () =>
    setHoverMessage(isLoggedIn() ? '로그아웃' : '로그인');

  const handleMouseLeave = () => setHoverMessage('');

  const handleUser = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn()) {
      const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
      if (confirmLogout) {
        localStorage.removeItem('token');
        router.push('/');
      }
    }
  };

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      const confirmLogin = window.confirm('로그인 하시겠습니까?');
      if (confirmLogin) {
        router.push('/login');
      }
    }
  };

  return (
    <nav css={nav}>
      <div css={leftwrap}>
        <div css={category}>
          <HamburgerButton />
          <div css={listStyle} className="list">
            {data?.map((category: string) => (
              <Link key={category} href={`/${category}`}>
                {category + '\n'}
              </Link>
            ))}
          </div>
        </div>
        <Logo />
      </div>
      <div css={rightwrap}>
        <Search />
        <div css={btnwrap}>
          <Link
            href="/login"
            onClick={handleUser}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <UserButton />
          </Link>
          {hoverMessage && <div css={popupStyle}>{hoverMessage}</div>}
        </div>
        <Link css={btnwrap} href="/cart" onClick={handleCart}>
          <CartButton />
        </Link>
      </div>
    </nav>
  );
}
