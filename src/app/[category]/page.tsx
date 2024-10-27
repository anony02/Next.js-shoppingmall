'use client';
import { useParams } from 'next/navigation';
import ProductList from '../../components/ProductList';

export default function CategoryPage(): React.ReactElement {
  const category = useParams();

  const categoryString = typeof category === 'string' ? category : '';

  return <ProductList category={categoryString} />;
}
