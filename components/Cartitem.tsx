import { useState } from "react";
import styles from "./Cartitem.module.css";

interface Product {
  title: string;
  thumbnail: string;
  price: number;
  stock: number;
  discountPercentage: number;
}

interface CartitemProps {
  id:number;
  quantity:number;
  product:Product;
  changecnt: (id: number, count: number) => void;
  deleteItem: (id: number) => void;
}

export default function Cartitem({ id, quantity, product, changecnt, deleteItem }:CartitemProps) : React.ReactElement {
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
      alert("숫자를 입력해주세요");
      return;
    }
    if (value > product.stock) {
      alert("남은 수량을 확인해주세요");
      return;
    }
    setCount(value);
    changecnt(id, value);
  };

  return (
    <div className={styles.cartitem}>
      {product ? (
        <>
          <img className={styles.img} src={product.thumbnail} alt="" />
          <div className={styles.info}>
            <div className={styles.title}>{product.title}</div>
            <div>
              {Math.round(product.discountPercentage) !== 0 && (
                <span className={styles.discount}>{Math.round(product.discountPercentage)}%</span>
              )}
              <span className={styles.price}>{Math.round(product.price * 1350).toLocaleString("ko-KR")}원</span>
            </div>
            <div className={styles.stock}>
              <span>(남은수량 : {product.stock})</span>
              <span className={styles.soldout}>{product.stock < 10 ? "(매진임박)" : ""}</span>
            </div>
          </div>
          <div className={styles.btnwrap}>
            <button className={styles.delete} onClick={() => deleteItem(id)}>
              X
            </button>
            <div className={styles.select}>
              <div className={styles.selectbox}>
                <button onClick={minus}>-</button>
                <input
                  value={count}
                  onChange={handleChange}
                />
                <button onClick={plus}>+</button>
              </div>
              <div>{Math.round(product.price * count * 1350).toLocaleString("ko-KR")}원</div>
            </div>
          </div>
        </>
      ) : (
        <div>제품 정보를 가져오는 중입니다...</div>
      )}
    </div>
  );
}
