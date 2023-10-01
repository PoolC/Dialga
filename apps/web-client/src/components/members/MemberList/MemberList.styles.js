import styled from '@emotion/styled';

export const MemberListHeader = styled.header`
  display: flex;
  max-width: 1200px;
  justify-content: center;
  margin-bottom: 50px;
  & > .member_list_title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-weight: 700;
  }
`;

export const StyledMemberList = styled.ul`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
