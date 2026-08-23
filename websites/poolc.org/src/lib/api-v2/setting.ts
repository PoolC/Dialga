import { OpenAPI } from '~/lib/api-v2/__generated__';
import { publicConfig } from '~/lib/config/publicConfig';

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
  OpenAPI.BASE = publicConfig.apiBaseUrl;
}

init();
