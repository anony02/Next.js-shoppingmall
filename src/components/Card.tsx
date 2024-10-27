/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import {
  card,
  linkwrap,
  imgStyle,
  info,
  titleStyle,
  discount,
  priceStyle,
  soldout,
} from '../styles/cardStyles';

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
