import { publicConfig } from '~/lib/config/publicConfig';

const getFileUrl = (url) => (url?.includes('http://') || url?.includes('https://') || url?.includes(publicConfig.fileUrl) ? url : publicConfig.fileUrl + url);

export const getDecodedFileUrl = (url) => decodeURI(url);

export default getFileUrl;
