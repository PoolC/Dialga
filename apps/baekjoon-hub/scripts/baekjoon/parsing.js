/*
  문제가 맞았다면 문제 관련 데이터를 파싱하는 함수의 모음입니다.
  모든 해당 파일의 모든 함수는 findData()를 통해 호출됩니다.
*/

/*
  bojData를 초기화하는 함수로 문제 요약과 코드를 파싱합니다.

  - 문제 설명: problemDescription
  - Github repo에 저장될 디렉토리: directory
  - 커밋 메시지: message
  - 백준 문제 카테고리: category
  - 파일명: fileName
  - Readme 내용 : readme
*/
async function findData(data) {
  try {
    if (isNull(data)) {
      let table = findFromResultTable();
      if (isEmpty(table)) return null;
      table = filter(table, {
        resultCategory: RESULT_CATEGORY.RESULT_ACCEPTED,
        language: table[0]['language'],
      });
      data = selectBestSubmissionList(table)[0];
    }

    if (isNaN(Number(data.problemId)) || Number(data.problemId) < 1000) {
      throw new Error(`정책상 대회 문제는 업로드 되지 않습니다. 대회 문제가 아니라고 판단된다면 이슈로 남겨주시길 바랍니다.\n문제 ID: ${data.problemId}`);
    }
    const res = await SolvedApiCall(data.problemId);
    return { ...data, ...res };
  } catch (error) {
    console.error(error);
  }
  return null;
}

/*
  결과 테이블의 존재 여부를 확인합니다.
*/
function isExistResultTable() {
  return document.getElementById('status-table') !== null;
}

/*
  결과 테이블을 파싱하는 함수입니다.
*/
function parsingResultTableList(doc) {
  const table = doc.getElementById('status-table');
  if (table === null || table === undefined || table.length === 0) return [];
  const headers = Array.from(table.rows[0].cells, (x) => convertResultTableHeader(x.innerText.trim()));

  const list = [];
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const cells = Array.from(row.cells, (x, index) => {
      switch (headers[index]) {
        case 'result':
          return { result: x.innerText.trim(), resultCategory: x.firstChild.getAttribute('data-color').replace('-eng', '').trim() };
        case 'language':
          return x.innerText.unescapeHtml().replace(/\/.*$/g, '').trim();
        case 'submissionTime':
          const el = x.querySelector('a.show-date');
          if (isNull(el)) return null;
          return el.getAttribute('data-original-title');
        case 'problemId':
          const a = x.querySelector('a.problem_title');
          if (isNull(a)) return null;
          return {
            problemId: a.getAttribute('href').replace(/^.*\/([0-9]+)$/, '$1'),
          };
        default:
          return x.innerText.trim();
      }
    });
    let obj = {};
    obj.elementId = row.id;
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = cells[j];
    }
    obj = { ...obj, ...obj.result, ...obj.problemId };
    list.push(obj);
  }
  return list;
}

/*
  제출 화면의 데이터를 파싱하는 함수로 다음 데이터를 확인합니다.
    - 유저이름: username
    - 실행결과: result
    - 메모리: memory
    - 실행시간: runtime
    - 제출언어: language
    - 제출시간: submissionTime
    - 제출번호: submissionId
    - 문제번호: problemId
    - 해당html요소 : element
*/
function findFromResultTable() {
  if (!isExistResultTable()) {
    return;
  }
  return parsingResultTableList(document);
}

/**
 * solvedac 문제 데이터를 파싱해오는 함수.
 * @param {int} problemId
 */
async function SolvedApiCall(problemId) {
  const response = await new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        solvedAc: {
          url: `https://solved.ac/api/v3/problem/show?problemId=${problemId}`,
          method: 'GET',
        },
      },
      resolve,
    );
  });
  return response;
}

async function notifyProblemSolved({ language, level, problemId, problemTags, submissionId, title }) {
  const response = await new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        poolc: {
          url: `/baekjoon`,
          method: 'POST',
          body: {
            language,
            level,
            problemId,
            problemTags,
            submissionId,
            title,
          },
        },
      },
      resolve,
    );
  });
  return response;
}

async function checkLogin() {
  const response = await new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        checkLogin: true,
      },
      resolve,
    );
  });
  return response;
}

async function reIssueToken() {
  const response = await new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        reIssueToken: true,
      },
      resolve,
    );
  });
  return response;
}
