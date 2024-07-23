/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import axios from 'axios';
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

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  discountPercentage: number;
  price: number;
  rating: number;
  stock: number;
}

interface DetailProps {
  id: string;
}

export default function Detail({ id }: DetailProps): React.ReactElement {
  const [list, setList] = useState<Product | null>(null);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    async function callAPI() {
      await axios(`https://dummyjson.com/products/${id}`).then((res) => {
        setList(res.data);
      });
    }
    callAPI();
  }, [id]);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div css={detailStyle}>
      <img css={imgStyle} src={list.thumbnail} alt="" />
      <div css={infoStyle}>
        <div css={titleStyle}>{list.title}</div>
        <div>{list.description}</div>
        <div>평점 : {list.rating}/5점</div>
        <div>
          {Math.round(list.discountPercentage) !== 0 && (
            <span css={discountStyle}>
              {Math.round(list.discountPercentage)}%
            </span>
          )}
          <span css={priceStyle}>
            {Math.round(list.price * 1350).toLocaleString('ko-KR')}원
          </span>
        </div>
        <div>
          <span>(남은수량 : {list.stock})</span>
          <span css={soldoutStyle}>{list.stock < 10 ? '(매진임박)' : ''}</span>
        </div>
        <div css={selectStyle}>
          <div css={selectboxStyle}>
            <button
              onClick={() => setCount(count === 0 ? list.stock : (x) => x - 1)}
            >
              -
            </button>
            <input
              value={count}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (isNaN(value)) {
                  alert('숫자를 입력해주세요');
                  return;
                }
                if (value > list.stock) {
                  alert('남은 수량을 확인해주세요');
                  return;
                }
                setCount(value);
              }}
            ></input>
            <button
              onClick={() => setCount(count === list.stock ? 0 : (x) => x + 1)}
            >
              +
            </button>
          </div>
          <div>
            {Math.round(count * list.price * 1350).toLocaleString('ko-KR')}원
          </div>
        </div>
        <button
          onClick={() => {
            const cart = localStorage.getItem('cart');
            let obj;
            if (cart === null) {
              obj = { [list.id]: count };
            } else {
              obj = JSON.parse(cart);
              obj[list.id] = count;
            }
            localStorage.setItem('cart', JSON.stringify(obj));
            alert('장바구니에 상품이 추가되었습니다.');
          }}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
