import styles from "./Cart.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Cartitem from "../components/Cartitem";

export default function Cart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(obj);
    const idList = Object.keys(obj);
    const getData = async () => {
      try {
        const resList = await Promise.all(idList.map((id) => axios.get(`https://dummyjson.com/products/${id}`)));
        const datas = {};
        resList.forEach((res) => {
          datas[res.data.id] = res.data;
        });
        setProducts(datas);
        changeTotal(obj, datas);
      } catch (e) {
        console.error("데이터를 불러올 수 없습니다.");
      }
    };
    getData();
  }, []);
  const deleteItem = (id) => {
    const copiedCart = { ...cart };
    delete copiedCart[id];
    localStorage.setItem("cart", JSON.stringify(copiedCart));
    setCart(copiedCart);
    changeTotal(copiedCart, products);
  };
  const changecnt = (id, count) => {
    const changedCart = { ...cart, [id]: count };
    localStorage.setItem("cart", JSON.stringify(changedCart));
    setCart(changedCart);
    changeTotal(changedCart, products);
  };
  const changeTotal = (cart, products) => {
    let total = 0;
    Object.entries(cart).forEach(([id, count]) => {
      const product = products[id];
      total += product.price * 1350 * count;
    });
    setTotalPrice(parseInt(total));
  };
  return (
    <div className={styles.cart}>
      {Object.entries(cart).length === 0 ? (
        <>
          장바구니에 상품이 없습니다.
          <Link className={styles.tohome} href="/">
            쇼핑하러가기
          </Link>
        </>
      ) : (
        <>
          {Object.entries(cart).map(([id, count]) => (
            <Cartitem
              key={id}
              id={id}
              quantity={count}
              product={products[id]}
              changecnt={changecnt}
              deleteItem={deleteItem}
            />
          ))}
          <div className={styles.total}>총 결제 금액: {totalPrice.toLocaleString("ko-KR")}원</div>
          <button className={styles.buy} onClick={() => alert("결제화면으로 이동합니다.")}>
            결제하기
          </button>
        </>
      )}
    </div>
  );
}
