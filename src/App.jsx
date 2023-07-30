import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MENU } from './constants/menus';
import FooterContainer from './containers/footer/FooterContainer';
import HeaderContainer from './containers/header/HeaderContainer';
import ActivityAdminPage from './pages/activity/ActivityAdminPage';
import ActivityAttendancePage from './pages/activity/ActivityAttendancePage';
import ActivityDetailPage from './pages/activity/ActivityDetailPage';
import ActivityListPage from './pages/activity/ActivityListPage';
import ApplyPage from './pages/apply/ApplyPage';
import LoginPage from './pages/auth/LoginPage';
import MyInfoPage from './pages/auth/MyInfoPage';
import RegisterPage from './pages/auth/RegisterPage';
import BoardPage from './pages/board/BoardPage';
import BookListPage from './pages/book/BookListPage';
import HomePage from './pages/home/HomePage';
import IntroPage from './pages/intro/IntroPage';
import MemberDetailPage from './pages/member/MemberDetailPage';
import MemberListPage from './pages/member/MemberListPage';
import ProjectDetailPage from './pages/project/ProjectDetailPage';
import ProjectListPage from './pages/project/ProjectListPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import NotFoundPage from './pages/error/NotFoundPage';
import AccessDeniedPage from './pages/error/AccessDeniedPage';
import PasswordResetEmailPage from './pages/auth/PasswordResetEmailPage';
import InterviewPage from './pages/apply/InterviewPage';
import NewBoardListPage from './pages/new-board/NewBoardListPage';
import NewBoardDetailPage from './pages/new-board/NewBoardDetailPage';
import RoomListPage from './pages/room/RoomListPage';

function App() {
  return (
    <>
      <HeaderContainer />
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={IntroPage} path={`/${MENU.INTRO}`} />
        <Route component={MemberListPage} path={`/${MENU.MEMBERS}`} />
        <Route
          component={MemberDetailPage}
          path={`/${MENU.MEMBER}/:memberID`}
        />
        {/* <Route component={PostWritePage} path={`/${MENU.POST}/new/:boardID`} />
        <Route component={PostPage} path={`/${MENU.POST}/:postID`} /> */}
        <Route
          component={BoardPage}
          path={[
            `/${MENU.BOARDS}/:urlPath`,
            `/${MENU.BOARDS}`,
            `/${MENU.POST}`,
          ]}
        />
        <Route component={ProjectListPage} path={`/${MENU.PROJECTS}`} />
        <Route
          component={ProjectDetailPage}
          path={`/${MENU.PROJECT}/:projectID`}
        />
        <Route
          component={ActivityAdminPage}
          path={[`/${MENU.ACTIVITY}/new`, `/${MENU.ACTIVITY}/edit/:activityID`]}
          exact
        />
        <Route component={ActivityListPage} path={`/${MENU.ACTIVITIES}`} />
        <Route
          component={ActivityAttendancePage}
          path={[
            `/${MENU.ACTIVITY}/:activityID/attendance/:sessionID`,
            `/${MENU.ACTIVITY}/:activityID/attendance`,
          ]}
        />
        <Route
          component={ActivityDetailPage}
          path={`/${MENU.ACTIVITY}/:activityID`}
          exact
        />
        <Route component={BookListPage} path={`/${MENU.BOOKS}`} />
        <Route component={LoginPage} path={`/${MENU.SIGNIN}`} />
        <Route component={RegisterPage} path={`/${MENU.SIGNUP}`} />
        <Route component={ApplyPage} path={`/${MENU.APPLY}`} />
        <Route component={AdminHomePage} path={`/${MENU.ADMIN}`} />
        <Route component={MyInfoPage} path={`/${MENU.MYINFO}`} />
        <Route component={PasswordResetEmailPage} path={`/${MENU.PASSWORD}`} />
        <Route component={InterviewPage} path={`/${MENU.INTERVIEW_TIME}`} />
        <Route component={AccessDeniedPage} path={`/${MENU.FORBIDDEN}`} />
        <Route component={NotFoundPage} path={`/${MENU.NOT_FOUND}`} />
        <Route component={NewBoardListPage} path={`/${MENU.NEW_BOARDS}`}/>
        <Route component={NewBoardDetailPage} path={`/${MENU.NEW_BOARD}/:id`}/>
        <Route component={RoomListPage} path={`/${MENU.ROOMS}`}/>
        <Route component={NotFoundPage} path="/" />
      </Switch>
      <FooterContainer />
    </>
  );
}

export default App;
