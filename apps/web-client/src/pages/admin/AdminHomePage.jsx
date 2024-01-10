import styled from '@emotion/styled';
import { Route, Switch, withRouter } from 'react-router-dom';
import AdminBadgeContainer from '~/containers/admin/AdminBadgeContainer/AdminBadgeContainer';
import AdminMenu from '../../components/admin/AdminMenu/AdminMenu';
import { MENU } from '../../constants/menus';
import AdminActivityContainer from '../../containers/admin/AdminActivityContainer/AdminActivityContainer';
import AdminBoardContainer from '../../containers/admin/AdminBoardContainer/AdminBoardContainer';
import AdminBoardFormContainer from '../../containers/admin/AdminBoardFormContainer/AdminBoardFormContainer';
import AdminBookContainer from '../../containers/admin/AdminBookContainer/AdminBookContainer';
import AdminBookFormContainer from '../../containers/admin/AdminBookFormContainer/AdminBookFormContainer';
import AdminHomeContainer from '../../containers/admin/AdminHomeContainer/AdminHomeContainer';
import AdminInfoContainer from '../../containers/admin/AdminInfoContainer/AdminInfoContainer';
import AdminInterviewContainer from '../../containers/admin/AdminInterviewContainer/AdminInterviewContainer';
import AdminInterviewTimeContainer from '../../containers/admin/AdminInterviewTimeContainer/AdminInterviewTimeContainer';
import AdminMemberContainer from '../../containers/admin/AdminMemberContainer/AdminMemberContainer';
import AdminPassContainer from '../../containers/admin/AdminPassContainer/AdminPassContainer';
import AdminProjectContainer from '../../containers/admin/AdminProjectContainer/AdminProjectContainer';
import AdminProjectFormContainer from '../../containers/admin/AdminProjectFormContainer/AdminProjectFormContainer';
import useAdminCheck from '../../hooks/useAdminCheck';

const AdminContainerBlock = styled.div`
  position: relative;
  top: 0px;
  width: 90%;
  left: 5%;
  right: 5%;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AdminPage = ({ history }) => {
  const menus = [
    { name: '관리자 홈', url: '' },
    { name: '동아리 정보 관리', url: '/info' },
    { name: '회원 관리', url: '/members' },
    { name: '최소활동기준 관리', url: '/pass' },
    { name: '게시판 관리', url: '/boards' },
    { name: '프로젝트 관리', url: '/projects' },
    { name: '활동 관리', url: '/activities' },
    { name: '도서 관리', url: '/books' },
    { name: '면접 시간 관리', url: '/interview-time' },
    { name: '면접 신청 조회', url: '/interview' },
    { name: '뱃지 관리', url: '/badge' },
  ];

  useAdminCheck(history);

  return (
    <AdminContainerBlock>
      <AdminMenu menus={menus} />
      <Switch>
        <Route component={AdminInfoContainer} path={`/${MENU.ADMIN}/info`} exact />

        <Route component={AdminMemberContainer} path={`/${MENU.ADMIN}/members`} exact />
        <Route component={AdminPassContainer} path={`/${MENU.ADMIN}/pass`} exact />
        <Route component={AdminBoardFormContainer} path={[`/${MENU.ADMIN}/boards/new`, `/${MENU.ADMIN}/boards/edit/:boardID`]} exact />
        <Route component={AdminBoardContainer} path={`/${MENU.ADMIN}/boards`} exact />
        <Route component={AdminProjectFormContainer} path={[`/${MENU.ADMIN}/projects/edit/:projectID`, `/${MENU.ADMIN}/projects/new`]} exact />
        <Route component={AdminProjectContainer} path={`/${MENU.ADMIN}/projects`} exact />
        <Route component={AdminActivityContainer} path={`/${MENU.ADMIN}/activities`} exact />
        <Route component={AdminBookFormContainer} path={[`/${MENU.ADMIN}/books/new`, `/${MENU.ADMIN}/books/edit/:bookID`]} exact />
        <Route component={AdminBookContainer} path={`/${MENU.ADMIN}/books`} exact />
        <Route component={AdminInterviewTimeContainer} path={`/${MENU.ADMIN}/interview-time`} exact />
        <Route component={AdminInterviewContainer} path={`/${MENU.ADMIN}/interview`} exact />
        <Route component={AdminBadgeContainer} path={`/${MENU.ADMIN}/badge`} exact />
        <Route component={AdminHomeContainer} path={`/${MENU.ADMIN}`} exact />
      </Switch>
    </AdminContainerBlock>
  );
};

export default withRouter(AdminPage);
