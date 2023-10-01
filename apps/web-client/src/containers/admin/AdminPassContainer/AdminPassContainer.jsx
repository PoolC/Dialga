import AdminPass from '../../../components/admin/AdminPass/AdminPass';
import { useState } from 'react';
import * as memberAPI from '../../../lib/api/member';
import { SUCCESS } from '../../../constants/statusCode';

const AdminPassContainer = () => {
  const [members, setMembers] = useState(null);

  const onChangeExcepted = (loginID, isExcepted) => {
    memberAPI.updateMemberIsExcepted(loginID).then((res) => {
      if (res.status === SUCCESS.OK) {
        setMembers(
          members.map((m) =>
            m.member.loginID === loginID
              ? { ...m, isExcepted: !isExcepted }
              : m,
          ),
        );
      }
    });
  };

  const onSubmit = () => {
    memberAPI.getMemberActivityHours().then((res) => {
      if (res.status === SUCCESS.OK) {
        setMembers(res.data.data);
      }
    });
  };

  const onWithdraw = (loginID, setIsExpelled) => {
    memberAPI.updateMemberRole({ loginID, role: 'EXPELLED' }).then((res) => {
      if (res.status === SUCCESS.OK) {
        setIsExpelled(true);
      }
    });
  };

  return (
    <AdminPass
      members={members}
      onChangeExcepted={onChangeExcepted}
      onSubmit={onSubmit}
      onWithdraw={onWithdraw}
    />
  );
};

export default AdminPassContainer;
