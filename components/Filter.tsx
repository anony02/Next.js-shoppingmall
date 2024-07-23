/** @jsxImportSource @emotion/react */
import { useSetRecoilState } from 'recoil';
import { filterState } from '../recoil/atoms';
import { filterStyles } from '../styles/filterStyles';

interface FilterProps {
  filterName: string;
  name: string;
}

const Filter = ({ filterName, name }: FilterProps): React.ReactElement => {
  const setFilter = useSetRecoilState(filterState);

  return (
    <label css={filterStyles}>
      <input type="radio" name="filter" onClick={() => setFilter(filterName)} />
      <span>{name}</span>
    </label>
  );
};

export default Filter;
