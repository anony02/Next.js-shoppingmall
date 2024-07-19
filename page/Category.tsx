import { useEffect, useState } from "react";
import styles from "./Category.module.css";
import axios from "axios";
import Card from "../components/Card";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  discountPercentage: number;
  price: number;
  rating: number;
  stock: number;
}

interface CategoryProps {
  category: string;
}

export default function Category({ category }:CategoryProps):React.ReactElement {
  const [list, setList] = useState<Product[]>([]);
  useEffect(() => {
    async function callAPI() {
      try {
        const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
        setList(res.data.products);
      } catch (error) {
        console.error("API call error:", error);
      }
    }
    callAPI();
  }, [category]);

  return (
    <div className={styles.main}>
      <div className={styles.filters}>
        <Filter name={"낮은가격순"} onClick={() => setList([...list].sort((a, b) => a.price - b.price))} />
        <Filter name={"높은가격순"} onClick={() => setList([...list].sort((a, b) => b.price - a.price))} />
        <Filter
          name={"할인율순"}
          onClick={() => setList([...list].sort((a, b) => b.discountPercentage - a.discountPercentage))}
        />
        <Filter name={"평점순"} onClick={() => setList([...list].sort((a, b) => b.rating - a.rating))} />
      </div>
      <ul className={styles.products}>
        {[...list].map((el) => (
          <Card
            key={el.id}
            id={el.id}
            thumbnail={el.thumbnail}
            title={el.title}
            discountPercentage={el.discountPercentage}
            price={el.price}
            rating={el.rating}
            stock={el.stock}
          />
        ))}
      </ul>
    </div>
  );
}

interface FilterProps {
  onClick: () => void;
  name: string;
}

const Filter = ({ onClick, name }:FilterProps): React.ReactElement => {
  return (
    <label className={styles.filter}>
      <input type="radio" name="filter" onClick={onClick}></input>
      <span>{name}</span>
    </label>
  );
};