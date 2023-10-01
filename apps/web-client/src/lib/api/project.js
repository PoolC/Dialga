import client from './client';

export const getProjects = () => client.get('/project');

export const getProject = (projectId) => client.get(`/project/${projectId}`);

export const createProject = ({
  name,
  description,
  genre,
  duration,
  thumbnailURL,
  body,
  memberLoginIDs,
}) =>
  client.post('/project', {
    name,
    description,
    genre,
    duration,
    thumbnailURL,
    body,
    memberLoginIDs,
  });

export const updateProject = ({
  projectID,
  name,
  description,
  genre,
  duration,
  thumbnailURL,
  body,
  memberLoginIDs,
}) =>
  client.put(`/project/${projectID}`, {
    name,
    description,
    genre,
    duration,
    thumbnailURL,
    body,
    memberLoginIDs,
  });

export const deleteProject = (projectID) =>
  client.delete(`/project/${projectID}`);
