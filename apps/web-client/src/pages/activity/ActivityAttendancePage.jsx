import { json } from 'react-router-dom';
import ActivityAttendanceContainer from '../../containers/activity/ActivityFormContainer/ActivityAttendanceContainer';

export function loader() {
  return json({});
}

export function ActivityAttendancePage() {
  return <ActivityAttendanceContainer />;
}
