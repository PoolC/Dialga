import { useEffect, useState } from 'react';
import AdminMember from '../../../components/admin/AdminMember/AdminMember';
import * as memberAPI from '../../../lib/api/member';
import Spinner from '../../../components/common/Spinner/Spinner';
import { SUCCESS } from '../../../constants/statusCode';
import { MEMBER_ROLE } from '../../../constants/memberRoles';
import { useMessage } from '../../../hooks/useMessage';

const AdminMemberContainer = () => {
  const message = useMessage();
  const [memberLoading, setMemberLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);

  const [members, setMembers] = useState(null);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await memberAPI.getMembers();
      setMembers(response.data.data);
      setMemberLoading(false);
    })();
  }, []);

  useEffect(() => {
    memberAPI
      .getMemberRole()
      .then((res) => {
        if (res.status === SUCCESS.OK) {
          setRoles(res.data.data);
          setRolesLoading(false);
        }
      })
      .catch(() => {});
  }, []);

  const onAcceptMember = (loginID) => {
    memberAPI.acceptMember(loginID).then((res) => {
      if (res.status === SUCCESS.OK) {
        message.success('회원 승인이 완료되었습니다.');
        setMembers((currentMembers) => currentMembers.map((member) => (member.loginID === loginID ? { ...member, isActivated: true, role: MEMBER_ROLE.MEMBER } : member)));
      }
    });
  };

  const onWithdrawMember = (loginID) => {
    memberAPI.withdrawMember(loginID).then((res) => {
      if (res.status === SUCCESS.OK) {
        alert('회원 탈퇴가 완료되었습니다.');
        setMembers((currentMembers) => currentMembers.filter((member) => member.loginID !== loginID));
      }
    });
  };

  const onUpdateMemberRole = ({ loginID, role }) => {
    memberAPI.updateMemberRole({ loginID, role }).then((res) => {
      if (res.status === SUCCESS.OK) {
        message.success('회원 상태가 변경되었습니다.');
        setMembers((currentMembers) => currentMembers.map((member) => (member.loginID === loginID ? { ...member, role } : member)));
      }
    });
  };

  if (members === null || roles === null) {
    return null;
  }

  return (
    <>
      {(memberLoading || rolesLoading) && <Spinner />}
      {!(memberLoading || rolesLoading) && (
        <AdminMember
          members={members}
          onAcceptMember={onAcceptMember}
          onWithdrawMember={onWithdrawMember}
          onUpdateMemberRole={onUpdateMemberRole}
          roles={roles}
        />
      )}
    </>
  );
};

export default AdminMemberContainer;
