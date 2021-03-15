require('dotenv').config();
const { REACT_APP_FILE_URL: FILE_URL } = process.env;
console.log(FILE_URL);

const getFileUrl = (url) => {
  const fileUrl = url.includes(FILE_URL) ? url : FILE_URL + url;
  return fileUrl;
};

export default getFileUrl;
