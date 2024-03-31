import ActivityListContainer from '../../containers/activity/ActivityListContainer/ActivityListContainer';

export function loader() {
  return json({});
}

export function ActivityListPage() {
  return <ActivityListContainer />;
}
