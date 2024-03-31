import MemberDetailContainer from '../../containers/member/MemberDetailContainer/MemberDetailContainer';

export function loader() {
  return json({});
}

export function MemberDetailPage() {
  return <MemberDetailContainer />;
}
