import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function callAPI() {
      await axios(`https://dummyjson.com/products/${id}`).then((res) => {
        setList(res.data);
      });
    }
    callAPI();
  }, [id]);
  return (
    <div className={styles.detail}>
      <img className={styles.img} src={list.thumbnail} alt="" />
      <div className={styles.info}>
        <div className={styles.title}>{list.title}</div>
        <div>{list.description}</div>
        <div>평점 : {list.rating}/5점</div>
        <div>
          {Math.round(list.discountPercentage) !== 0 && (
            <span className={styles.discount}>{Math.round(list.discountPercentage)}%</span>
          )}
          <span className={styles.price}>{parseInt(list.price * 1350).toLocaleString("ko-KR")}원</span>
        </div>
        <div className={styles.stock}>
          <span>(남은수량 : {list.stock})</span>
          <span className={styles.soldout}>{list.stock < 10 ? "(매진임박)" : ""}</span>
        </div>
        <div className={styles.select}>
          <div className={styles.selectbox}>
            <button onClick={() => setCount(count === 0 ? list.stock : (x) => x - 1)}>-</button>
            <input
              value={count}
              onChange={(e) => {
                if (isNaN(parseInt(e.target.value))) {
                  alert("숫자를 입력해주세요");
                  return;
                }
                if (e.target.value > list.stock) {
                  alert("남은 수량을 확인해주세요");
                  return;
                }
                setCount(parseInt(e.target.value));
              }}
            ></input>
            <button onClick={() => setCount(count === list.stock ? 0 : (x) => x + 1)}>+</button>
          </div>
          <div>{parseInt(count * list.price * 1350).toLocaleString("ko-KR")}원</div>
        </div>
        <button
          onClick={() => {
            if (localStorage.getItem("cart") === null) {
              localStorage.setItem("cart", `{"${list.id}": ${count}}`);
            } else {
              let obj = JSON.parse(localStorage.getItem("cart"));
              obj[list.id] = count;
              localStorage.setItem("cart", JSON.stringify(obj));
            }
            alert("장바구니에 상품이 추가되었습니다.");
          }}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
