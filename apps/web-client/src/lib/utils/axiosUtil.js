import client from '../api/client';

export const setHeaderAccessToken = () => {
  if (localStorage.getItem('accessToken')) {
    client.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('accessToken')}`;
  } else {
    client.defaults.headers.common['Authorization'] = ``;
  }
};

export const removeHeaderAccessToken = () => {
  client.defaults.headers.common['Authorization'] = ``;
};
