import client from './client';

export const getAdminMember = () => client.get('/member');
