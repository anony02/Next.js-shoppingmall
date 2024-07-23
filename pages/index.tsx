/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Filter from '../components/Filter';
import { mainStyle, filtersStyle, productsStyle } from '../styles/mainStyles';

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  discountPercentage: number;
  price: number;
  rating: number;
  stock: number;
}

export default function Main(): React.ReactElement {
  const [list, setList] = useState<Product[]>([]);
  useEffect(() => {
    async function callAPI() {
      try {
        const response = await axios.get(
          'https://dummyjson.com/products?limit=0'
        );
        setList(response.data.products);
      } catch (error) {
        console.error('API call error:', error);
      }
    }
    callAPI();
  }, []);

  return (
    <div css={mainStyle}>
      <div css={filtersStyle}>
        <Filter
          name={'낮은가격순'}
          onClick={() => setList([...list].sort((a, b) => a.price - b.price))}
        />
        <Filter
          name={'높은가격순'}
          onClick={() => setList([...list].sort((a, b) => b.price - a.price))}
        />
        <Filter
          name={'할인율순'}
          onClick={() =>
            setList(
              [...list].sort(
                (a, b) => b.discountPercentage - a.discountPercentage
              )
            )
          }
        />
        <Filter
          name={'평점순'}
          onClick={() => setList([...list].sort((a, b) => b.rating - a.rating))}
        />
      </div>
      <ul css={productsStyle}>
        {list.map((el) => (
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
