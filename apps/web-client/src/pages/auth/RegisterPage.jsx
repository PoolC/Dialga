import RegisterFormContainer from '../../containers/auth/RegisterFormContainer/RegisterFormContainer';
import { Route, Switch } from 'react-router-dom';
import { MENU } from '../../constants/menus';
import RegisterSuccessContainer from '../../containers/auth/RegisterSuccessContainer/RegisterSuccessContainer';

const RegisterPage = () => {
  return (
    <>
      <>
        <Switch>
          <Route
            exact
            path="/register/success"
            component={RegisterSuccessContainer}
          />
          <Route
            component={RegisterFormContainer}
            path={`/${MENU.SIGNUP}`}
            exact
          />
        </Switch>
      </>
    </>
  );
};

export default RegisterPage;
