import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import colors from '../../../lib/styles/colors';

export const RecentNoticeBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1366px;
  margin: 20px 0 80px 0;
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
`;

export const NoticeContainerTitle = styled.h3`
  padding-left: 20px;
  width: 90%;
  margin-bottom: 30px;
  font-weight: 700;
`;

export const MainNoticeContents = styled.div`
  display: flex;
  width: 90%;
`;

export const RecentNoticeList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0;
`;

export const RecentNoticeItem = styled.li`
  padding: 10px 10px;
  display: flex;
  width: 96%;
  border-bottom: 1px solid ${colors.mint[1]};
  transition: 0.3s;

  &:first-of-type {
    border-top: 1px solid ${colors.mint[1]};
  }

  &:hover {
    background-color: ${colors.gray[1]};
    transition: 0.3s;
  }
`;

export const RecentNoticeCardTitle = styled.p`
  flex: 2;
  font-weight: 500;
  cursor: pointer;
  word-break: keep-all;
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

export const RecentNoticeCardDate = styled.p`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  font-weight: 300;
  font-size: 0.8rem;
`;
