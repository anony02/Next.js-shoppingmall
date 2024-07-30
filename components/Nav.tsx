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
  buttonStyle,
  selectedCategoryStyle,
} from '../styles/navStyles';
import Logo from './Logo';
import { HamburgerIcon, UserIcon, CartIcon } from './NavIcons';
import Modal from './Modal';
import { useModal } from '../utils/useModal';

const isLoggedIn = () =>
  typeof window !== 'undefined' && !!localStorage.getItem('token');

export default function Nav(): React.ReactElement {
  const [hoverMessage, setHoverMessage] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const setCategoryList = useSetRecoilState(categoryListState);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (data) setCategoryList(data);
  }, [data, setCategoryList]);

  const {
    modal,
    showModal,
    modalMessage,
    handleConfirm,
    handleCancel,
    modalMode,
  } = useModal();

  const handleMouseEnter = () =>
    setHoverMessage(isLoggedIn() ? '로그아웃' : '로그인');
  const handleMouseLeave = () => setHoverMessage('');

  const handleUser = () =>
    isLoggedIn()
      ? modal(
          '로그아웃 하시겠습니까?',
          () => {
            localStorage.removeItem('token');
            localStorage.removeItem('cart');
            router.push('/');
          },
          'confirm'
        )
      : router.push('/login');

  const handleCart = () =>
    isLoggedIn()
      ? router.push('/cart')
      : modal(
          '로그인 하시겠습니까?',
          () => {
            router.push('/login');
          },
          'confirm'
        );

  const handleMenuToggle = () => setMenuOpen((prevState) => !prevState);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      router.push('/');
    } else {
      setSelectedCategory(category);
      router.push(`/${category}`);
    }
  };

  return (
    <nav css={nav}>
      <div css={leftwrap}>
        <div css={category}>
          <button css={buttonStyle} onClick={handleMenuToggle}>
            <HamburgerIcon />
          </button>
          <div css={listStyle} className={menuOpen ? 'open' : ''}>
            {data?.map((category: string) => (
              <Link
                css={
                  selectedCategory === category
                    ? selectedCategoryStyle
                    : undefined
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(category);
                }}
                key={category}
                href={`/${category}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
        <Logo />
      </div>
      <div css={rightwrap}>
        <Search />
        <div css={btnwrap}>
          <button
            css={buttonStyle}
            onClick={handleUser}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <UserIcon />
          </button>
          {hoverMessage && <div css={popupStyle}>{hoverMessage}</div>}
        </div>
        <button css={buttonStyle} onClick={handleCart}>
          <CartIcon />
        </button>
      </div>
      <Modal
        message={modalMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showModal}
        mode={modalMode}
      />
    </nav>
  );
}
