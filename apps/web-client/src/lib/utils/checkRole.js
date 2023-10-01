import {
  ADMIN_MEMBER_ROLES,
  UNAUTHORIZED_MEMBER_ROLES,
} from '../../constants/memberRoles';

export const isAuthorizedRole = (role) => {
  return role !== null && !UNAUTHORIZED_MEMBER_ROLES.includes(role);
};

export const isAdminRole = (role) => {
  return ADMIN_MEMBER_ROLES.includes(role);
};
