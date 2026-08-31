import styled from '@emotion/styled';
import { media } from '../responsive';

export const MenuBlock = styled.div`
  min-width: 15rem;
  width: 15rem;
  margin: 0 20px 20px 0;
  padding: 0;

  ${media.belowWide} {
    min-width: 0;
    width: 100%;
    margin: 0 0 16px;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(32, 49, 43, 0.05);
  padding: 8px;
  margin: 0;

  ${media.belowWide} {
    flex-direction: row;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    border-radius: 16px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const MenuItem = styled.li`
  font-size: 0.9rem;
  display: flex;
  align-items: center;

  & > a {
    width: 100%;
    justify-content: flex-start;
    margin: 0;
    padding: 10px 12px;
    white-space: nowrap;
  }

  ${media.belowWide} {
    flex: 0 0 auto;

    & > a {
      width: auto;
      justify-content: center;
    }
  }
`;
