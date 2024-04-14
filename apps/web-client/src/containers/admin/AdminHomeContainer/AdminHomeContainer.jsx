import { withRouter } from 'react-router-dom';
import AdminHome from '../../../components/admin/AdminHome/AdminHome';

const AdminHomeContainer = ({ history }) => <AdminHome />;

export default withRouter(AdminHomeContainer);
