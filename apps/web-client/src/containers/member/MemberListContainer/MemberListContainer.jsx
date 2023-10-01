import MemberList from '../../../components/members/MemberList/MemberList';
import { useEffect, useState } from 'react';
import * as memberAPI from '../../../lib/api/member';
import { withRouter } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import { SUCCESS } from '../../../constants/statusCode';

const MemberListContainer = ({ history }) => {
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    memberAPI
      .getMembers()
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setMembers(res.data.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error(e.message);
        history.push(`/${MENU.FORBIDDEN}`);
      });
  }, [history]);

  return (
    <>
      <MemberList members={members} loading={loading} />
    </>
  );
};

export default withRouter(MemberListContainer);
