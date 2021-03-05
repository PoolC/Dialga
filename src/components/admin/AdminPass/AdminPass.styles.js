import styled from 'styled-components';
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
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
  background-color: ${colors.mint[0]};
  margin: 0;
  padding: 0.8rem 0px;
  font-size: 0.9rem;
  & > .member_list_head {
    flex: 1;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MemberListRow = styled.tr`
  cursor: default;
  display: flex;
  padding: 0.5rem 0;
  transition: 0.3s;
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
  & > .member-list-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 10px;
    line-height: 1.5rem;
    font-size: 0.8rem;
  }
  &:hover {
    background-color: ${colors.gray[0]};
    transition: 0.3s;
  }
`;

export const StyledForm = styled.form`
  margin-bottom: 0.5rem;
  & > label {
    margin-right: 0.5rem;
  }
  & > span {
    margin-left: 0.5rem;
  }
`;

export const StyledInput = styled.input`
  outline: 0;
  height: 1.8rem;
  width: 3rem;
`;

export const CurrentLimit = styled.div`
  margin-bottom: 0.5rem;
`;
