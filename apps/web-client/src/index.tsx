import ReactDOM from 'react-dom/client';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { loadUser } from './modules/auth';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/lib/utils/queryClient';
import { MessageProvider } from '~/hooks/useMessage';
import BusinessScrollTopOnRouteChange from '~/components/@business/BusinessScrollTopOnRouteChange';
import { Global } from '@emotion/react';
import { globalStyles } from '~/styles/globalStyles';
import { theme } from '~/styles/theme';
import BusinessShowProgressOnRouteChange from './components/@business/BusinessShowProgressOnRouteChange';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const sagaMiddleware = createSagaMiddleware();
export const store = process.env.NODE_ENV === 'production' ? createStore(rootReducer, applyMiddleware(sagaMiddleware)) : createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

export function setUser() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return; // 로그인 상태가 아니라면 아무것도 안함
    store.dispatch(loadUser());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
setUser();

const $root = document.getElementById('root')!;

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot($root).render(
  <Provider store={store}>
    <Global styles={globalStyles} />
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MessageProvider>
          <RouterProvider router={router} />
        </MessageProvider>
      </QueryClientProvider>
    </ConfigProvider>
  </Provider>,
);
