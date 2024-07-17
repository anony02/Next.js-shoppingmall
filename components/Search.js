import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import axios from "axios";
import Link from "next/link";

export default function Search() {
  const [list, setList] = useState([]);
  useEffect(
    () =>
      async function callAPI() {
        axios("https://dummyjson.com/products?limit=0").then((res) => {
          setList(res.data.products);
        });
      },
    []
  );
  const title = list.map((x) => x.title);
  const id = list.map((x) => x.id);
  const findid = (x) => id[title.indexOf(x)];
  const [input, setInput] = useState("");
  const [exist, setExist] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [idx, setIdx] = useState(-1);
  const onchange = (e) => {
    setInput(e.target.value);
    setExist(true);
  };
  const onclick = (e) => {
    setInput(e);
  };
  const onkeyup = (e) => {
    if (!exist) return;
    if (e.key === "ArrowDown" && dropdown.length > idx + 1) {
      setIdx(idx + 1);
    } else if (e.key === "ArrowUp" && idx >= 0) {
      setIdx(idx - 1);
    } else if (e.key === "Enter" && idx >= 0) {
      onclick(dropdown[idx]);
      setIdx(-1);
    }
  };
  useEffect(() => {
    if (input === "") {
      setExist(false);
      setDropdown([]);
    } else {
      setDropdown(title.filter((el) => el.toLowerCase().includes(input.toLowerCase())));
    }
  }, [input]);

  return (
    <>
      <div className={styles.searchbox}>
        <svg className={styles.searchicon} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <input
          className={styles.searchinput}
          placeholder="상품 검색"
          value={input}
          onChange={onchange}
          onKeyUp={onkeyup}
        />
        {exist && (
          <div className={styles.dropdown}>
            {dropdown.map((el, i) => (
              <Link
                className={`${styles.link} ${idx === i ? "selected" : ""}`}
                key={i}
                onMouseOver={() => setIdx(i)}
                onClick={() => {
                  setInput(el);
                  setExist(false);
                }}
                href={`/detail/${findid(el)}`}
              >
                {el + "\n"}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
