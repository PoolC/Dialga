import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import { Link } from 'react-router-dom';

export const MemberCardBlock = styled.li`
  list-style: none;
  margin: 5px;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  width: 240px;
  height: 90px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.085);
  padding: 0px 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 80%;
    transition: 0.3s;
  }
`;

export const MemberCardThumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 20px 0 10px;
`;

export const MemberCardText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MemberCardName = styled.p`
  display: flex;
  align-items: flex-end;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const MemberCardMajor = styled.p`
  display: flex;
  font-size: 0.8rem;
  font-weight: 300;
  margin-bottom: 0.3rem;
`;

export const MemberCardStatus = styled.span`
  display: flex;
  font-size: 0.7rem;
  font-weight: 300;
  margin-left: 0.5rem;
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
