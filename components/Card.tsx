/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

const card = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 350px;
  padding: 10px;
`;

const linkwrap = css`
  text-decoration: none;
  color: black;
  font-size: 10px;
  overflow: hidden;
  &:hover {
    background-color: rgba(200, 200, 200, 0.5);
  }
`;

const imgStyle = css`
  width: 230px;
  height: 230px;
  padding: 20px;
  object-fit: contain;
  transform: scale(1);
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
  }
`;

const info = css`
  width: 230px;
  height: 100px;
  padding: 10px;
`;

const titleStyle = css`
  font-weight: bold;
  font-size: 14px;
`;

const discount = css`
  color: red;
  font-weight: bold;
  font-size: 12px;
  margin-right: 4px;
`;

const priceStyle = css`
  font-weight: bold;
  font-size: 14px;
`;

const soldout = css`
  color: red;
  font-weight: bold;
  margin-left: 5px;
`;

interface CardProps {
  id: number;
  thumbnail: string;
  title: string;
  discountPercentage: number;
  price: number;
  rating: number;
  stock: number;
}

export default function Card({
  id,
  thumbnail,
  title,
  discountPercentage,
  price,
  rating,
  stock,
}: CardProps): React.ReactElement {
  return (
    <li css={card}>
      <Link css={linkwrap} href={`/detail/${id}`}>
        <img css={imgStyle} src={thumbnail} alt="" />
        <div css={info}>
          <div css={titleStyle}>{title}</div>
          <div>평점 : {rating}/5점</div>
          <div>
            {Math.round(discountPercentage) !== 0 && (
              <span css={discount}>{Math.round(discountPercentage)}%</span>
            )}
            <span css={priceStyle}>
              {Math.round(price * 1350).toLocaleString('ko-KR')}원
            </span>
          </div>
          <div>
            <span>남은수량 : {stock}</span>
            <span css={soldout}>{stock < 10 ? '(매진임박)' : ''}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
