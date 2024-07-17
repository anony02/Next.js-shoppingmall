import Link from "next/link";
import styles from "./Nav.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";

type CategoryList = string[];

export default function Nav(): React.ReactElement {
  const [list, setList] = useState<CategoryList>([]);
  useEffect(() => {
    async function callAPI() {
      try {
        const response = await axios.get<CategoryList>("https://dummyjson.com/products/category-list");
        setList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("API call error:", error);
      }
    }
    callAPI();
  }, []);
  return (
    <nav className={styles.nav}>
      <div className={styles.leftwrap}>
        <div className={styles.category}>
          <svg className={styles.btn} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g clipPath="url(#clip0_429_11066)">
                <path
                  d="M3 6.00092H21M3 12.0009H21M3 18.0009H21"
                  stroke="#292929"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_429_11066">
                  <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)"></rect>
                </clipPath>
              </defs>
            </g>
          </svg>
          <div className={styles.list}>
            {list.map((category) => (
              <Link className={styles.link} key={category} href={`/${category}`}>
                {category + "\n"}
              </Link>
            ))}
          </div>
        </div>
        <Link className={styles.logo} href="/">
          Shopping mall
        </Link>
      </div>
      <div className={styles.rightwrap}>
        <Search />
        <Link className={styles.btnwrap} href="/login">
          <svg className={styles.btn} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <circle fill="none" cx="12" cy="7" r="3"></circle>
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2z"></path>
            </g>
          </svg>
        </Link>
        <Link className={styles.btnwrap} href="/cart">
          <svg className={styles.btn} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </Link>
      </div>
    </nav>
  );
}
