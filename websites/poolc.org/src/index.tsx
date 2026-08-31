import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { Global } from '@emotion/react';
import rootReducer, { rootSaga } from './modules/index';
import { handleExpiredAccessToken, loadUser } from './modules/auth';
import { setUnauthorizedHandler } from './lib/api/client';
import { queryClient } from '~/lib/utils/queryClient';
import { MessageProvider } from '~/hooks/useMessage';
import BusinessScrollTopOnRouteChange from '~/components/@business/BusinessScrollTopOnRouteChange';
import App from './App';
import { globalStyles } from '~/styles/globalStyles';
import { theme } from '~/styles/theme';
import BusinessShowProgressOnRouteChange from './components/@business/BusinessShowProgressOnRouteChange';
import BusinessErrorBoundary from './components/@business/BusinessErrorBoundary';
import './styles/shadcn.css';

const DEV_AUTH_STATE_STORAGE_KEY = 'poolc.dev.auth-state';

const getDevelopmentAuthState = () => {
  if (!import.meta.env.DEV || !localStorage.getItem('accessToken')) {
    return undefined;
  }

  try {
    const cachedAuthState = sessionStorage.getItem(DEV_AUTH_STATE_STORAGE_KEY);
    return cachedAuthState ? { auth: JSON.parse(cachedAuthState) } : undefined;
  } catch {
    return undefined;
  }
};

const sagaMiddleware = createSagaMiddleware();
const hmrState = (import.meta.hot?.data.reduxState as ReturnType<typeof rootReducer> | undefined) ?? getDevelopmentAuthState();
const storeEnhancer = process.env.NODE_ENV === 'production' ? applyMiddleware(sagaMiddleware) : composeWithDevTools(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, hmrState, storeEnhancer);

setUnauthorizedHandler(() => {
  store.dispatch(handleExpiredAccessToken());
});

export function setUser() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return; // 로그인 상태가 아니라면 아무것도 안함
  store.dispatch(loadUser());
}

sagaMiddleware.run(rootSaga);

if (import.meta.env.DEV) {
  store.subscribe(() => {
    const authState = store.getState().auth;

    if (authState.status.isLogin) {
      sessionStorage.setItem(DEV_AUTH_STATE_STORAGE_KEY, JSON.stringify(authState));
    } else {
      sessionStorage.removeItem(DEV_AUTH_STATE_STORAGE_KEY);
    }
  });
}

setUser();

if (import.meta.hot) {
  import.meta.hot.dispose((data) => {
    data.reduxState = store.getState();
  });
}

const $root = document.getElementById('root')!;

ReactDOM.createRoot($root).render(
  <Provider store={store}>
    <Global styles={globalStyles} />
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MessageProvider>
          <BrowserRouter>
            <BusinessScrollTopOnRouteChange />
            <BusinessShowProgressOnRouteChange />
            <BusinessErrorBoundary>
              <App />
            </BusinessErrorBoundary>
          </BrowserRouter>
        </MessageProvider>
      </QueryClientProvider>
    </ConfigProvider>
  </Provider>,
);
