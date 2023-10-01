import client from './client';

export const searchMember = ({ name }) =>
    client.get(`/member/name?name=${name}`);

export const getMembers = () => client.get('/member');

export const getMember = (loginID) => client.get(`/member/${loginID}`);

export const getMemberActivityHours = () => client.get(`/member/hour`);

export const acceptMember = (loginID) =>
    client.put(`/member/activate/${loginID}`);

export const withdrawMember = (loginID) => client.delete(`/member/${loginID}`);

export const toggleAdmin = ({ loginID, isAdmin }) =>
    client.put(`/member/admin/${loginID}`, { toAdmin: !isAdmin });

export const updateMemberRole = ({ loginID, role }) =>
    client.put(`/member/role/${loginID}`, { role });

export const updateMemberRoleBySelf = ({ role }) =>
    client.put('/member/role', { role });

export const getMemberRole = () => client.get('/member/role');

export const updateMemberIsExcepted = (loginId) =>
    client.put(`/member/excepted/${loginId}`);

export const deleteUnacceptedMembers = () => client.delete('/member/unaccepted');