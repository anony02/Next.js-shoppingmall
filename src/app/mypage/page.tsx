/** @jsxImportSource @emotion/react */
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useModal } from '../../utils/useModal';
import { deleteUser } from '../../utils/api';
import Modal from '../../components/Modal';
import { titleStyle, linkStyle } from '../../styles/mypageStyles';
import { formStyle } from '../../styles/registerStyles';

const userid = typeof window !== 'undefined' && localStorage.getItem('token');

export default function MyPage(): React.ReactElement {
  const router = useRouter();
  const { modal, showModal, modalMessage, handleConfirm, handleCancel, modalMode } = useModal();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => logoutFn(),
    onError: () => {
      modal('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const logoutFn = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    router.push('/');
  };

  const handleLogout = () => modal('로그아웃 하시겠습니까?', logoutFn, 'confirm');

  const handleWithdraw = () =>
    modal(
      '회원탈퇴 시 모든 정보가 삭제되며, 복구가 불가능합니다.\n정말 탈퇴하시겠습니까?',
      completeWithdraw,
      'confirm',
    );

  const completeWithdraw = () => {
    setTimeout(() => {
      modal('회원 탈퇴가 완료되었습니다.\n이용해 주셔서 감사합니다.', () =>
        deleteUserMutation.mutate(userid as string),
      );
    }, 0);
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
      <button css={linkStyle} onClick={handleWithdraw}>
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
}
