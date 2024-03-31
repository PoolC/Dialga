import ActivityFormContainer from '../../containers/activity/ActivityFormContainer/ActivityFormContainer';

export function loader() {
  return json({});
}

export function ActivityAdminPage() {
  return <ActivityFormContainer />;
}
