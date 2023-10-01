import MemberDetail from '../../../components/members/MemberDetail/MemberDetail';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as memberAPI from '../../../lib/api/member';
import { MENU } from '../../../constants/menus';
import Spinner from '../../../components/common/Spinner/Spinner';
import { SUCCESS } from '../../../constants/statusCode';

const MemberDetailContainer = ({ match, history }) => {
  const { memberID } = match.params;
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memberAPI
      .getMember(memberID)
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setMember(res.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e.message);
        history.push(`/${MENU.FORBIDDEN}`);
      });
  }, [memberID, history]);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <MemberDetail member={member} />}
    </>
  );
};

export default withRouter(MemberDetailContainer);
