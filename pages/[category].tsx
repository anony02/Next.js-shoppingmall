import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Category from '../containers/Category';
import { useRouter } from 'next/router';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const categoryString = typeof category === 'string' ? category : '';

  return <Category category={categoryString} />;
};

export default CategoryPage;
