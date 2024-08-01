/** @jsxImportSource @emotion/react */
import Filter from './Filter';
import Card from './Card';
import Pagination from './Pagination';
import { LoadingSpinner, ErrorMessages } from './FetchingScreen';
import { mainStyle, filtersStyle, productsStyle } from '../styles/mainStyles';
import { useProductList } from '../utils/useProductList';

interface ProductListProps {
  category?: string;
}

export default function ProductList({
  category,
}: ProductListProps): React.ReactElement {
  const {
    isLoading,
    error,
    paginatedList,
    handlePageChange,
    currentPage,
    totalPages,
  } = useProductList({ category });

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
        {paginatedList().map((el) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
