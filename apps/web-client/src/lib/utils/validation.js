export const idValidation = (id) => {
  const regex = /^[A-Za-z0-9+]{4,12}$/;
  return regex.test(id);
};

export const passwordValidation = (password) => password.length >= 8;

export const notEmptyValidation = (input) => input.length > 0;

export const emailValidation = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase()) && email.length < 256;
};

export const phoneNumberValidation = (phoneNumber) => {
  const regex = /^\d{3}-\d{3,4}-\d{4}$/;
  return regex.test(phoneNumber);
};

export const withdrawCheckValidation = (inputText) => inputText === '탈퇴를 확인합니다';
