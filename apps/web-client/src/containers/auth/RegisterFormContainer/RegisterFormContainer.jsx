import AuthForm from '../../../components/auth/AuthForm';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as authAPI from '../../../lib/api/auth';
import { removeHeaderAccessToken } from '../../../lib/utils/axiosUtil';
import { CLIENT_ERROR, SUCCESS } from '../../../constants/statusCode';

const RegisterFormContainer = ({ location, history }) => {
  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    removeHeaderAccessToken();
  }, []);
  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const onSubmit = ({
    id,
    password,
    passwordCheck,
    name,
    email,
    department,
    studentId,
    phoneNumber,
    introduction,
    profileImageURL,
  }) => {
    try {
      const response = authAPI.register({
        id,
        password,
        passwordCheck,
        name,
        email,
        department,
        studentId,
        phoneNumber,
        introduction,
        profileImageURL,
      });
      response
        .then((res) => {
          if (res.status === SUCCESS.OK) {
            setMessage(null);
            history.push('/register/success');
          }
        })
        .catch((e) => {
          console.error(e);
          if (e.response.status === CLIENT_ERROR.CONFLICT) {
            setMessage('이미 가입된 아이디/이메일/학번입니다.');
            handleModalOpen();
            return;
          }

          if (e.response.status === CLIENT_ERROR.BAD_REQUEST) {
            setMessage('모든 값을 올바르게 입력해주세요.');
            handleModalOpen();
            return;
          }

          setMessage('회원가입 실패');
          handleModalOpen();
          return;
        });
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <AuthForm
      type="register"
      onSubmit={onSubmit}
      message={message}
      onChangeMessage={onChangeMessage}
      modalVisible={modalVisible}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
    />
  );
};

export default withRouter(RegisterFormContainer);
