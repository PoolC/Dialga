/** -------------------------------------------
 * NOTE.
 * 아래 스타일들에 의존하고 있는 외부 파일들이 많아서 해당 파일은 삭제하지 않음
 * --------------------------------------------
 * */

import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const FileContainer = styled.div`
  width: 90%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  min-height: 2rem;
  border: 1px solid ${colors.gray[2]};
  border-radius: 5px;
  text-align: center;
  word-break: break-all;
  font-size: 0.7rem;
  font-weight: 300;
  box-sizing: border-box;
  padding: 5px 0.5rem;
`;

export const File = styled.p`
  display: flex;
  margin: 5px;
  align-items: center;
  word-break: break-all;
  font-size: 0.7rem;
  & > a {
    font-size: 0.7rem;
    word-break: break-all;
    line-height: 0.8rem;
  }
`;

export const FileContainerTitle = styled.div`
  width: 90%;
  display: flex;
  font-size: 0.7rem;
  margin-top: 1rem;
`;

export const FileDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border-radius: 4px;
  color: ${colors.gray[0]};
  font-size: 0.7rem;
  background-color: ${colors.red[0]};
  margin: 0 0.2rem;
  transition: 0.25s ease-in;
  &:hover {
    background-color: ${colors.red[1]};
    transition: 0.25s ease-in;
  }
`;

export const StyledDeleteIcon = styled.i`
  padding: 0;
  font-size: 0.7rem;
  margin: 0;
`;
