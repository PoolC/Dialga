import styled, { css } from "styled-components";

import colors from "../../../../lib/styles/colors";
import { fadeIn, fadeOut, slideDown, slideUp } from "../../Modal/Modal.styles";

export const ReservationModalBlock = styled.div<{disappear: boolean}>`
  position: fixed;
  z-index: 100;
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

  ${({ disappear }) =>
    disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

export const ReservationModalContainer = styled.div<{
  disappear: boolean;
  offsetX: number;
  offsetY: number;
}>`
  display: flex;
  position: fixed;
  top: ${({offsetY}) => offsetY}px;
  left: ${({offsetX}) => offsetX}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray[0]};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 300px;
  min-height: 200px;
  border-radius: 20px;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${({ disappear }) =>
    disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;