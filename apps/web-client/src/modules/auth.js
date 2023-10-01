import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import client from '../lib/api/client';
import { removeApiAccessToken, setApiAccessToken } from '~/lib/api-v2';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_INIT = 'auth/LOGIN_INIT';

const LOAD_USER = 'auth/LOAD_USER';
const LOAD_USER_SUCCESS = 'auth/LOAD_USER_SUCCESS';
const LOAD_USER_FAILURE = 'auth/LOAD_USER_FAILURE';

const SET_TOKEN = 'auth/SET_TOKEN';
const SET_TOKEN_SUCCESS = 'auth/SET_TOKEN';
const SET_TOKEN_FAILURE = 'auth/SET_TOKEN';

const LOGOUT = 'auth/LOGOUT';
// const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
// const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

const HANDLE_EXPIRED_ACCESS_TOKEN = 'auth/HANDLE_EXPIRED_ACCESS_TOKEN';

export const login = createAction(LOGIN, ({ id, password }) => ({
  id,
  password,
}));

export const setToken = createAction(SET_TOKEN);

export const loadUser = createAction(LOAD_USER);

export const logout = createAction(LOGOUT);

export const initLogin = createAction(LOGIN_INIT);

export const handleExpiredAccessToken = createAction(
  HANDLE_EXPIRED_ACCESS_TOKEN,
);

function* loadUserSaga(action) {
  try {
    const result = yield call(authAPI.loadUser);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* setTokenSaga(action) {
  try {
    yield (client.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${action.data}`);
    yield setApiAccessToken(action.data);
    yield put({
      type: SET_TOKEN_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SET_TOKEN_FAILURE,
      error: err,
    });
  }
}

function* loginSaga(action) {
  try {
    const result = yield call(authAPI.login, action.payload);
    yield localStorage.setItem('accessToken', result.data.accessToken);
    yield setApiAccessToken(result.data.accessToken);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data.accessToken,
    });
  } catch (err) {
    console.error('*****');
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err,
    });
  }
}

function logoutRequest() {
  localStorage.removeItem('accessToken');
  client.defaults.headers.common['Authorization'] = '';
  removeApiAccessToken();
}

function* handleExpiredAccessTokenRequest() {
  try {
    yield localStorage.removeItem('accessToken');
    yield (client.defaults.headers.common['Authorization'] = '');
    yield removeApiAccessToken();
    yield (window.location.href = '/login');
  } catch (err) {
    console.error('*****');
    console.error(err);
    // yield put({
    //   type: LOAD_USER_FAILURE,
    // });
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGIN_SUCCESS, setTokenSaga);
  yield takeLatest(SET_TOKEN_SUCCESS, loadUserSaga);
  yield takeLatest(LOAD_USER, loadUserSaga);
  yield takeLatest(
    HANDLE_EXPIRED_ACCESS_TOKEN,
    handleExpiredAccessTokenRequest,
  );
  yield takeLatest(LOGOUT, logoutRequest);
}

const initialState = {
  authError: null,
  login: {
    status: 'INIT',
  },
  status: {
    isLogin: false,
    init: false,
  },
  user: {
    memberId: '',
    name: '',
    password: '',
    isAdmin: false,
    role: null,
    profileImageURL: '',
  },
};

const auth = handleActions(
  {
    [LOGIN_INIT]: (state) => ({
      ...state,
      authError: null,
      login: {
        status: 'INIT',
      },
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      login: {
        status: 'SUCCESS',
      },
      status: {
        isLogin: true,
        init: false,
      },
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { error }) => ({
      ...state,
      login: {
        status: 'FAILURE',
      },
      authError: error,
    }),
    [LOAD_USER_SUCCESS]: (state, { data }) => {
      return {
        ...state,
        status: {
          isLogin: true,
          init: false,
        },
        user: {
          memberId: data.loginID,
          isAdmin: data.isAdmin,
          name: data.name,
          role: data.role,
          profileImageURL: getProfileImageUrl(data.profileImageURL),
        },
      };
    },
    [LOAD_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGOUT]: (state, { payload: error }) => ({
      ...state,
      login: {
        status: 'INIT',
      },
      status: {
        isLogin: false,
        init: false,
      },
      user: {
        memberId: '',
        password: '',
        name: '',
        isAdmin: false,
        role: null,
        profileImageURL: '',
      },
    }),
  },
  initialState,
);

export default auth;
