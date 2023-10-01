import ActivityForm from '../../../components/activity/ActivityForm/ActivityForm';
import { useEffect, useState } from 'react';
import * as activityAPI from '../../../lib/api/activity';
import * as authAPI from '../../../lib/api/auth';
import { withRouter } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/common/Spinner/Spinner';
import ActionButton from '../../../components/common/Buttons/ActionButton';
import { CLIENT_ERROR, SUCCESS } from '../../../constants/statusCode';

const ActivityFormContainer = ({ match, history }) => {
  const activityID = match.params.activityID;

  const [loading, setLoading] = useState(true);

  const [activity, setActivity] = useState(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const member = useSelector((state) => state.auth);
  const {
    user: { memberId },
  } = member;

  useEffect(() => {
    if (activityID) {
      activityAPI.getActivity(activityID).then((res) => {
        if (res.status === SUCCESS.OK) {
          authAPI
            .loadUser()
            .then((user) => {
              if (
                user.status === SUCCESS.OK &&
                user.data.isActivated === false
              ) {
                history.push(`/${MENU.FORBIDDEN}`);
                return;
              }
              if (
                user.status === SUCCESS.OK &&
                user.data.loginID !== res.data.data.host.loginID
              ) {
                history.push(`/${MENU.FORBIDDEN}`);
                return;
              }
            })
            .catch((e) => {
              console.error(e.message);
              history.push(`/${MENU.FORBIDDEN}`);
            });
          setActivity(res.data.data);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [activityID, memberId, history]);

  const onCreateActivity = ({
    title,
    description,
    startDate,
    seminar,
    classHour,
    hour,
    capacity,
    tags,
    fileList,
  }) => {
    if (
      !title ||
      !description ||
      !startDate ||
      !classHour ||
      !hour ||
      !capacity ||
      !tags
    ) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    activityAPI
      .createActivity({
        title,
        description,
        startDate,
        seminar,
        classHour,
        hour,
        capacity,
        tags,
        fileList,
      })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/activities');
        }
      })
      .catch((e) => {
        console.error(e.response.data);
        if (e.response.data.status === CLIENT_ERROR.FORBIDDEN) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
        setErrorMessage('오류가 발생했습니다');
        onShowErrorModal();
      });
  };

  const onUpdateActivity = ({
    title,
    description,
    startDate,
    seminar,
    classHour,
    hour,
    capacity,
    tags,
    fileList,
  }) => {
    if (
      !title ||
      !description ||
      !startDate ||
      !classHour ||
      !hour ||
      !capacity ||
      !tags
    ) {
      setErrorMessage('모든 항목을 입력하세요');
      onShowErrorModal();
      return;
    }
    activityAPI
      .updateActivity({
        activityID,
        title,
        description,
        startDate,
        seminar,
        classHour,
        hour,
        capacity,
        tags,
        fileList,
      })
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          history.push('/activities');
        }
      })
      .catch((e) => {
        console.error(e.response.data);
        if (e.response.data.status === 403) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
        setErrorMessage('오류가 발생했습니다');
        onShowErrorModal();
      });
  };

  const onShowErrorModal = () => {
    setErrorModalVisible(true);
  };

  const onCloseErrorModal = (e) => {
    e.preventDefault();
    setErrorModalVisible(false);
  };

  const buttons = <ActionButton onClick={onCloseErrorModal}>확인</ActionButton>;

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <ActivityForm
          activity={activity}
          onCreateActivity={onCreateActivity}
          onUpdateActivity={onUpdateActivity}
          errorMessage={errorMessage}
          buttons={buttons}
          errorModalVisible={errorModalVisible}
          onCloseErrorModal={onCloseErrorModal}
        />
      )}
    </>
  );
};

export default withRouter(ActivityFormContainer);
