/// <reference types="react-scripts" />

import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    withXSRFToken?: boolean;
  }
}
