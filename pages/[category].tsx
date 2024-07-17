import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Category from "../page/Category";
import { useRouter } from "next/router";

const CategoryPage : React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const categoryString = typeof category === 'string' ? category : '';

  return (
    <>
      <Nav />
      <Category category={categoryString} />
      <Footer />
    </>
  );
};

export default CategoryPage;
