/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Cartitem from '../components/Cartitem';

const cartStyle = css`
  padding: 80px 50px;
  background-clip: content-box;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
`;

const tohomeStyle = css`
  text-decoration: none;
  color: white;
  background-color: black;
  border: 2px solid rgba(200, 200, 200, 0.5);
  text-align: center;
  margin-top: 100px;
  padding: 20px;
  font-weight: bold;
  width: 200px;
`;

const totalStyle = css`
  font-weight: bold;
  width: 660px;
  text-align: end;
  padding: 10px;
`;

const buyStyle = css`
  font-weight: bold;
  color: white;
  background-color: black;
  padding: 10px;
  width: 200px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

interface Product {
  id: number;
  title: string;
  price: number;
  [key: string]: any;
  thumbnail: string;
  stock: number;
  discountPercentage: number;
}

interface CartState {
  [key: number]: number;
}

interface ProductsState {
  [key: string]: Product;
}

export default function Cart(): React.ReactElement {
  const [cart, setCart] = useState<CartState>({});
  const [products, setProducts] = useState<ProductsState>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(obj);
    const idList = Object.keys(obj);
    const getData = async () => {
      try {
        const resList = await Promise.all(
          idList.map((id) =>
            axios.get<Product>(`https://dummyjson.com/products/${id}`)
          )
        );
        const datas: ProductsState = {};
        resList.forEach((res) => {
          datas[res.data.id] = res.data;
        });
        setProducts(datas);
        changeTotal(obj, datas);
      } catch (e) {
        console.error('데이터를 불러올 수 없습니다.');
      }
    };
    getData();
  }, []);

  const deleteItem = (id: number) => {
    const copiedCart = { ...cart };
    delete copiedCart[id];
    localStorage.setItem('cart', JSON.stringify(copiedCart));
    setCart(copiedCart);
    changeTotal(copiedCart, products);
  };
  const changecnt = (id: number, count: number) => {
    const changedCart = { ...cart, [id]: count };
    localStorage.setItem('cart', JSON.stringify(changedCart));
    setCart(changedCart);
    changeTotal(changedCart, products);
  };
  const changeTotal = (cart: CartState, products: ProductsState) => {
    let total = 0;
    Object.entries(cart).forEach(([id, count]) => {
      const product = products[id];
      total += product.price * 1350 * count;
    });
    setTotalPrice(Math.round(total));
  };
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
              product={products[id]}
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
