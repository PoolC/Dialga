import { withRouter } from 'react-router-dom';
import AdminHome from '../../../components/admin/AdminHome/AdminHome';

const AdminHomeContainer = ({ history }) => {
  return <AdminHome />;
};

export default withRouter(AdminHomeContainer);
