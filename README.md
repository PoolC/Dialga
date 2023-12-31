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

## 수정사항

- node 버전 18.x로 업그레이드
- react 버전 17.x로 업그레이드
- 신규 기능들 typescript 4.x로 제작
- 디자인 시안 부재 + 톤앤매너 맞추기 위해 antd 사용. 당장의 생산성 + 향후 다크모드 도입시의 빠른 기능 추가 위해 antd-style 이용해 커스텀
- styled-components를 emotion으로 마이그레이션
  - antd와의 호환성, 더 적은 용량
- cdn 이용한 font awesome 의존성 제거하고 antd icons를 사용
- meta tag 추가
- cra환경을 vite로 마이그레이션
- api 중복 호출 및 정합성 깨지는 문제를 tanstack-query로 해결. 백엔드 api와의 정합성 유지 위해 openapi-typescript-generator 사용
- 수정사항에 맞게 배포환경 dockerizing

## 신규 기능들

- 게시판
- 마이페이지
- 뱃지관리기능
- 동아리방예약
- 백준 익스텐션 제작해서 사이트와 연동
- 기타 ui 틀어지는 곳들 수정

## TODOS

- react 버전 18로 업그레이드
  - react-router-dom v6 업그레이드
  - suspense 도입 및 레기서 api호출들 tanstack-query로 모두 전환
  - react 18 업그레이드 해야 antd 관련 불필요한 warning 방지 가능함. [관련 이슈](https://github.com/ant-design/ant-design/issues/44994)
- vite-ssr 도입 -> 세미나 메타태그 생성
- 레거시 페이지들 마이그레이션
