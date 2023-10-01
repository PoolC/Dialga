import { OpenAPI } from '~/lib/api-v2/__generated__';
import { request } from '~/lib/api-v2/__generated__/core/request';

/*
 * Swagger에 실제 구현과 다른 스펙이 있는 부분이 있을 수 있어, 해당 하는 부분들은 따로 구현
 * */
export class CustomApi {
  public static uploadFile(file: File | Blob) {
    return request<string>(OpenAPI, {
      method: 'POST',
      url: '/files',
      formData: { file },
    });
  }
}
