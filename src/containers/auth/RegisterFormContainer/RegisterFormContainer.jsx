import AuthForm from '../../../components/auth/AuthForm';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as authAPI from '../../../lib/api/auth';

const RegisterFormContainer = ({ location, history }) => {
  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
      });
      response
        .then((res) => {
          if (res.status === 202) {
            setMessage(null);
            history.push('/register/success');
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 409) {
            setMessage('이미 가입된 아이디/이메일/학번입니다.');
            handleModalOpen();
            return;
          }

          if (e.response.status === 400) {
            setMessage('모든 값을 올바르게 입력해주세요.');
            handleModalOpen();
            return;
          }

          setMessage('회원가입 실패');
          handleModalOpen();
          return;
        });
    } catch (e) {
      //console.log(e);
    }
  };

  function onChangeMessage(msg) {
    setMessage(msg);
  }

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
