import AuthForm from '../../../components/auth/AuthForm';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as authAPI from '../../../lib/api/auth';
import * as memberAPI from '../../../lib/api/member';
import {
  removeHeaderAccessToken,
  setHeaderAccessToken,
} from '../../../lib/utils/axiosUtil';
import { MENU } from '../../../constants/menus';
import Spinner from '../../../components/common/Spinner/Spinner';
import { logout } from '../../../modules/auth';
import { SUCCESS } from '../../../constants/statusCode';

const MyInfoFormContainer = ({ location, history }) => {
  const dispatch = useDispatch();

  const [userLoading, setUserLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);

  const [message, setMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [roles, setRoles] = useState(null);

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      removeHeaderAccessToken();
      setHeaderAccessToken();
      authAPI
        .loadUser()
        .then((res) => {
          if (res.status === SUCCESS.OK) {
            setUserInfo(res.data);
            setUserLoading(false);
          }
        })
        .catch((e) => {
          console.error(e.message);
          history.push(`/${MENU.FORBIDDEN}`);
        });
    })();
  }, [history]);

  useEffect(() => {
    (async () => {
      memberAPI
        .getMemberRole()
        .then((res) => {
          if (res.status === SUCCESS.OK) {
            setRoles(res.data.data);
            setRolesLoading(false);
          }
        })
        .catch((e) => {
          console.error(e.message);
          history.push(`/${MENU.FORBIDDEN}`);
        });
    })();
  }, [history]);

  function onChangeMessage(msg) {
    setMessage(msg);
  }

  const onSubmit = ({
    name,
    password,
    passwordCheck,
    email,
    phoneNumber,
    introduction,
    profileImageURL,
  }) => {
    try {
      const response = authAPI.updateUser({
        name,
        password,
        passwordCheck,
        email,
        phoneNumber,
        introduction,
        profileImageURL,
      });
      response
        .then((res) => {
          if (res.status === SUCCESS.OK) {
            setMessage('성공적으로 회원정보를 수정했습니다.');
            handleModalOpen();
            //history.push('/');
          }
        })
        .catch((e) => {
          if (e.response.status === 409) {
            setMessage('이미 가입된 정보입니다.');
            handleModalOpen();
            return;
          }

          if (e.response.status === 400) {
            setMessage('모든 값을 올바르게 입력해주세요.');
            handleModalOpen();
            return;
          }

          setMessage('정보 수정 실패');
          handleModalOpen();
          return;
        });
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateMemberRoleBySelf = ({ role }) => {
    memberAPI
      .updateMemberRoleBySelf({ role })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setMessage('성공적으로 회원 상태를 수정했습니다.');
          handleModalOpen();
        }
      })
      .catch((e) => {
        console.error(e);
        setMessage('회원 상태 수정 실패');
        handleModalOpen();
      });
  };

  const onWithdraw = () => {
    memberAPI
      .updateMemberRoleBySelf({ role: 'QUIT' })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          alert('성공적으로 풀씨에서 탈퇴했습니다.');
          setTimeout(() => {
            dispatch(logout());
            history.push('/');
          }, 1500);
        }
      })
      .catch((e) => {
        console.error(e);
        setMessage('회원 탈퇴 실패');
        handleModalOpen();
      });
  };

  return (
    <>
      {(userLoading || rolesLoading) && <Spinner />}
      {!(userLoading || rolesLoading) && (
        <AuthForm
          type="update"
          onSubmit={onSubmit}
          message={message}
          onChangeMessage={onChangeMessage}
          modalVisible={modalVisible}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          userInfo={userInfo}
          roles={roles}
          onUpdateMemberRoleBySelf={onUpdateMemberRoleBySelf}
          onWithdraw={onWithdraw}
        />
      )}
    </>
  );
};

export default withRouter(MyInfoFormContainer);
