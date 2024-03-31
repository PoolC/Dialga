import ActivityDetailContainer from '../../containers/activity/ActivityDetailContainer/ActivityDetailContainer';

export function loader() {
  return json({});
}

export function ActivityDetailPage() {
  return <ActivityDetailContainer />;
}
