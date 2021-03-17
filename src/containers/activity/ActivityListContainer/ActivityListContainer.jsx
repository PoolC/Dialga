import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ActivityMenu from '../../../components/activity/ActivityMenu/ActivityMenu';
import ActivityList from '../../../components/activity/ActivityList/ActivityList';
import { useSelector } from 'react-redux';
import * as activityAPI from '../../../lib/api/activity';
import { TwoColumnsContainerBlock } from '../../../styles/common/Block.styles.js';
import Spinner from '../../../components/common/Spinner/Spinner';
import { MENU } from '../../../constants/menus';

const ActivityListContainer = ({ location, history, match }) => {
  const currentLocation = location.search.replace('?semester=', '');
  const member = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const [activities, setActivities] = useState(null);
  const [semesters, setSemesters] = useState(null);

  useEffect(() => {
    activityAPI.getActivityYears().then((res) => {
      if (res.status === 200) {
        setSemesters(res.data.data);
        if (res.data.data.length === 0) {
          activityAPI.getActivities().then((activities) => {
            setActivities(activities.data.data);
            setLoading(false);
          });
        } else {
          if (!currentLocation) {
            history.push(`/${MENU.ACTIVITIES}?semester=${res.data.data[0]}`);
            return;
          }
          activityAPI
            .getActivitiesByYears(
              currentLocation ? currentLocation : res.data.data[0],
            )
            .then((activities) => {
              setActivities(activities.data.data);
              setLoading(false);
            });
        }
      }
    });
  }, [history, currentLocation]);

  const onToggleRegisterActivity = (activityID, members, setMembers) => {
    activityAPI
      .applyActivity(activityID)
      .then((res) => {
        if (res.status === 200) {
          if (!members.includes(member.user.memberId)) {
            setMembers([...members, member.user.memberId]);
            alert('성공적으로 신청되었습니다.');
          }
          if (members.includes(member.user.memberId)) {
            setMembers(
              members.filter((memberId) => memberId !== member.user.memberId),
            );
            alert('성공적으로 신청 취소되었습니다.');
          }
        }
      })
      .catch((e) => {
        console.log(e);
        console.error(e.response.data.message);
        alert(e.response.data.message);
      });
  };

  const onDeleteActivity = (activityID) => {
    activityAPI.deleteActivity(activityID).then((res) => {
      if (res.status === 200) {
        setActivities(
          activities.filter((activity) => activity.id !== activityID),
        );
      }
    });
  };

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <TwoColumnsContainerBlock>
          <ActivityMenu
            semesters={semesters}
            currentLocation={currentLocation}
          />
          <ActivityList
            activities={activities}
            onToggleRegisterActivity={onToggleRegisterActivity}
            onDeleteActivity={onDeleteActivity}
            member={member}
          />
        </TwoColumnsContainerBlock>
      )}
    </>
  );
};

export default withRouter(ActivityListContainer);
