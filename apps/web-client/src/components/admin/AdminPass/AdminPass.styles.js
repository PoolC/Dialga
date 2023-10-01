import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

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
  margin: 2rem 0 4rem 0;
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
    font-size: 0.7rem;
  }
  & > .name {
    width: 3rem;
  }
  & > .department {
    width: 5rem;
  }
  & > .studentId {
    width: 4rem;
  }
  @media (max-width: 576px) {
    font-size: 0.5rem;
  }
  & > .hide {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

export const MemberListRow = styled.tr`
  cursor: pointer;
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
    font-size: 0.7rem;
    @media (max-width: 576px) {
      font-size: 0.5rem;
    }
    & > button {
      @media (max-width: 576px) {
        font-size: 0.5rem;
        margin: 0;
      }
    }
  }
  & > .name {
    width: 3rem;
  }
  & > .department {
    width: 5rem;
  }
  & > .studentId {
    width: 4rem;
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
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
  & > label {
    margin-right: 0.5rem;
    font-size: 0.9rem;
  }
  & > input {
    margin-bottom: 1rem;
  }
  & > div {
    & > input {
      margin: 0 0.5rem 1rem 0;
    }
    & > span {
      font-size: 0.8rem;
    }
  }
  & > button {
    width: 5rem;
  }
`;

export const StyledInput = styled.input`
  outline: 0;
  height: 1.8rem;
  width: 3rem;

  outline: 0;
  border: 1px solid ${colors.brown[0]};
  border-radius: 2px;
  outline: ${colors.gray[1]};
`;

export const CurrentLimit = styled.div`
  margin-bottom: 0.5rem;
`;

export const ExpellActionButton = styled(ActionButton)`
  background-color: ${colors.red[1]};
  &:hover {
    background-color: ${colors.red[0]};
  }
`;
