import AdminMember from '../../../components/admin/AdminMember/AdminMember';
import React, { useEffect, useState } from 'react';
import * as memberAPI from '../../../lib/api/member';

const AdminMemberContainer = ({ history }) => {
  const [members, setMembers] = useState(null);
  const [searchMembers, setSearchMembers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await memberAPI.getMembers();
      console.log(response);
      setMembers(response.data.data);
    })();
  }, []);

  const onAcceptMember = (loginID) => {
    memberAPI.acceptMember(loginID).then((res) => {
      if (res.status === 200) {
        setMembers(
          members.map((member) =>
            member.loginID === loginID
              ? { ...member, isActivated: true }
              : member,
          ),
        );
        setSearchMembers(
          searchMembers.map((member) =>
            member.loginID === loginID
              ? { ...member, isActivated: true }
              : member,
          ),
        );
      }
    });
  };

  const onWithdrawMember = (loginID) => {
    memberAPI.withdrawMember(loginID).then((res) => {
      if (res.status === 200) {
        setMembers(members.filter((member) => member.loginID !== loginID));
        setSearchMembers(
          searchMembers.filter((member) => member.loginID !== loginID),
        );
      }
    });
  };

  const onToggleAdmin = ({ loginID, isAdmin }) => {
    memberAPI.toggleAdmin({ loginID, isAdmin }).then((res) => {
      if (res.status === 200) {
        setMembers(
          members.map((member) =>
            member.loginID === loginID
              ? { ...member, isAdmin: !isAdmin }
              : member,
          ),
        );
        setSearchMembers(
          searchMembers.map((member) =>
            member.loginID === loginID
              ? { ...member, isAdmin: !isAdmin }
              : member,
          ),
        );
      }
    });
  };

  const onUpdateMemberStatus = ({ loginID, status }) => {
    memberAPI.updateMemberStatus({ loginID, status }).then((res) => {
      if (res.status === 200) {
        setMembers(
          members.map((member) =>
            member.loginID === loginID ? { ...member, status: status } : member,
          ),
        );
        setSearchMembers(
          searchMembers.map((member) =>
            member.loginID === loginID ? { ...member, status: status } : member,
          ),
        );
      }
    });
  };

  const onSearchMember = (name) => {
    const response = memberAPI.searchMember({ name });
    response.then((res) => {
      if (res.status === 200) {
        setSearchMembers(res.data.data);
      }
    });
  };

  if (members === null) {
    return null;
  }

  return (
    <AdminMember
      members={members}
      onAcceptMember={onAcceptMember}
      onWithdrawMember={onWithdrawMember}
      onToggleAdmin={onToggleAdmin}
      onUpdateMemberStatus={onUpdateMemberStatus}
      onSearchMember={onSearchMember}
      searchMembers={searchMembers}
    />
  );
};

export default AdminMemberContainer;
