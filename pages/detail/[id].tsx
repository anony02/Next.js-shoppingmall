import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Detail from "../../page/Detail";
import { useRouter } from "next/router";

const DetailPage : React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const idString = typeof id === 'string' ? id : '';

  return (
    <>
      <Nav />
      <Detail id={idString} />
      <Footer />
    </>
  );
};

export default DetailPage;
