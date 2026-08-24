import client from './client';

export const createGiteaLoginTicket = () => client.post('/gitea/login-ticket');
