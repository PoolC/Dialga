import client from './client';

export const getPosts = ({ urlPath, page }) =>
  client.get(`/post/board/${urlPath}?page=${page}`);

export const getPost = (postID) => client.get(`/post/${postID}`);

export const createPost = ({ title, body, boardID: boardId, fileList }) =>
  client.post('/post', { title, body, boardId, fileList });

export const updatePost = ({ title, body, postID, fileList }) =>
  client.put(`/post/${postID}`, { title, body, fileList });

export const deletePost = (postID) => client.delete(`/post/${postID}`);
