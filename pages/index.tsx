/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../utils/api';
import { productListState, filterState } from '../recoil/atoms';
import Card from '../components/Card';
import Filter from '../components/Filter';
import { mainStyle, filtersStyle, productsStyle } from '../styles/mainStyles';
import { LoadingSpinner, ErrorMessages } from '../components/FetchingScreen';

export default function Main(): React.ReactElement {
  const [list, setList] = useRecoilState(productListState);
  const filter = useRecoilValue(filterState);

  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data, setList]);

  const filteredList = () => {
    let sortedList = [...list];
    if (filter === '낮은가격순') {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (filter === '높은가격순') {
      sortedList.sort((a, b) => b.price - a.price);
    } else if (filter === '할인율순') {
      sortedList.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else if (filter === '평점순') {
      sortedList.sort((a, b) => b.rating - a.rating);
    }
    return sortedList;
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessages />;

  return (
    <main css={mainStyle}>
      <div css={filtersStyle}>
        <Filter name="낮은가격순" filterName="낮은가격순" />
        <Filter name="높은가격순" filterName="높은가격순" />
        <Filter name="할인율순" filterName="할인율순" />
        <Filter name="평점순" filterName="평점순" />
      </div>
      <ul css={productsStyle}>
        {filteredList().map((el) => (
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
    </main>
  );
}
