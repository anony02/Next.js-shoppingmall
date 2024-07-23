/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import Cartitem from '../components/Cartitem';
import { cartState } from '../recoil/atoms';
import { fetchProduct } from '../utils/api'; // API 호출 함수
import {
  cartStyle,
  tohomeStyle,
  totalStyle,
  buyStyle,
} from '../styles/cartStyles';

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

  // React Query를 사용하여 제품 데이터를 가져옵니다.
  const ids = Object.keys(cart).map((id) => parseInt(id));
  const productQueries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['product', id],
      queryFn: () => fetchProduct(id),
      enabled: !!id,
    })),
  });

  // 제품 데이터가 로드된 후 장바구니의 총 가격을 계산합니다.
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

  if (productQueries.some((query) => query.isLoading)) {
    return <div>Loading...</div>;
  }

  if (productQueries.some((query) => query.isError)) {
    return <div>Failed to load products.</div>;
  }

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

// /** @jsxImportSource @emotion/react */
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import Cartitem from '../components/Cartitem';
// import {
//   cartStyle,
//   tohomeStyle,
//   totalStyle,
//   buyStyle,
// } from '../styles/cartStyles';

// interface Product {
//   id: number;
//   thumbnail: string;
//   title: string;
//   discountPercentage: number;
//   price: number;
//   stock: number;
// }

// interface CartState {
//   [key: number]: number;
// }

// interface ProductsState {
//   [key: string]: Product;
// }

// export default function Cart(): React.ReactElement {
//   const [cart, setCart] = useState<CartState>({});
//   const [products, setProducts] = useState<ProductsState>({});
//   const [totalPrice, setTotalPrice] = useState<number>(0);

//   useEffect(() => {
//     const obj = JSON.parse(localStorage.getItem('cart') || '{}');
//     setCart(obj);
//     const idList = Object.keys(obj);
//     const getData = async () => {
//       try {
//         const resList = await Promise.all(
//           idList.map((id) =>
//             axios.get<Product>(`https://dummyjson.com/products/${id}`)
//           )
//         );
//         const datas: ProductsState = {};
//         resList.forEach((res) => {
//           datas[res.data.id] = res.data;
//         });
//         setProducts(datas);
//         changeTotal(obj, datas);
//       } catch (e) {
//         console.error('데이터를 불러올 수 없습니다.');
//       }
//     };
//     getData();
//   }, []);

//   const deleteItem = (id: number) => {
//     const copiedCart = { ...cart };
//     delete copiedCart[id];
//     localStorage.setItem('cart', JSON.stringify(copiedCart));
//     setCart(copiedCart);
//     changeTotal(copiedCart, products);
//   };

//   const changecnt = (id: number, count: number) => {
//     const changedCart = { ...cart, [id]: count };
//     localStorage.setItem('cart', JSON.stringify(changedCart));
//     setCart(changedCart);
//     changeTotal(changedCart, products);
//   };

//   const changeTotal = (cart: CartState, products: ProductsState) => {
//     let total = 0;
//     Object.entries(cart).forEach(([id, count]) => {
//       const product = products[id];
//       total += product.price * 1350 * count;
//     });
//     setTotalPrice(Math.round(total));
//   };

//   return (
//     <div css={cartStyle}>
//       {Object.entries(cart).length === 0 ? (
//         <>
//           장바구니에 상품이 없습니다.
//           <Link css={tohomeStyle} href="/">
//             쇼핑하러가기
//           </Link>
//         </>
//       ) : (
//         <>
//           {Object.entries(cart).map(([id, count]) => (
//             <Cartitem
//               key={id}
//               id={Number(id)}
//               quantity={count}
//               product={products[id]}
//               changecnt={changecnt}
//               deleteItem={deleteItem}
//             />
//           ))}
//           <div css={totalStyle}>
//             총 결제 금액: {totalPrice.toLocaleString('ko-KR')}원
//           </div>
//           <button
//             css={buyStyle}
//             onClick={() => alert('결제화면으로 이동합니다.')}
//           >
//             결제하기
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
