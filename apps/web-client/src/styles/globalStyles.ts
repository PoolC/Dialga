import { css } from '@emotion/react';
import { fontFamily } from '~/styles/font';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-family: ${fontFamily};
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
