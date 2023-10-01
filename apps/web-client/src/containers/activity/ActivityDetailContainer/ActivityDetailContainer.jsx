import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ActivityDetail from '~/components/activity/ActivityDetail/ActivityDetail';
import * as activityAPI from '~/lib/api/activity';
import { withRouter } from 'react-router-dom';
import { SUCCESS } from '~/constants/statusCode';
import { MEMBER_ROLE } from '~/constants/memberRoles';

const ActivityDetailContainer = ({ match }) => {
  const activityID = match.params.activityID;

  const [activityLoading, setActivityLoading] = useState(true);
  const [activityMembersLoading, setActivityMembersLoading] = useState(true);
  const [activitySessionsLoading, setActivitySessionsLoading] = useState(true);

  const [activity, setActivity] = useState(null);
  const [activityMembers, setActivityMembers] = useState(null);
  const [activityMemberIDs, setActivityMemberIDs] = useState(null);
  const [activitySessions, setActivitySessions] = useState(null);
  const member = useSelector((state) => state.auth);

  useEffect(() => {
    activityAPI.getActivity(activityID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setActivity(res.data.data);
        setActivityLoading(false);
      }
    });
  }, [activityID]);

  useEffect(() => {
    activityAPI.getActivitySessions(activityID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setActivitySessions(res.data.data);
        setActivitySessionsLoading(false);
      }
    });
  }, [activityID]);

  useEffect(() => {
    if (member.status.isLogin && member.user.role !== MEMBER_ROLE.UNACCEPTED) {
      setActivityMembersLoading(true);
      activityAPI.getActivityMembers(activityID).then((res) => {
        if (res.status === SUCCESS.OK) {
          setActivityMembers(res.data.data);
          setActivityMemberIDs(res.data.data.map((m) => m.loginID));
          setActivityMembersLoading(false);
        }
      });
    } else {
      setActivityMembersLoading(false);
    }
  }, [activityID, member.status.isLogin, member.user.role]);

  const onToggleRegisterActivity = (activityID) => {
    activityAPI
      .applyActivity(activityID)
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          activityAPI.getActivityMembers(activityID).then((res) => {
            if (res.status === SUCCESS.OK) {
              setActivityMemberIDs(res.data.data.map((m) => m.loginID));
              setActivityMembers(res.data.data);
            }
          });

          if (!activityMemberIDs?.includes(member.user.memberId)) {
            setActivityMemberIDs([...activityMemberIDs, member.user.memberId]);
            alert('성공적으로 신청되었습니다.');
          }
          if (activityMemberIDs?.includes(member.user.memberId)) {
            setActivityMemberIDs(
              activityMemberIDs?.filter(
                (memberID) => memberID !== member.user.memberId,
              ),
            );
            setActivityMembers(
              activityMembers?.filter(
                (m) => m.memberID !== member.user.memberId,
              ),
            );
            alert('성공적으로 신청 취소되었습니다.');
          }
        }
      })
      .catch((e) => {
        console.log(e);
        console.error(e.response?.data?.message);
        alert(e.response?.data?.message);
      });
  };

  return (
    <ActivityDetail
      loading={
        activityLoading || activityMembersLoading || activitySessionsLoading
      }
      activity={activity}
      activityMembers={activityMembers}
      activityMemberIDs={activityMemberIDs}
      activitySessions={activitySessions}
      member={member}
      onToggleRegisterActivity={onToggleRegisterActivity}
    />
  );
};

export default withRouter(ActivityDetailContainer);
