import { useState } from 'react';
import { withRouter } from 'react-router';
import PasswordResetForm from '../../../components/auth/PasswordResetForm';
import { MENU } from '../../../constants/menus';
import { SUCCESS } from '../../../constants/statusCode';
import * as authAPI from '../../../lib/api/auth';

const PasswordResetEmailContainer = ({ history }) => {
  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onChangeMessage = (msg) => {
    setMessage(msg);
  };

  const onSubmit = ({ email }) => {
    try {
      setLoading(true);
      const response = authAPI.sendPasswordResetEmail({
        email,
      });
      response
        .then((res) => {
          if (res.status === SUCCESS.OK) {
            setLoading(false);
            setMessage(null);
            history.push(`/${MENU.PASSWORD}/success`);
          }
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
          if (e.response.status === 400) {
            setMessage('가입되지 않은 이메일 주소입니다.');
            handleModalOpen();
            return;
          }

          setMessage('비밀번호 재설정 이메일 전송 실패');
          handleModalOpen();
          return;
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PasswordResetForm
      type="email"
      message={message}
      onChangeMessage={onChangeMessage}
      modalVisible={modalVisible}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default withRouter(PasswordResetEmailContainer);
