import colors from '../../../lib/styles/colors';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
    }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
    }
`;

const disappearAnimation = css`
  animation-name: ${fadeOut};
`;

export const ModalBlock = styled.div`
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) => props.disappear && disappearAnimation}
`;

const slideDownAnimation = css`
  animation-name: ${slideDown};
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray[0]};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  height: 200px;
  border-radius: 20px;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) => props.disappear && slideDownAnimation}
`;

export const HeaderBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.mint[0]};
  width: 300px;
  height: 35px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  & > .fa-times {
    cursor: pointer;
    margin-right: 15px;
    color: ${colors.brown[1]};
    transition: 0.3s ease-in;
    &:hover {
      color: ${colors.brown[0]};
      transition: 0.3s ease-in;
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  text-align: center;
  word-break: keep-all;
  line-height: 1.5rem;
  flex: 2;
  font-weight: 300;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
