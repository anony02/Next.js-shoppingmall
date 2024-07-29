/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import Cartitem from '../components/Cartitem';
import { cartState } from '../recoil/atoms';
import { fetchProduct } from '../utils/api';
import {
  cartStyle,
  tohomeStyle,
  totalStyle,
  buyStyle,
} from '../styles/cartStyles';
import { LoadingSpinner, ErrorMessages } from '../components/FetchingScreen';

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  discountPercentage: number;
  price: number;
  stock: number;
}

export default function Cart(): React.ReactElement {
  const [cart, setCart] = useRecoilState(cartState);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const ids = Object.keys(cart).map((id) => parseInt(id));
  const productQueries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['product', id],
      queryFn: () => fetchProduct(id),
      enabled: !!id,
    })),
  });

  useEffect(() => {
    if (productQueries.every((query) => query.isSuccess)) {
      const products = productQueries.reduce((acc, query) => {
        if (query.data) {
          acc[query.data.id] = query.data;
        }
        return acc;
      }, {} as Record<number, Product>);

      const total = Object.entries(cart).reduce((sum, [id, count]) => {
        const product = products[parseInt(id)];
        return sum + product.price * 1350 * count;
      }, 0);

      setTotalPrice(Math.round(total));
    }
  }, [productQueries, cart]);

  const deleteItem = (id: number) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const changecnt = (id: number, count: number) => {
    const newCart = { ...cart, [id]: count };
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  if (productQueries.some((query) => query.isLoading))
    return <LoadingSpinner />;
  if (productQueries.some((query) => query.isError)) return <ErrorMessages />;

  return (
    <div css={cartStyle}>
      {Object.entries(cart).length === 0 ? (
        <>
          장바구니에 상품이 없습니다.
          <Link css={tohomeStyle} href="/">
            쇼핑하러가기
          </Link>
        </>
      ) : (
        <>
          {Object.entries(cart).map(([id, count]) => (
            <Cartitem
              key={id}
              id={Number(id)}
              quantity={count}
              product={
                productQueries.find((query) => query.data?.id === Number(id))
                  ?.data!
              }
              changecnt={changecnt}
              deleteItem={deleteItem}
            />
          ))}
          <div css={totalStyle}>
            총 결제 금액: {totalPrice.toLocaleString('ko-KR')}원
          </div>
          <button
            css={buyStyle}
            onClick={() => alert('결제화면으로 이동합니다.')}
          >
            결제하기
          </button>
        </>
      )}
    </div>
  );
}
