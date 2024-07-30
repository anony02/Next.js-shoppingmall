/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  cartitem,
  img,
  info,
  title,
  discount,
  price,
  soldout,
  btnwrap,
  deleteStyle,
} from '../styles/cartitemStyles';
import QuantitySelector from './QuantitySelector';

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
    if (e.target.value === '') {
      setCount(0);
      changecnt(id, 0);
      return;
    }
    const value = parseInt(e.target.value);
    if (isNaN(value) || value > product.stock) return;
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
            <QuantitySelector
              count={count}
              minus={minus}
              plus={plus}
              handleChange={handleChange}
              totalCost={Math.round(product.price * count * 1350)}
            />
          </div>
        </>
      ) : (
        <div>제품 정보를 가져오는 중입니다.</div>
      )}
    </div>
  );
}
