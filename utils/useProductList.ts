import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategoryProducts } from '../utils/api';
import { productListState, filterState } from '../recoil/atoms';

interface UseProductListParams {
  category?: string;
}

export const useProductList = ({ category }: UseProductListParams) => {
  const [list, setList] = useRecoilState(productListState);
  const filter = useRecoilValue(filterState);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 16;

  const queryKey = category ? ['categoryProducts', category] : ['products'];
  const queryFn = category
    ? () => fetchCategoryProducts(category)
    : fetchProducts;

  const { data, error, isLoading } = useQuery({ queryKey, queryFn });

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

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginatedList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredList().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredList().length / itemsPerPage);

  return {
    list,
    filter,
    currentPage,
    itemsPerPage,
    data,
    error,
    isLoading,
    filteredList,
    handlePageChange,
    paginatedList,
    totalPages,
  };
};
