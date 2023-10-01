import ActivityAttendance from '../../../components/activity/ActivityForm/ActivityAttendance';
import { useEffect, useState } from 'react';
import * as activityAPI from '../../../lib/api/activity';
import * as authAPI from '../../../lib/api/auth';
import { withRouter } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import Spinner from '../../../components/common/Spinner/Spinner';
import ActionButton from '../../../components/common/Buttons/ActionButton';
import { SUCCESS } from '../../../constants/statusCode';

const ActivityAttendanceContainer = ({ match, history }) => {
  const activityID = match.params.activityID;
  const sessionID = match.params.sessionID;

  const [loading, setLoading] = useState(true);

  const [activity, setActivity] = useState(null);
  const [activityMembers, setActivityMembers] = useState(null);
  const [activitySession, setActivitySession] = useState(null);
  const [activitySessions, setActivitySessions] = useState(null);
  const [sessionAttendance, setSessionAttendance] = useState(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const activityResponse = await activityAPI.getActivity(activityID);
      setActivity(activityResponse.data.data);
      authAPI
        .loadUser()
        .then((user) => {
          if (user.status === SUCCESS.OK && user.data.isActivated === false) {
            history.push(`/${MENU.FORBIDDEN}`);
            return;
          }
          if (
            user.status === SUCCESS.OK &&
            user.data.loginID !== activityResponse.data.data.host.loginID
          ) {
            history.push(`/${MENU.FORBIDDEN}`);
            return;
          }
        })
        .catch((e) => {
          console.error(e.message);
          history.push(`/${MENU.FORBIDDEN}`);
        });

      const activityMemberResponse = await activityAPI.getActivityMembers(
        activityID,
      );
      setActivityMembers(activityMemberResponse.data.data);

      const activitySessionsResponse = await activityAPI.getActivitySessions(
        activityID,
      );
      setActivitySessions(activitySessionsResponse.data.data);

      if (sessionID) {
        const activitySessionResponse = await activityAPI.getActivitySession(
          sessionID,
        );
        const sessionAttendance =
          await activityAPI.getActivitySessionAttendances(sessionID);
        setSessionAttendance(sessionAttendance.data.data);
        setActivitySession(activitySessionResponse.data);
      }

      setLoading(false);
    })();
  }, [activityID, sessionID, history]);

  const onCreateSession = async ({
    sessionNumber,
    date,
    description,
    attendances,
    hour,
    fileList,
  }) => {
    if (!date || !description || hour === '') {
      setErrorMessage('모든 항목을 입력해주세요');
      onShowErrorModal();
      return;
    }
    if (String(hour).includes('.')) {
      setErrorMessage('시간은 반올림하여 정수로 입력해주세요');
      onShowErrorModal();
      return;
    }
    try {
      const sessionCreateResponse = await activityAPI.createActivitySession({
        activityID,
        sessionNumber,
        date,
        description,
        hour,
        fileList,
      });
      const sessionID = sessionCreateResponse.data.id;
      const sessionAttendancesCreateResponse =
        await activityAPI.checkActivityAttendance({
          sessionID,
          memberLoginIDs: attendances.map((attendance) => attendance.loginID),
        });
      if (sessionAttendancesCreateResponse.status === SUCCESS.OK) {
        history.push(`/${MENU.ACTIVITY}/${activityID}`);
      }
    } catch (e) {
      console.error('***');
      console.error(e.response);
      setErrorMessage('오류가 발생했습니다');
      onShowErrorModal();
    }
  };

  const onUpdateSession = async ({
    date,
    description,
    attendances,
    hour,
    fileList,
  }) => {
    if (!date || !description || hour === '') {
      setErrorMessage('모든 항목을 입력해주세요');
      onShowErrorModal();
      return;
    }
    if (String(hour).includes('.')) {
      setErrorMessage('시간은 반올림하여 정수로 입력해주세요');
      onShowErrorModal();
      return;
    }
    try {
      const sessionUpdateResponse = await activityAPI.updateActivitySession({
        sessionID,
        date,
        description,
        hour,
        fileList,
      });
      await activityAPI.checkActivityAttendance({
        sessionID,
        memberLoginIDs: attendances.map((attendance) => attendance.loginID),
      });
      if (sessionUpdateResponse.status === SUCCESS.OK) {
        history.push(`/${MENU.ACTIVITY}/${activityID}`);
      }
    } catch (e) {
      console.error(e);
      setErrorMessage('오류가 발생했습니다');
      onShowErrorModal();
    }
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
        <ActivityAttendance
          activity={activity}
          activityMembers={activityMembers}
          activitySession={activitySession}
          sessionNumber={activitySessions.length}
          sessionAttendance={sessionAttendance}
          onCreateSession={onCreateSession}
          onUpdateSession={onUpdateSession}
          errorMessage={errorMessage}
          buttons={buttons}
          errorModalVisible={errorModalVisible}
          onCloseErrorModal={onCloseErrorModal}
        />
      )}
    </>
  );
};

export default withRouter(ActivityAttendanceContainer);
