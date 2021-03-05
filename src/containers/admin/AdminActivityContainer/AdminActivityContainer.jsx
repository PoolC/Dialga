import AdminActivity from '../../../components/admin/AdminActivity/AdminActivity';
import React, { useEffect, useState } from 'react';
import * as activityAPI from '../../../lib/api/activity';
import { withRouter } from 'react-router-dom';

const AdminActivityContainer = ({ history }) => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await activityAPI.getActivities();
      console.log(response.data.data);
      setActivities(response.data.data);
    })();
  }, []);

  if (activities === null) {
    return null;
  }

  const onOpenActivity = (activityID) => {
    activityAPI.openActivity(activityID).then((res) => {
      if (res.status === 200) {
        setActivities(
          activities.map((activity) =>
            activity.id === activityID
              ? { ...activity, available: true }
              : activity,
          ),
        );
      }
    });
  };

  const onCloseActivity = (activityID) => {
    activityAPI.closeActivity(activityID).then((res) => {
      if (res.status === 200) {
        setActivities(
          activities.map((activity) =>
            activity.id === activityID
              ? { ...activity, available: false }
              : activity,
          ),
        );
      }
    });
  };

  const onDeleteActivity = (activityID) => {
    console.log(activityID);
    activityAPI.deleteActivity(activityID).then((res) => {
      if (res.status === 200) {
        setActivities(
          activities.filter((activity) => activity.id !== activityID),
        );
      }
    });
  };

  return (
    <AdminActivity
      activities={activities}
      onOpenActivity={onOpenActivity}
      onCloseActivity={onCloseActivity}
      onDeleteActivity={onDeleteActivity}
    />
  );
};

export default withRouter(AdminActivityContainer);
