$(function () {
  const $loginLink = $('.js-poolc-login-link');

  const key = 'POOLC_HUB_TOKEN';

  chrome.storage.local.get(key).then((stored) => {
    const token = stored[key];
    const isLogin = Boolean(token);
    if (isLogin) {
      $loginLink.text('연동되었습니다. 🌼');
      $loginLink.css('cursor', 'default');
      $loginLink.click(function (e) {
        e.preventDefault();
      });
    } else {
      $loginLink.attr('href', `chrome-extension://${chrome.runtime.id}/login.html`);
    }
  });
});
