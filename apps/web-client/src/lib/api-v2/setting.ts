import { OpenAPI } from '~/lib/api-v2/__generated__';

export function setApiAccessToken(token: string) {
  OpenAPI.TOKEN = token;
}

export function removeApiAccessToken() {
  OpenAPI.TOKEN = undefined;
}

function init() {
  // token
  const cachedToken = localStorage.getItem('accessToken');
  if (cachedToken) {
    setApiAccessToken(cachedToken);
  }

  // base url
  OpenAPI.BASE = import.meta.env.DEV
    ? '/api/mincho'
    : import.meta.env.VITE_API_BASE_URL;
}

init();
