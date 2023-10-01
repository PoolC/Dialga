import client from './client';

export const getInterviews = () => client.get('/interview/slots');

export const createInterviewApplication = ({ slotId }) =>
  client.post(`/interview/application/${slotId}`);

export const deleteInterviewApplication = ({ loginId }) =>
  client.delete(`/interview/application/${loginId}`);

export const createInterviewSlot = ({ date, startTime, endTime, capacity }) =>
  client.post(`/interview/slots`, { date, startTime, endTime, capacity });

export const updateInterviewSlot = ({ slotId, startTime, endTime, capacity }) =>
  client.put(`/interview/slots/${slotId}`, { startTime, endTime, capacity });

export const deleteInterviewSlot = ({ slotId }) =>
  client.delete(`/interview/slots/${slotId}`);

export const deleteAllInterviewSlot = () => client.delete(`/interview/slots`);
