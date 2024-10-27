'use client';
import { useParams } from 'next/navigation';
import Detail from '../../../components/Detail';

const DetailPage: React.FC = () => {
  const id = useParams();

  const idNum = Number(id);

  return <Detail id={idNum} />;
};

export default DetailPage;
