/** @jsxImportSource @emotion/react */
'use client';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { cartState } from '../recoil/atoms';
import { fetchProduct } from '../utils/api';
import { useModal } from '../utils/useModal';
import {
  detailStyle,
  imgStyle,
  infoStyle,
  titleStyle,
  descStyle,
  discountStyle,
  priceStyle,
  soldoutStyle,
  buttonContainerStyle,
} from '../styles/detailStyles';
import { buttonStyle } from '../styles/loginStyles';
import { LoadingSpinner, ErrorMessages } from './FetchingScreen';
import QuantitySelector from './QuantitySelector';
import Modal from './Modal';

const isLoggedIn = () => typeof window !== 'undefined' && !!localStorage.getItem('token');

export default function Detail({ id }: { id: number }): React.ReactElement {
  const [count, setCount] = useState<number>(0);
  const [cart, setCart] = useRecoilState(cartState);

  const router = useRouter();

  const { modal, showModal, modalMessage, handleConfirm, handleCancel, modalMode } = useModal();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessages />;
  if (!product) return <div css={detailStyle}>상품 정보가 없습니다.</div>;

  const handleAddToCart = () => {
    if (!count) return;
    if (!isLoggedIn()) {
      modal('로그인 하시겠습니까?', () => router.push('/login'), 'confirm');
    } else {
      const updatedCart = { ...cart, [product.id]: count };
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      modal('장바구니에 상품이 추가되었습니다.');
    }
  };

  const minus = () => setCount((prevCount) => (prevCount === 0 ? 0 : prevCount - 1));
  const plus = () => setCount((prevCount) => (prevCount === product.stock ? product.stock : prevCount + 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setCount(0);
      return;
    }
    const value = parseInt(e.target.value);
    if (isNaN(value) || value > product.stock) return;
    setCount(value);
  };

  return (
    <div css={detailStyle}>
      <img css={imgStyle} src={product.thumbnail} alt={product.title} />
      <div css={infoStyle}>
        <div css={titleStyle}>{product.title}</div>
        <div css={descStyle}>
          <div>{product.description}</div>
          <div>평점 : {product.rating}/5점</div>
          <div>
            {Math.round(product.discountPercentage) !== 0 && (
              <span css={discountStyle}>{Math.round(product.discountPercentage)}%</span>
            )}
            <span css={priceStyle}>{Math.round(product.price * 1350).toLocaleString('ko-KR')}원</span>
          </div>
          <div>
            <span>(남은수량 : {product.stock})</span>
            <span css={soldoutStyle}>{product.stock < 10 ? '(매진임박)' : ''}</span>
          </div>
          <QuantitySelector
            count={count}
            minus={minus}
            plus={plus}
            handleChange={handleChange}
            totalCost={Math.round(product.price * count * 1350)}
          />
        </div>
        <div css={buttonContainerStyle}>
          <button css={buttonStyle} onClick={handleAddToCart}>
            장바구니 담기
          </button>
        </div>
      </div>
      <Modal
        message={modalMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showModal}
        mode={modalMode}
      />
    </div>
  );
}
