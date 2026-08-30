import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AdminActivity from '../../../components/admin/AdminActivity/AdminActivity';
import * as activityAPI from '../../../lib/api/activity';
import { SUCCESS } from '../../../constants/statusCode';
import { useMessage } from '../../../hooks/useMessage';

const AdminActivityContainer = () => {
  const message = useMessage();
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
        setActivities((currentActivities) => currentActivities.map((activity) => (activity.id === activityID ? { ...activity, available: true } : activity)));
        message.success('활동 신청을 열었습니다.');
      }
    });
  };

  const onCloseActivity = (activityID) => {
    activityAPI.closeActivity(activityID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setActivities((currentActivities) => currentActivities.map((activity) => (activity.id === activityID ? { ...activity, available: false } : activity)));
        message.success('활동 신청을 마감했습니다.');
      }
    });
  };

  const onDeleteActivity = (activityID) => {
    activityAPI.deleteActivity(activityID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setActivities((currentActivities) => currentActivities.filter((activity) => activity.id !== activityID));
        message.success('활동이 삭제되었습니다.');
      }
    });
  };

  return <AdminActivity activities={activities} onOpenActivity={onOpenActivity} onCloseActivity={onCloseActivity} onDeleteActivity={onDeleteActivity} />;
};

export default withRouter(AdminActivityContainer);
