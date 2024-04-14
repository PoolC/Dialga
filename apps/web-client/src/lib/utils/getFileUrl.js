const FILE_URL = import.meta.env.VITE_FILE_URL;

const getFileUrl = (url) => url?.includes('http://') || url?.includes('https://') || url?.includes(FILE_URL) ? url : FILE_URL + url;

export const getDecodedFileUrl = (url) => decodeURI(url);

export default getFileUrl;
