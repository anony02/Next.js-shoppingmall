import Detail from '../../containers/Detail';
import { useRouter } from 'next/router';

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const idString = typeof id === 'string' ? id : '';

  return <Detail id={idString} />;
};

export default DetailPage;
