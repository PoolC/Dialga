import AuthForm from '../../../components/auth/AuthForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initLogin, login } from '../../../modules/auth';

const LoginFormContainer = ({ location, history }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const {
    authError,
    status: { isLogin },
    login: { status },
  } = useSelector((state) => state.auth);

  const onSubmit = ({ id, password }) => {
    dispatch(login({ id, password }));
  };

  useEffect(() => {
    if (status === 'FAILURE' && authError) {
      if (authError.response.status === 403) {
        setMessage(authError.response.data.message);
        handleModalOpen();
        dispatch(initLogin());
        return;
      }

      setMessage('로그인에 실패하였습니다.');
      handleModalOpen();
      dispatch(initLogin());
      return;
    }

    if (isLogin) {
      handleModalOpen();
      history.push('/');
    }
  }, [authError, isLogin, history, status, dispatch]);

  function onChangeMessage(msg) {
    setMessage(msg);
  }

  return (
    <AuthForm
      type="login"
      onSubmit={onSubmit}
      message={message}
      onChangeMessage={onChangeMessage}
      modalVisible={modalVisible}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
    />
  );
};

export default withRouter(LoginFormContainer);
