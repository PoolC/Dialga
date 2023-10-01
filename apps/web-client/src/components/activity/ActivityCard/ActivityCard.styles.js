import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';

export const ActivityCardBlock = styled.li`
  list-style: none;
  margin: 10px 5px;
`;

export const ActivityCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mint[0]};
  border-radius: 20px;
  width: 260px;
  height: 230px;
  box-shadow: 0px 0px 10px ${colors.gray[1]};
  cursor: pointer;
  transition: 0.3s;
  padding: 0px 10px 0 10px;
  &:hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

export const ActivityTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  font-weight: 600;
  font-size: 1.25rem;
  word-break: keep-all;
  text-align: center;
  line-height: 1.4rem;
  margin-top: 10px;
`;

export const ActivityClassHour = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 0.8rem;
`;

export const ActivityCapacity = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1.5;
  font-weight: 300;
  font-size: 0.8rem;
`;

export const ActivityDate = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-weight: 300;
  font-size: 0.8rem;
`;

export const ActivityHost = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-weight: 300;
  font-size: 0.8rem;
`;

export const ActivityTags = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  flex: 2;
`;

export const ActivityTag = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: ${colors.brown[0]};
  margin: 1px 3px;
  background-color: ${colors.gray[0]};
  padding: 2px 3px;
  border: 1px solid ${colors.mint[1]};
  border-radius: 2px;
`;

export const ActivityButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  margin: 0.2rem 0;
`;

export const StyledActionButton = styled(ActionButton)`
  margin: 0 8px;
`;

export const StyledDeleteButton = styled(ActionButton)`
  margin: 0 8px;
  background-color: ${colors.red[1]};
  transition: 0.3s;
  &:hover {
    background-color: ${colors.red[0]};
    transition: 0.3s;
  }
`;

export const StyledLink = styled(Link)`
  color: ${colors.brown[1]};
  margin: 10px 0;
`;

export const FullText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  font-weight: 300;
  font-size: 0.8rem;
`;
