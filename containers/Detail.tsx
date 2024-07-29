/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { cartState } from '../recoil/atoms';
import { fetchProduct } from '../utils/api';
import {
  detailStyle,
  imgStyle,
  infoStyle,
  titleStyle,
  discountStyle,
  priceStyle,
  soldoutStyle,
  selectStyle,
  selectboxStyle,
} from '../styles/detailStyles';
import { LoadingSpinner, ErrorMessages } from '../components/FetchingScreen';

export default function Detail({ id }: { id: number }): React.ReactElement {
  const [count, setCount] = useState<number>(0);
  const [cart, setCart] = useRecoilState(cartState);

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
  if (!product) return <div>상품 정보가 없습니다.</div>;

  const handleAddToCart = () => {
    const updatedCart = { ...cart, [product.id]: count };
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('장바구니에 상품이 추가되었습니다.');
  };

  return (
    <div css={detailStyle}>
      <img css={imgStyle} src={product.thumbnail} alt={product.title} />
      <div css={infoStyle}>
        <div css={titleStyle}>{product.title}</div>
        <div>{product.description}</div>
        <div>평점 : {product.rating}/5점</div>
        <div>
          {Math.round(product.discountPercentage) !== 0 && (
            <span css={discountStyle}>
              {Math.round(product.discountPercentage)}%
            </span>
          )}
          <span css={priceStyle}>
            {Math.round(product.price * 1350).toLocaleString('ko-KR')}원
          </span>
        </div>
        <div>
          <span>(남은수량 : {product.stock})</span>
          <span css={soldoutStyle}>
            {product.stock < 10 ? '(매진임박)' : ''}
          </span>
        </div>
        <div css={selectStyle}>
          <div css={selectboxStyle}>
            <button
              onClick={() =>
                setCount((prevCount) => (prevCount === 0 ? 0 : prevCount - 1))
              }
            >
              -
            </button>
            <input
              type="number"
              value={count}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (isNaN(value)) {
                  alert('숫자를 입력해주세요');
                  return;
                }
                if (value > product.stock) {
                  alert('남은 수량을 확인해주세요');
                  return;
                }
                setCount(value);
              }}
            />
            <button
              onClick={() =>
                setCount((prevCount) =>
                  prevCount === product.stock ? product.stock : prevCount + 1
                )
              }
            >
              +
            </button>
          </div>
          <div>
            {Math.round(count * product.price * 1350).toLocaleString('ko-KR')}원
          </div>
        </div>
        <button onClick={handleAddToCart}>장바구니 담기</button>
      </div>
    </div>
  );
}
