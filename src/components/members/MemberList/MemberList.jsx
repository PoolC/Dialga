import React from 'react';
import styled from 'styled-components';
import colors from '../../../lib/styles/colors';
import MemberCard from '../MemberCard/MemberCard';

const MemberListBlock = styled.div`
  position: relative;
  top: 0px;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0px 0 300px 0;
  @media (max-width: 576px) {
    margin-bottom: 500px;
  }
`;

const MemberListContainer = styled.div`
  width: 100%;
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 20px ${colors.gray[1]};
  border-radius: 50px;
  padding: 40px 40px 60px 40px;
`;

const MemberListHeader = styled.header`
  display: flex;
  max-width: 1200px;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: 50px;
  & > .member_list_title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-weight: 700;
  }
`;

const StyledMemberList = styled.ul`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MemberList = ({ members }) => {
  return (
    <MemberListBlock>
      <MemberListContainer>
        <MemberListHeader>
          <h2 className="member_list_title">회원 목록</h2>
        </MemberListHeader>
        <StyledMemberList>
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </StyledMemberList>
      </MemberListContainer>
    </MemberListBlock>
  );
};

export default MemberList;
