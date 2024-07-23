/** @jsxImportSource @emotion/react */
import { filterStyles } from '../styles/filterStyles';

interface FilterProps {
  onClick: () => void;
  name: string;
}

const Filter = ({ onClick, name }: FilterProps): React.ReactElement => {
  return (
    <label css={filterStyles}>
      <input type="radio" name="filter" onClick={onClick}></input>
      <span>{name}</span>
    </label>
  );
};

export default Filter;
