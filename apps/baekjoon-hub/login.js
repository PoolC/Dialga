const loginPoolc = ({ loginID, password }) => {
  const BASE_URL = 'http://server.poolc.kr:8080';
  const AUTHENTICATION_URL = `${BASE_URL}/login`;
  const data = JSON.stringify({ loginID, password });

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4) {
      const { responseText: _responseText, status } = xhr;
      const responseText = JSON.parse(_responseText);
      const accessToken = responseText.accessToken;
      if (status >= 200 && status < 400) {
        chrome.storage.local.set({ POOLC_HUB_TOKEN: accessToken }, () => {});
        $('.js-success').show();
        $('.js-form').hide();
      } else if (status >= 400 && status < 500) {
        $('.js-error').hide();
        $('.js-error-400').show();
      } else {
        $('.js-error').hide();
        $('.js-error-500').show();
      }
    }
  });

  xhr.open('POST', AUTHENTICATION_URL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
};

$(function () {
  $('.js-form').on('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginID = formData.get('id');
    const password = formData.get('password');
    loginPoolc({
      loginID,
      password,
    });
  });
});
