export const idValidation = (id) => {
  const regex = new RegExp(/^[A-Za-z0-9+]{4,12}$/);
  return regex.test(id);
};

export const passwordValidation = (password) => {
  return password.length >= 8;
};

export const notEmptyValidation = (input) => {
  return input.length > 0;
};

export const emailValidation = (email) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  return regex.test(email.toLowerCase()) && email.length < 256;
};

export const phoneNumberValidation = (phoneNumber) => {
  const regex = new RegExp(/^\d{3}-\d{3,4}-\d{4}$/);
  return regex.test(phoneNumber);
};

export const withdrawCheckValidation = (inputText) => {
  return inputText === '탈퇴를 확인합니다';
};
