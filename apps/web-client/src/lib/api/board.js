import client from './client';

export const getBoards = () => client.get('/board');

export const getBoard = (boardID) => client.get(`/board/${boardID}`);

export const createBoard = ({
  name,
  urlPath,
  readPermission,
  writePermission,
}) =>
  client.post(`/board`, {
    name,
    urlPath,
    readPermission,
    writePermission,
  });

export const updateBoard = ({
  boardID,
  name,
  urlPath,
  readPermission,
  writePermission,
}) =>
  client.put(`/board/${boardID}`, {
    name,
    urlPath,
    readPermission,
    writePermission,
  });

export const deleteBoard = (boardID) => client.delete(`/board/${boardID}`);
