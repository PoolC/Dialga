import { Route, Switch } from 'react-router';
import PasswordResetEmailSuccess from '../../components/auth/PasswordResetEmailSuccess';
import PasswordResetSuccess from '../../components/auth/PasswordResetSuccess';
import { MENU } from '../../constants/menus';
import PasswordResetContainer from '../../containers/auth/PasswordResetContainer/PasswordResetContainer';
import PasswordResetEmailContainer from '../../containers/auth/PasswordResetEmailContainer/PasswordResetEmailContainer';

const PasswordResetEmailPage = () => {
  return (
    <>
      <Switch>
        <Route
          component={PasswordResetSuccess}
          path={`/${MENU.PASSWORD}/success/${MENU.RESET_PASSWORD}`}
          exact
        />
        <Route
          exact
          path={`/${MENU.PASSWORD}/success`}
          component={PasswordResetEmailSuccess}
        />
        <Route
          component={PasswordResetContainer}
          path={`/${MENU.PASSWORD}/${MENU.RESET_PASSWORD}`}
          exact
        />
        <Route
          component={PasswordResetEmailContainer}
          path={`/${MENU.PASSWORD}`}
          exact
        />
      </Switch>
    </>
  );
};

export default PasswordResetEmailPage;
