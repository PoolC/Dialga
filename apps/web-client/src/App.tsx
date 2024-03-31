import { Route, Routes } from 'react-router-dom';
import { MENU } from './constants/menus';
import FooterContainer from './containers/footer/FooterContainer';
import HeaderContainer from './containers/header/HeaderContainer';
import { createStyles } from 'antd-style';
import { lazy, Suspense } from 'react';

// toast ui - global
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const useStyles = createStyles(({ css }) => ({
  appContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    min-height: 100vh;
    width: 100%;
  `,
  content: css`
    padding-top: 90px;
    flex: 1;

    @media (max-width: 768px) {
      padding-top: 0;
    }
  `,
}));

function App() {
  const { styles } = useStyles();

  return (
    <div className={styles.appContainer}>
      <HeaderContainer />
      <div className={styles.content}>
        <Suspense fallback={null}>
          <Routes>
            <Route lazy={() => import('./pages/home/HomePage')} path="/" />
            <Route lazy={() => import('./pages/intro/IntroPage')} path={`/${MENU.INTRO}`} />
            <Route lazy={() => import('./pages/member/MemberListPage')} path={`/${MENU.MEMBERS}`} />
            <Route lazy={() => import('./pages/member/MemberDetailPage')} path={`/${MENU.MEMBER}/:memberID`} />
            <Route lazy={() => import('./pages/project/ProjectListPage')} path={`/${MENU.PROJECTS}`} />
            <Route lazy={() => import('./pages/project/ProjectDetailPage')} path={`/${MENU.PROJECT}/:projectID`} />
            <Route lazy={() => import('./pages/activity/ActivityAdminPage')} path={`/${MENU.ACTIVITY}/new`} />
            <Route lazy={() => import('./pages/activity/ActivityAdminPage')} path={`/${MENU.ACTIVITY}/edit/:activityID`} />
            <Route lazy={() => import('./pages/activity/ActivityListPage')} path={`/${MENU.ACTIVITIES}`} />
            <Route lazy={() => import('./pages/activity/ActivityAttendancePage')} path={`/${MENU.ACTIVITY}/:activityID/attendance/:sessionID`} />
            <Route lazy={() => import('./pages/activity/ActivityAttendancePage')} path={`/${MENU.ACTIVITY}/:activityID/attendance`} />
            <Route lazy={() => import('./pages/activity/ActivityDetailPage')} path={`/${MENU.ACTIVITY}/:activityID`} />
            <Route lazy={() => import('./pages/book/BookListPage')} path={`/${MENU.BOOKS}`} />
            <Route lazy={() => import('./pages/auth/LoginPage')} path={`/${MENU.SIGNIN}`} />
            <Route lazy={() => import('./pages/auth/RegisterPage')} path={`/${MENU.SIGNUP}`} />
            <Route lazy={() => import('./pages/apply/ApplyPage')} path={`/${MENU.APPLY}`} />
            <Route lazy={() => import('./pages/admin/AdminHomePage')} path={`/${MENU.ADMIN}`} />
            <Route lazy={() => import('./pages/auth/MyInfoPage')} path={`/${MENU.MYINFO}`} />
            <Route lazy={() => import('./pages/auth/PasswordResetEmailPage')} path={`/${MENU.PASSWORD}`} />
            <Route lazy={() => import('./pages/apply/InterviewPage')} path={`/${MENU.INTERVIEW_TIME}`} />
            <Route lazy={() => import('./pages/error/AccessDeniedPage')} path={`/${MENU.FORBIDDEN}`} />
            <Route lazy={() => import('./pages/error/NotFoundPage')} path={`/${MENU.NOT_FOUND}`} />
            <Route lazy={() => import('~/pages/board/BoardListPage')} path={`/${MENU.BOARD}`} exact />
            <Route lazy={() => import('~/pages/board/BoardWritePage')} path={`/${MENU.BOARD}/write`} />
            <Route lazy={() => import('~/pages/board/BoardDetailPage')} path={`/${MENU.BOARD}/:id`} />
            <Route lazy={() => import('./pages/my-page/MyPage')} path={`/${MENU.MY_PAGE}`} exact />
            <Route lazy={() => import('./pages/my-page/MyPageBadgeListPage')} path={`/${MENU.MY_PAGE}/${MENU.MY_PAGE_BADGE_LIST}`} />
            <Route lazy={() => import('./pages/message/MessageAllListPage')} path={`/${MENU.MESSAGE_ALL_LIST}`} />
            <Route lazy={() => import('./pages/message/MessageListPage')} path={`/${MENU.MESSAGE_LIST}`} />
            <Route lazy={() => import('./pages/message/MessageFormPage')} path={`/${MENU.MESSAGE_FORM}`} />
            <Route lazy={() => import('~/pages/room-reservation/RoomReservationPage')} path={`/${MENU.ROOM_RESERVATION}`} />
            <Route lazy={() => import('~/pages/room-reservation/RoomReservationPage')} path={`/${MENU.ROOM_RESERVATION}`} />
            <Route lazy={() => import('./pages/error/NotFoundPage')} path={`/`} />
          </Routes>
        </Suspense>
      </div>
      <FooterContainer />
    </div>
  );
}

export default App;
