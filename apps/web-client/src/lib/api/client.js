import axios from 'axios';
import { handleExpiredAccessToken } from '~/modules/auth';
import { store } from '~';

const API_BASE_URL = import.meta.env.DEV
  ? '/api/mincho'
  : import.meta.env.VITE_API_BASE_URL;

const client = axios.create();

client.defaults.baseURL = API_BASE_URL;

if (localStorage.getItem('accessToken')) {
  client.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('accessToken')}`;
} else {
  client.defaults.headers.common['Authorization'] = ``;
}

// client.interceptors.request.use(
//   async (config) => {
//     const userInfo = window.sessionStorage.getItem('userInfo');
//     const accessToken = userInfo ? JSON.parse(userInfo).accessToken : null;
//     config.headers = {
//       Authorization: `Bearer ${accessToken}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );

client.interceptors.response.use(
  (response) => {
    // 요청 성공 시 특정 작업 수행
    return response;
  },
  (error) => {
    // 요청 실패 시 특정 작업 수행
    if (error.response.status === 401) {
      store.dispatch(handleExpiredAccessToken());
    }
    return Promise.reject(error);
  },
);

/*
  글로벌 설정 예시:

  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/'

  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

  // 인터셉터 설정
  axios.intercepter.response.use(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    },
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  })
*/

export default client;
