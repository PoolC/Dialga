import { css } from '@emotion/react';
import { fontFamily } from '~/styles/font';

export const globalStyles = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  body {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    line-height: 1;
    background-color: rgb(250, 250, 250);
    margin: 0;
    padding: 0;
    font-family:
      'SUIT',
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #4c3722;
    scroll-behavior: smooth;
  }

  #root {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }

  button {
    background-color: rgba(255, 255, 255, 0);
    border: none;
    cursor: pointer;
    outline: none;
  }

  pre {
    background-color: rgba(234, 240, 245, 0.726);
    padding: 1rem;
  }

  a {
    color: #47be9b;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  input:not([type='checkbox']):not([type='radio']) {
    -webkit-appearance: none;
  }

  .tui-editor-defaultUI,
  .tui-editor-contents {
    font-family: ${fontFamily};
  }
`;
