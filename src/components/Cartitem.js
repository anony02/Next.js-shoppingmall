import { useState } from "react";
import styles from "./Cartitem.module.css";

export default function Cartitem({ id, quantity, product, changecnt, deleteItem }) {
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
              <span className={styles.price}>{parseInt(product.price * 1350).toLocaleString("ko-KR")}원</span>
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
                  onChange={(e) => {
                    if (isNaN(parseInt(e.target.value))) {
                      alert("숫자를 입력해주세요");
                      return;
                    }
                    if (e.target.value > product.stock) {
                      alert("남은 수량을 확인해주세요");
                      return;
                    }
                    setCount(parseInt(e.target.value));
                  }}
                />
                <button onClick={plus}>+</button>
              </div>
              <div>{parseInt(product.price * count * 1350).toLocaleString("ko-KR")}원</div>
            </div>
          </div>
        </>
      ) : (
        <div>제품 정보를 가져오는 중입니다...</div>
      )}
    </div>
  );
}
