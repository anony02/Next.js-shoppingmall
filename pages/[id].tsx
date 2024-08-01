import { useRouter } from 'next/router';
import Detail from '../components/Detail';

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const idNum = Number(id);

  return <Detail id={idNum} />;
};

export default DetailPage;
