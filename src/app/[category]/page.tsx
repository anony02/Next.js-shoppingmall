import { useRouter } from 'next/router';
import ProductList from '../../components/ProductList';

export default function CategoryPage(): React.ReactElement {
  const router = useRouter();
  const { category } = router.query;

  const categoryString = typeof category === 'string' ? category : '';

  return <ProductList category={categoryString} />;
}
