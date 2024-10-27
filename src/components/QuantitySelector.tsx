/** @jsxImportSource @emotion/react */
import { selectorStyle, selectboxStyle } from '../styles/detailStyles';

interface QuantitySelectorProps {
  count: number;
  minus: () => void;
  plus: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalCost: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  count,
  minus,
  plus,
  handleChange,
  totalCost,
}) => {
  return (
    <div css={selectorStyle}>
      <div css={selectboxStyle}>
        <button onClick={minus}>-</button>
        <input value={count} onChange={handleChange} />
        <button onClick={plus}>+</button>
      </div>
      <div>{totalCost.toLocaleString('ko-KR')}원</div>
    </div>
  );
};

export default QuantitySelector;
