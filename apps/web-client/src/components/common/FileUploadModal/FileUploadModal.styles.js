import colors from '../../../lib/styles/colors';
import ActionButton from '../Buttons/ActionButton';
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

const fadeInAnimation = css`
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

  ${(props) => props.disappear && fadeInAnimation}
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
  height: 280px;
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

export const ModalName = styled.p`
  display: flex;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 1rem 0 1rem;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  text-align: center;
  word-break: keep-all;
  line-height: 1.5rem;
  flex: 2;
  font-weight: 300;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

export const ButtonContainer = styled.div`
  width: 80%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const StyledFileButton = styled.label`
  &.browse-file {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.brown[1]};
    color: ${colors.gray[0]};
    border-radius: 8px;
    transition: 0.3s;
    font-weight: 700;
    font-size: 0.8rem;
    width: 5rem;
    height: 2rem;
    margin: 0;
    &:hover {
      background-color: ${colors.brown[0]};
      transition: 0.3s;
    }
  }
`;

export const StyledFileInput = styled.input`
  position: relative;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  outline: 0;
`;

export const FileName = styled.div`
  margin: 0 0 0.5rem 0;
  width: 16rem;
  padding: 0.5rem;
  min-height: 5rem;
  border: 1px solid ${colors.gray[2]};
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  font-size: 0.8rem;
  font-weight: 300;
`;

export const StyledActionButton = styled(ActionButton)`
  background-color: ${colors.mint[2]};
  margin: 0;
  transition: 0.3s;
  width: 6rem;
  height: 2rem;
  &:hover {
    background-color: ${colors.mint[3]};
    transition: 0.3s;
  }
`;

export const FileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0 0.5rem 0;
`;

export const FileLabel = styled.p`
  display: flex;
  font-size: 0.7rem;
  padding: 0;
`;
