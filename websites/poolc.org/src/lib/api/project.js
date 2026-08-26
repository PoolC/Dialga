import client from './client';

export const getProjects = (category) => client.get('/project', { params: category ? { category } : undefined });

export const getProject = (projectId) => client.get(`/project/${projectId}`);

export const createProject = ({ name, description, genre, category, startDate, endDate, thumbnailURL, body, memberLoginIDs }) =>
  client.post('/project', {
    name,
    description,
    genre,
    category,
    startDate,
    endDate: endDate || null,
    thumbnailURL,
    body,
    memberLoginIDs,
  });

export const updateProject = ({ projectID, name, description, genre, category, startDate, endDate, thumbnailURL, body, memberLoginIDs }) =>
  client.put(`/project/${projectID}`, {
    name,
    description,
    genre,
    category,
    startDate,
    endDate: endDate || null,
    thumbnailURL,
    body,
    memberLoginIDs,
  });

export const deleteProject = (projectID) => client.delete(`/project/${projectID}`);
