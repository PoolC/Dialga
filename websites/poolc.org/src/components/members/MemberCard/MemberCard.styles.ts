import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import colors from '../../../lib/styles/colors';

export const MemberCardBlock = styled.li`
  list-style: none;
  margin: 6px 5px;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.mint[1]};
  border-radius: 12px;
  width: 292px;
  height: 96px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.085);
  padding: 0px 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;

  &[data-admin='true'] {
    background: ${colors.mint[2]};
  }

  &:hover {
    opacity: 80%;
    transition: 0.3s;
  }
`;

export const MemberCardThumbnail = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 0 22px 0 10px;
`;

export const MemberCardText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const MemberCardNameRow = styled.div`
  display: flex;
  max-width: 100%;
  align-items: center;
  gap: 6px;
  margin-bottom: 0.35rem;
`;

export const MemberCardName = styled.p`
  display: block;
  overflow: hidden;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MemberCardMajor = styled.p`
  display: flex;
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 1.3;
  margin-bottom: 0;
`;

export const MemberCardStatus = styled.span`
  flex: 0 0 auto;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.55);
  color: ${colors.brown[1]};
  font-size: 0.68rem;
  font-weight: 500;
  line-height: 1.2;
  padding: 2px 6px;
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;
