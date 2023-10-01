import { Route, Switch } from 'react-router-dom';
import { MENU } from './constants/menus';
import FooterContainer from './containers/footer/FooterContainer';
import HeaderContainer from './containers/header/HeaderContainer';
import { createStyles } from 'antd-style';
import { lazy, Suspense } from 'react';

// toast ui - global
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const useStyles = createStyles(({ css }) => ({
  container: css`
    padding-top: 90px;

    @media (max-width: 768px) {
      padding-top: 0;
    }
  `,
}));

const HomePage = lazy(() => import('./pages/home/HomePage'));

const IntroPage = lazy(() => import('./pages/intro/IntroPage'));

const MemberListPage = lazy(() => import('./pages/member/MemberListPage'));
const MemberDetailPage = lazy(() => import('./pages/member/MemberDetailPage'));

const ProjectListPage = lazy(() => import('./pages/project/ProjectListPage'));
const ProjectDetailPage = lazy(
  () => import('./pages/project/ProjectDetailPage'),
);

const ActivityAdminPage = lazy(
  () => import('./pages/activity/ActivityAdminPage'),
);
const ActivityListPage = lazy(
  () => import('./pages/activity/ActivityListPage'),
);
const ActivityAttendancePage = lazy(
  () => import('./pages/activity/ActivityAttendancePage'),
);
const ActivityDetailPage = lazy(
  () => import('./pages/activity/ActivityDetailPage'),
);

const BookListPage = lazy(() => import('./pages/book/BookListPage'));

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const MyInfoPage = lazy(() => import('./pages/auth/MyInfoPage'));
const PasswordResetEmailPage = lazy(
  () => import('./pages/auth/PasswordResetEmailPage'),
);

const ApplyPage = lazy(() => import('./pages/apply/ApplyPage'));
const InterviewPage = lazy(() => import('./pages/apply/InterviewPage'));

const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));

const AccessDeniedPage = lazy(() => import('./pages/error/AccessDeniedPage'));
const NotFoundPage = lazy(() => import('./pages/error/NotFoundPage'));

const BoardListPage = lazy(() => import('~/pages/board/BoardListPage'));
const BoardDetailPage = lazy(() => import('~/pages/board/BoardDetailPage'));
const BoardWritePage = lazy(() => import('~/pages/board/BoardWritePage'));

const MyPage = lazy(() => import('./pages/my-page/MyPage'));
const MyPageBadgeListPage = lazy(
  () => import('./pages/my-page/MyPageBadgeListPage'),
);

const MessageAllListPage = lazy(
  () => import('./pages/message/MessageAllListPage'),
);
const MessageListPage = lazy(() => import('./pages/message/MessageListPage'));
const MessageFormPage = lazy(() => import('./pages/message/MessageFormPage'));

function App() {
  const { styles } = useStyles();

  return (
    <>
      <HeaderContainer />
      <div className={styles.container}>
        <Suspense fallback={null}>
          <Switch>
            <Route component={HomePage} path="/" exact />
            <Route component={IntroPage} path={`/${MENU.INTRO}`} />
            <Route component={MemberListPage} path={`/${MENU.MEMBERS}`} />
            <Route
              component={MemberDetailPage}
              path={`/${MENU.MEMBER}/:memberID`}
            />
            <Route component={ProjectListPage} path={`/${MENU.PROJECTS}`} />
            <Route
              component={ProjectDetailPage}
              path={`/${MENU.PROJECT}/:projectID`}
            />
            <Route
              component={ActivityAdminPage}
              path={[
                `/${MENU.ACTIVITY}/new`,
                `/${MENU.ACTIVITY}/edit/:activityID`,
              ]}
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
            <Route
              component={PasswordResetEmailPage}
              path={`/${MENU.PASSWORD}`}
            />
            <Route component={InterviewPage} path={`/${MENU.INTERVIEW_TIME}`} />
            <Route component={AccessDeniedPage} path={`/${MENU.FORBIDDEN}`} />
            <Route component={NotFoundPage} path={`/${MENU.NOT_FOUND}`} />
            <Route component={BoardListPage} path={`/${MENU.BOARD}`} exact />
            <Route component={BoardWritePage} path={`/${MENU.BOARD}/write`} />
            <Route component={BoardDetailPage} path={`/${MENU.BOARD}/:id`} />
            <Route
              component={MessageAllListPage}
              path={`/${MENU.MESSAGE_ALL_LIST}`}
            />
            <Route component={MessageListPage} path={`/${MENU.MESSAGE_LIST}`} />
            <Route component={MessageFormPage} path={`/${MENU.MESSAGE_FORM}`} />
            <Route component={MyPage} path={`/${MENU.MY_PAGE}`} exact />
            <Route
              component={MyPageBadgeListPage}
              path={`/${MENU.MY_PAGE}/${MENU.MY_PAGE_BADGE_LIST}`}
            />
            <Route component={NotFoundPage} path="/" />
          </Switch>
        </Suspense>
      </div>
      <FooterContainer />
    </>
  );
}

export default App;
