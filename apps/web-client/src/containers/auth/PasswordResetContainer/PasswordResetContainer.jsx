import { useState } from 'react';
import { withRouter } from 'react-router';
import PasswordResetForm from '../../../components/auth/PasswordResetForm';
import { MENU } from '../../../constants/menus';
import { SUCCESS } from '../../../constants/statusCode';
import * as authAPI from '../../../lib/api/auth';

const PasswordResetContainer = ({ history, location }) => {
  const passwordResetToken = location.search.replace('?token=', '');

  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onChangeMessage = (msg) => {
    setMessage(msg);
  };

  const onSubmit = ({ password, passwordCheck }) => {
    try {
      const response = authAPI.resetPassword({
        passwordResetToken,
        password,
        passwordCheck,
      });
      response
        .then((res) => {
          if (res.status === SUCCESS.OK) {
            setMessage(null);
            history.push(`/${MENU.PASSWORD}/success/${MENU.RESET_PASSWORD}`);
          }
        })
        .catch((e) => {
          console.error(e);

          if (e.response.status === 400) {
            setMessage('토큰이 유효하지 않습니다. 관리자에게 문의해주세요.');
            handleModalOpen();
            return;
          }

          setMessage('비밀번호 재설정 실패');
          handleModalOpen();
          return;
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PasswordResetForm
      type="reset"
      message={message}
      onChangeMessage={onChangeMessage}
      modalVisible={modalVisible}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      onSubmit={onSubmit}
    />
  );
};

export default withRouter(PasswordResetContainer);
