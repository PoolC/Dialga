import client from './client';

export const createComment = ({ postID: postId, body }) =>
  client.post(`/comment`, { postId, body });

export const deleteComment = (commentID) =>
  client.delete(`/comment/${commentID}`);
