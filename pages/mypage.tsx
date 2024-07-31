/** @jsxImportSource @emotion/react */
import { useRouter } from 'next/navigation';
import { formStyle } from '../styles/registerStyles';
import { titleStyle, linkStyle } from '../styles/mypageStyles';
import Modal from '../components/Modal';
import { useModal } from '../utils/useModal';

const MyPage: React.FC = () => {
  const router = useRouter();
  const {
    modal,
    showModal,
    modalMessage,
    handleConfirm,
    handleCancel,
    modalMode,
  } = useModal();

  const handleLogout = () => {
    modal(
      '로그아웃 하시겠습니까?',
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        router.push('/');
      },
      'confirm'
    );
  };

  return (
    <div css={formStyle}>
      <h2 css={titleStyle}>내 정보</h2>
      <button css={linkStyle} onClick={() => router.push('/change-email')}>
        이메일 변경하기
      </button>
      <button css={linkStyle} onClick={() => router.push('/change-password')}>
        비밀번호 수정하기
      </button>
      <button css={linkStyle} onClick={handleLogout}>
        로그아웃
      </button>
      <button css={linkStyle} onClick={() => router.push('/withdraw')}>
        회원탈퇴
      </button>
      <Modal
        message={modalMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isVisible={showModal}
        mode={modalMode}
      />
    </div>
  );
};

export default MyPage;
