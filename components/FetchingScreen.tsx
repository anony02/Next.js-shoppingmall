/** @jsxImportSource @emotion/react */
import { loadingStyle, errorStyle } from '../styles/fetchingScreenStyles';

export function LoadingSpinner() {
  return (
    <div css={loadingStyle}>
      <div className="spinner"></div>
    </div>
  );
}

export function ErrorMessages() {
  return (
    <div css={errorStyle}>
      <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
    </div>
  );
}
