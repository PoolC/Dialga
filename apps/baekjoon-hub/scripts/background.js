const POOLC_BASE_URL = 'http://server.poolc.kr:8080';

const appFetch = (...args) =>
  fetch(...args).then((res) => {
    if (res.status >= 400) {
      throw new Error('fetch error. please check network tab');
    }
    return res;
  });

// 참고 레퍼런스 https://eddori.tistory.com/5
function handleMessage(request, _, sendResponse) {
  const key = 'POOLC_HUB_TOKEN';

  // solved ac
  if (request.solvedAc) {
    appFetch(request.solvedAc.url, { method: request.solvedAc.method })
      .then((res) => res.json())
      .then(sendResponse)
      .catch(console.log);
  }
  // poolc
  else if (request.poolc) {
    chrome.storage.local.get(key).then((stored) => {
      const token = stored[key];
      appFetch(POOLC_BASE_URL + request.poolc.url, {
        method: request.poolc.method,
        body: JSON.stringify(request.poolc.body ?? {}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => sendResponse({ success: true }))
        .catch(console.log);
    });
  }
  // login check
  else if (request.checkLogin) {
    chrome.storage.local.get(key).then((stored) => {
      const token = stored[key];
      sendResponse({
        isLogin: Boolean(token),
      });
    });
  }
  // reissue token
  else if (request.reIssueToken) {
    chrome.storage.local.get(key).then((stored) => {
      const token = stored[key];
      appFetch(`${POOLC_BASE_URL}/login/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => chrome.storage.local.set({ key: res.accessToken }))
        .then(sendResponse)
        .catch(console.log);
    });
  }

  return true;
}

function init() {
  console.log('Hello, PoolC 🍀');
  chrome.runtime.onMessage.addListener(handleMessage);
}

init();
