let loader;

function showToast(message) {
  const toast = `<div>${message}</div>`;
  const box = document.createElement('div');
  box.innerHTML = toast;
  box.style.position = 'fixed';
  box.style.top = '20px';
  box.style.right = '20px';
  box.style.backgroundColor = '#47be9b';
  box.style.boxShadow = '0 2px 7px 0 rgba(0, 0, 0, 0.2)';
  box.style.padding = '20px';
  box.style.zIndex = 9999;
  box.style.transition = 'opacity .3s linear';
  box.style.color = '#fff';
  box.style.fontWeight = 700;

  document.body.append(box);

  setTimeout(() => {
    box.style.opacity = 0;
  }, 2000 - 300);

  setTimeout(() => {
    box.remove();
  }, 2000);
}

function showErrorToast(message) {
  const toast = `<div>${message}</div>`;
  const box = document.createElement('div');
  box.innerHTML = toast;
  box.style.position = 'fixed';
  box.style.top = '20px';
  box.style.right = '20px';
  box.style.backgroundColor = '#fa5252';
  box.style.boxShadow = '0 2px 7px 0 rgba(0, 0, 0, 0.2)';
  box.style.padding = '20px';
  box.style.zIndex = 9999;
  box.style.transition = 'opacity .3s linear';
  box.style.color = '#fff';
  box.style.fontWeight = 700;

  document.body.append(box);

  setTimeout(() => {
    box.style.opacity = 0;
  }, 4000 - 300);

  setTimeout(() => {
    box.remove();
  }, 4000);
}

function stopLoader() {
  clearInterval(loader);
  loader = null;
}

function findUsername() {
  const el = document.querySelector('a.username');
  if (isNull(el)) return null;
  const username = el?.innerText?.trim();
  if (isEmpty(username)) return null;
  return username;
}

/**
 * @description
 * - 문제 제출 맞음 여부를 확인하는 함수
 * - 2초마다 문제를 파싱하여 확인
 */
function startLoader() {
  const callback = async () => {
    // 기능 Off시 작동하지 않도록 함
    if (!isExistResultTable()) {
      return;
    }

    const table = findFromResultTable();

    if (isEmpty(table)) {
      return;
    }

    const data = table[0];

    if (!data.hasOwnProperty('username') || !data.hasOwnProperty('resultCategory')) {
      return;
    }

    const { username, resultCategory } = data;

    if (username !== findUsername()) {
      return;
    }

    if (!resultCategory.includes(RESULT_CATEGORY.RESULT_ACCEPTED)) {
      return;
    }

    stopLoader();

    const checkLoginData = await checkLogin();

    if (!checkLoginData.isLogin) {
      console.log('Poolc Baekjoon Hub에 로그인하고 풀씨 잔디를 쌓아보세요 🌼');
      return;
    }

    const psData = await findData();

    try {
      await notifyProblemSolved({
        language: psData.language,
        level: psData.level,
        problemId: psData.problemId,
        problemTags: psData.tags.map((tag) => tag.key), // 국문 or 영문 어떤게 더 낫지??
        submissionId: psData.submissionId,
        title: psData.titles[0].title,
      });
    } catch (error) {
      if (error === 'UNAUTHORIZED') {
        showErrorToast(`
        인증이 만료되었습니다. 😭<br/>
        <a href=${`chrome-extension://${chrome.runtime.id}/login.html`} style="color: #212529; font-weight: 700;">해당 링크</a>를 통해 다시 로그인해주세요. 🙏
      `);
      }
      console.error(error);
      return;
    }

    await reIssueToken();
    showToast(`${psData.problemId}번 문제 풀이가 풀씨에 업로드되었습니다. ❤`);
  };

  loader = setInterval(() => {
    callback();
  }, 2000);
}

function init() {
  startLoader();
}

init();
