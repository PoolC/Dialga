import client from './client';

export const createFile = (file) => client.post(`/files`, file);
