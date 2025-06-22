import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 1rem;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  background-color: ${colors.mint[0]};
  margin: 0;
  padding: 0.8rem 0px;
  font-size: 0.6rem;
  text-align: center;
  @media (max-width: 576px) {
    font-size: 0.5rem;
  }
  & > .member_list_head {
    /* flex: 1; */
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
  }
  & > .name {
    width: 3rem;
  }
  & > .department {
    width: 6rem;
  }
  & > .studentId {
    width: 4rem;
  }
  & > .loginId {
    width: 4rem;
  }
  & > .email {
    width: 9rem;
  }
  & > .phone {
    width: 5rem;
  }
  & > .isActivated {
    width: 1.5rem;
  }
  & > .small-button {
    width: 3rem;
  }
  & > .isAdmin {
    width: 2rem;
  }
  & > .status {
    flex: 1;
    min-width: 7.5rem;
  }
  & > .hide {
    @media (max-width: 1000px) {
      display: none;
    }
  }
`;

export const MemberSearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    width: 10rem;
  }
`;

export const MemberListRow = styled.tr`
  cursor: pointer;
  display: flex;
  padding: 0.5rem 0;
  transition: 0.3s;
  text-align: center;
  & > .member-list-row {
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    line-height: 0.8rem;
    font-size: 0.6rem;
    font-weight: 300;
    @media (max-width: 576px) {
      font-size: 0.5rem;
    }
  }
  & > .name {
    width: 3rem;
    font-weight: 500;
  }
  & > .department {
    width: 6rem;
  }
  & > .studentId {
    width: 4rem;
  }
  & > .loginId {
    width: 4rem;
  }
  & > .email {
    width: 9rem;
  }
  & > .phone {
    width: 5rem;
  }
  & > .isActivated {
    width: 1.5rem;
  }
  & > .small-button {
    width: 3rem;
  }
  & > .isAdmin {
    width: 2rem;
  }
  & > .status {
    min-width: 7.5rem;
    flex: 1;
  }
  & > .hide {
    @media (max-width: 1000px) {
      display: none;
    }
  }
  &:hover {
    background-color: ${colors.gray[0]};
    transition: 0.3s;
  }
`;

export const StyledActionButton = styled(ActionButton)`
  margin: 0;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  &.delete {
    background-color: ${colors.red[1]};
    transition: 0.3s;
    &:hover {
      background-color: ${colors.red[0]};
      transition: 0.3s;
    }
  }
  @media (max-width: 576px) {
    padding: 5px;
    font-size: 0.7rem;
  }
`;

export const StyledSelect = styled.select`
  outline: 0;
  height: 1.5rem;
  width: 4.5rem;
  font-size: 0.4rem;
  box-sizing: content-box;
`;

export const SearchHeader = styled.h4`
  margin: 2rem 0 1rem 0;
`;

export const SearchResult = styled.p`
  margin: 1rem 0 2rem 0;
  font-size: 0.8rem;
  font-weight: 300;
`;
