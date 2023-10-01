import client from './client';

export const getActivities = () => client.get('/activity');

export const getActivitiesByYears = (semester) =>
  client.get(`/activity?when=${semester}`);

export const getActivityYears = () => client.get('/activity/years');

export const getActivity = (activityID) =>
  client.get(`/activity/${activityID}`);

export const openActivity = (activityID) =>
  client.put(`/activity/open/${activityID}`);

export const closeActivity = (activityID) =>
  client.put(`/activity/close/${activityID}`);

export const createActivity = ({
  title,
  description,
  startDate,
  seminar,
  classHour,
  hour,
  capacity,
  tags,
  fileList,
}) =>
  client.post(`/activity`, {
    title,
    description,
    startDate,
    seminar,
    classHour,
    hour,
    capacity,
    tags,
    fileList,
  });

export const updateActivity = ({
  activityID,
  title,
  description,
  startDate,
  seminar,
  classHour,
  hour,
  capacity,
  tags,
  fileList,
}) =>
  client.put(`/activity/${activityID}`, {
    title,
    description,
    startDate,
    seminar,
    classHour,
    hour,
    capacity,
    tags,
    fileList,
  });

export const deleteActivity = (activityID) =>
  client.delete(`/activity/${activityID}`);

export const createActivitySession = ({
  activityID,
  sessionNumber,
  date,
  description,
  hour,
  fileList,
}) =>
  client.post('/activity/session', {
    activityID,
    sessionNumber,
    date,
    description,
    hour,
    fileList,
  });

export const getActivitySessions = (activityID) =>
  client.get(`/activity/session/activity/${activityID}`);

export const getActivitySession = (sessionID) =>
  client.get(`/activity/session/${sessionID}`);

export const updateActivitySession = ({
  sessionID,
  date,
  description,
  hour,
  fileList,
}) =>
  client.put(`/activity/session/${sessionID}`, {
    date,
    description,
    hour,
    fileList,
  });

export const applyActivity = (activityID) =>
  client.post(`/activity/apply/${activityID}`);

export const getActivityMembers = (activityID) =>
  client.get(`/activity/member/${activityID}`);

export const getActivitySessionAttendances = (sessionID) =>
  client.get(`/activity/check/${sessionID}`);

export const checkActivityAttendance = ({ sessionID, memberLoginIDs }) =>
  client.post('/activity/check', {
    sessionID,
    memberLoginIDs,
  });
