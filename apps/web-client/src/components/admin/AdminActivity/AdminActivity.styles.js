import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';

export const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 1rem;
`;

export const ContentsContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  & > thead {
    padding: 0;
    margin: 0;
  }
  & > tbody {
    width: 100%;
  }
`;

export const TableHead = styled.tr`
  cursor: default;
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0.8rem 0px;
  font-size: 0.9rem;
  background-color: ${colors.mint[0]};
  & > .activity_list_head {
    flex: 1;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > .hide {
    @media (max-width: 1000px) {
      display: none;
    }
  }
  @media (max-width: 576px) {
    font-size: 0.5rem;
  }
`;

export const ActivityListRow = styled.tr`
  cursor: default;
  display: flex;
  padding: 0.5rem 0;
  transition: 0.3s;
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
  & > .activity-list-row {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
    padding: 0 10px;
    line-height: 1.5rem;
    font-size: 0.8rem;
    @media (max-width: 576px) {
      font-size: 0.5rem;
    }
    & > button {
      @media (max-width: 576px) {
        font-size: 0.5rem;
        margin: 2px;
      }
    }
  }
  &:hover {
    background-color: ${colors.gray[0]};
    transition: 0.3s;
  }
  & > .hide {
    @media (max-width: 1000px) {
      display: none;
    }
  }
  @media (max-width: 576px) {
    font-size: 0.5rem;
  }
`;
