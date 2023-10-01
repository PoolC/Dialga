import AdminActivity from '../../../components/admin/AdminActivity/AdminActivity';
import { useEffect, useState } from 'react';
import * as activityAPI from '../../../lib/api/activity';
import { withRouter } from 'react-router-dom';
import { SUCCESS } from '../../../constants/statusCode';

const AdminActivityContainer = ({ history }) => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await activityAPI.getActivities();
      setActivities(response.data.data);
    })();
  }, []);

  if (activities === null) {
    return null;
  }

  const onOpenActivity = (activityID) => {
    activityAPI.openActivity(activityID).then((res) => {
      if (res.status === SUCCESS.OK) {
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
      if (res.status === SUCCESS.OK) {
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
    activityAPI.deleteActivity(activityID).then((res) => {
      if (res.status === SUCCESS.OK) {
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
