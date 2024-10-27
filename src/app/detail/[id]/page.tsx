'use client';
import { useParams } from 'next/navigation';
import Detail from '../../../components/Detail';

const DetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const idNum = Number(id);

  return <Detail id={idNum} />;
};

export default DetailPage;
