import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../components/header/Header';
import { logout } from '../../modules/auth';

const HeaderContainer = ({ selected, history }) => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return <Header selected={selected} member={member} onLogout={onLogout} />;
};

export default withRouter(HeaderContainer);
