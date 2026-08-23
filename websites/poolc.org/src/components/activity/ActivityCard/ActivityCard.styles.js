import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

export const ActivityCardBlock = styled.li`
  list-style: none;
  margin: 0;
`;

export const ActivityCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${colors.mint[0]};
  border-radius: 12px;
  width: 292px;
  height: 262px;
  box-shadow: 0px 0px 10px ${colors.gray[1]};
  transition: 0.2s;
  padding: 18px 16px 14px;
  box-sizing: border-box;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 8px 18px ${colors.gray[2]};
    transition: 0.2s;
  }
`;

export const ActivityCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 24px;
  margin-bottom: 12px;
`;

export const ActivityType = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  background-color: #ffffff;
  color: ${colors.mint[3]};
  font-size: 0.75rem;
  font-weight: 800;
`;

export const ActivityTitle = styled.p`
  display: -webkit-box;
  height: 2.8rem;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: 800;
  font-size: 1.1rem;
  word-break: keep-all;
  text-align: left;
  line-height: 1.4rem;
  margin: 0;
`;

export const ActivityMetaGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  min-height: 1.25rem;
  margin-top: 14px;
  color: ${colors.brown[0]};
  font-size: 0.8rem;
  line-height: 1.25rem;

  & + & {
    margin-top: 6px;
  }
`;

export const ActivityClassHour = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::before {
    content: '·';
    margin-right: 10px;
    color: ${colors.brown[0]};
  }
`;

export const ActivityDate = styled.p`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

export const ActivityCapacity = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin: 0;
  font-weight: 700;
`;

export const ActivityHost = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin: 0;
`;

export const ActivityMetaLabel = styled.span`
  color: ${colors.brown[0]};
  font-weight: 500;
`;

export const ActivityMetaValue = styled.span`
  color: ${colors.brown[1]};
  font-weight: 700;
`;

export const ActivityStatus = styled.p`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 4px 8px;
  border-radius: 999px;
  background-color: ${colors.gray[0]};
  color: ${colors.brown[0]};
  font-size: 0.75rem;
  font-weight: 800;
`;

export const ActivityTags = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  max-height: 42px;
  min-height: 42px;
  overflow: hidden;
  margin-top: 14px;
`;

export const ActivityTag = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: ${colors.brown[0]};
  margin: 0;
  background-color: ${colors.gray[0]};
  padding: 2px 5px;
  border: 1px solid ${colors.mint[1]};
  border-radius: 4px;
`;

export const ActivityButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-height: 36px;
  margin-top: auto;
  padding-top: 10px;
`;

export const StyledActionButton = styled(ActionButton)`
  margin: 0;
`;

export const StyledDeleteButton = styled(ActionButton)`
  margin: 0;
  border: 1px solid ${colors.red[1]};
  background-color: transparent;
  color: ${colors.red[1]};
  box-shadow: none;
  transition: 0.2s;
  &:hover {
    background-color: rgba(252, 118, 118, 0.12);
    transition: 0.2s;
  }
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
  width: 100%;
  margin: 0;
  text-decoration: none;

  &:hover {
    color: ${colors.brown[1]};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const FullText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  font-weight: 300;
  font-size: 0.8rem;
  margin: 0;
  color: ${colors.brown[0]};
`;
