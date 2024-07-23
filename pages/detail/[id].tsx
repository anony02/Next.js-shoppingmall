import Detail from '../../containers/Detail';
import { useRouter } from 'next/router';

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const idNum = Number(id);

  return <Detail id={idNum} />;
};

export default DetailPage;
