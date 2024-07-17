import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Category from "../page/Category";
import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <>
      <Nav />
      <Category category={category} />
      <Footer />
    </>
  );
};

export default CategoryPage;
