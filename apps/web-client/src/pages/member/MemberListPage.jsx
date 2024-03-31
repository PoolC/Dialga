import MemberListContainer from '../../containers/member/MemberListContainer/MemberListContainer';
import { json } from 'react-router-dom';

export function loader() {
  return json({});
}

export const MemberListPage = () => {
  return <MemberListContainer />;
};
