import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Detail from "../../page/Detail";
import { useRouter } from "next/router";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Nav />
      <Detail id={id} />
      <Footer />
    </>
  );
};

export default DetailPage;
