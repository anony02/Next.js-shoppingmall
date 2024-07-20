/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const cartitem = css`
  background-clip: content-box;
  display: flex;
  padding: 10px;
  border-top: 2px solid rgb(220, 220, 220);
  border-bottom: 2px solid rgb(220, 220, 220);
  font-size: 12px;
  margin-bottom: 5px;
`;

const img = css`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border: 1px solid rgb(230, 230, 230);
`;

const info = css`
  width: 200px;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  & > * {
    padding: 10px 0;
    text-align: start;
  }
  & > button {
    margin-top: 10px;
  }
`;

const title = css`
  font-weight: bold;
  font-size: 14px;
`;

const discount = css`
  color: red;
  font-weight: bold;
  margin-right: 8px;
`;

const price = css`
  font-weight: bold;
  font-size: 14px;
`;

const soldout = css`
  color: red;
  font-weight: bold;
  margin-left: 5px;
`;

const btnwrap = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

const deleteStyle = css`
  line-height: 30px;
  width: 30px;
  height: 30px;
`;

const select = css`
  display: flex;
  line-height: 30px;
  align-items: end;
  & > div {
    width: 120px;
    text-align: end;
    font-weight: bold;
  }
`;

const selectbox = css`
  width: 120px;
  height: 30px;
  display: flex;
  align-content: center;
  & > button {
    border-collapse: collapse;
    line-height: 30px;
    width: 30px;
    height: 30px;
  }
  & > input {
    border: 1px solid rgb(230, 230, 230);
    padding: 0;
    width: 60px;
    height: 30px;
    text-align: center;
    font-size: 14px;
  }
`;

interface Product {
  title: string;
  thumbnail: string;
  price: number;
  stock: number;
  discountPercentage: number;
}

interface CartitemProps {
  id: number;
  quantity: number;
  product: Product;
  changecnt: (id: number, count: number) => void;
  deleteItem: (id: number) => void;
}

export default function Cartitem({
  id,
  quantity,
  product,
  changecnt,
  deleteItem,
}: CartitemProps): React.ReactElement {
  const [count, setCount] = useState(quantity);

  const minus = () => {
    if (count > 1) {
      setCount(count - 1);
      changecnt(id, count - 1);
    }
  };

  const plus = () => {
    if (count < product.stock) {
      setCount(count + 1);
      changecnt(id, count + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    changecnt(id, value);
  };

  return (
    <div css={cartitem}>
      {product ? (
        <>
          <img css={img} src={product.thumbnail} alt="" />
          <div css={info}>
            <div css={title}>{product.title}</div>
            <div>
              {Math.round(product.discountPercentage) !== 0 && (
                <span css={discount}>
                  {Math.round(product.discountPercentage)}%
                </span>
              )}
              <span css={price}>
                {Math.round(product.price * 1350).toLocaleString('ko-KR')}원
              </span>
            </div>
            <div>
              <span>(남은수량 : {product.stock})</span>
              <span css={soldout}>
                {product.stock < 10 ? '(매진임박)' : ''}
              </span>
            </div>
          </div>
          <div css={btnwrap}>
            <button css={deleteStyle} onClick={() => deleteItem(id)}>
              X
            </button>
            <div css={select}>
              <div css={selectbox}>
                <button onClick={minus}>-</button>
                <input value={count} onChange={handleChange} />
                <button onClick={plus}>+</button>
              </div>
              <div>
                {Math.round(product.price * count * 1350).toLocaleString(
                  'ko-KR'
                )}
                원
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>제품 정보를 가져오는 중입니다...</div>
      )}
    </div>
  );
}
