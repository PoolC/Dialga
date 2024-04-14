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
import { loadUser } from './modules/auth';
import { queryClient } from '~/lib/utils/queryClient';
import { MessageProvider } from '~/hooks/useMessage';
import BusinessScrollTopOnRouteChange from '~/components/@business/BusinessScrollTopOnRouteChange';
import App from './App';
import { globalStyles } from '~/styles/globalStyles';
import { theme } from '~/styles/theme';
import BusinessShowProgressOnRouteChange from './components/@business/BusinessShowProgressOnRouteChange';
import BusinessErrorBoundary from './components/@business/BusinessErrorBoundary';

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
