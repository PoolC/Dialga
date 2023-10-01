import { useEffect, useState } from 'react';
import Session from '../../../components/activity/Session/Session';
import { useSelector } from 'react-redux';
import * as activityAPI from '../../../lib/api/activity';

const SessionContainer = ({ activityID, session, host }) => {
  const sessionID = session.id;
  const member = useSelector((state) => state.auth);
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await activityAPI.getActivitySessionAttendances(
        sessionID,
      );
      setAttendance(response.data.data);
    })();
  }, [sessionID]);

  if (attendance === null) {
    return null;
  }

  return (
    <Session
      session={session}
      attendance={attendance}
      memberInfo={member}
      activityID={activityID}
      host={host}
    />
  );
};

export default SessionContainer;
