# poolc-dialga

<img src="./images/dialga.webp" width="300px" title="Dialga" alt="Dialga"/>

- PoolC Renewal 2023 Web Frontend(forked from [Haribo](https://github.com/PoolC/Haribo))
- Backend Repository: [Palkia](https://github.com/PoolC/Palkia)

## stacks

- yarn berry monorepo
- react
- react-dom
- vite
- typescript
- antd
- emotion
- tanstack-query
- redux
- ...

## setting

### run

- Node.js ^20
- yarn ^3.7.0

```sh
yarn # install packages
yarn web-client codegen # generate types
yarn web-client dev # load dev server
```

### vscode setting

1. install [ZipFS extension](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs)
2. run `yarn dlx @yarnpkg/sdks vscode` in terminal
3. `View > Command Palette > Typescript: Select Typescript version > Use Workspace Version`

[https://kimyanglogging.tistory.com/8](https://kimyanglogging.tistory.com/8)

## 수정사항

- node 버전 20.x로 업그레이드
- react 버전 18.x로 업그레이드
  - react 18 업그레이드 해야 antd 관련 불필요한 warning 방지 가능함. [관련 이슈](https://github.com/ant-design/ant-design/issues/44994)
- 신규 기능들 typescript 5.x로 제작
- 디자인 시안 부재 + 톤앤매너 맞추기 위해 antd 사용. 당장의 생산성 + 향후 다크모드 도입시의 빠른 기능 추가 위해 antd-style 이용해 커스텀
- styled-components를 emotion으로 마이그레이션
  - antd와의 호환성, 더 적은 용량
- cdn 이용한 font awesome 의존성 제거하고 antd icons를 사용
- meta tag 추가
- cra환경을 vite로 마이그레이션
- api 중복 호출 및 정합성 깨지는 문제를 tanstack-query로 해결. 백엔드 api와의 정합성 유지 위해 openapi-typescript-generator 사용
- 수정사항에 맞게 배포환경 dockerizing
- toast-ui editor를 v2에서 v3로 업그레이드

## 신규 기능들

- 게시판
- 마이페이지
- 뱃지관리기능
- 동아리방예약
- 백준 익스텐션 제작해서 사이트와 연동
- 기타 ui 틀어지는 곳들 수정

## TODOS

- react-router-dom v6 업그레이드(or tanstack router?)
- suspense 도입 및 레기서 api호출들 tanstack-query로 모두 전환
- vite-ssr 도입 -> 세미나 메타태그 생성
- redux 제거. 정 상태관리 필요한 곳은 가벼운 다른 라이브러리로 대체
- 레거시 페이지들 마이그레이션
