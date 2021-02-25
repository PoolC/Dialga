import { MENU } from '../../../constants/menus';
import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';
import ActivityCard from '../ActivityCard/ActivityCard';
import React from 'react';
import styled from 'styled-components';

const ActivityListBlock = styled.div`
  position: relative;
  top: 0px;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0;
`;

const List = styled.ul`
  width: 95%;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
`;

const ActivityListContainer = styled.div`
  width: 100%;
  min-height: 90vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 20px ${colors.gray[1]};
  border-radius: 50px;
  padding: 0px 0px 40px 0px;
`;

const ActivityListTitle = styled.h3`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

const ActivityListHeader = styled.header`
  display: flex;
  width: 83%;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 40px 0 10px 0;
`;

const Description = styled.div`
  display: flex;
  width: 83%;
  margin: 0px 0 40px 0;
  font-size: 0.8rem;
  color: ${colors.brown[0]};
  word-break: keep-all;
  line-height: 1.2rem;
  @media (max-width: 576px) {
    text-align: center;
  }
`;

const ActivityList = ({ activities, onToggleRegisterActivity }) => {
  return (
    <>
      <ActivityListBlock>
        <ActivityListContainer className="hi">
          <ActivityListHeader>
            <ActivityListTitle>세미나&스터디</ActivityListTitle>
            <ActionButton to={`/${MENU.ACTIVITY}/create`}>개설</ActionButton>
          </ActivityListHeader>
          <Description>상세 내용을 보려면 각 제목을 클릭해주세요.</Description>
          <List>
            {activities.map((activity) => (
              <ActivityCard
                onToggleRegisterActivity={onToggleRegisterActivity}
                key={activity.id}
                activity={activity}
              />
            ))}
          </List>
        </ActivityListContainer>
      </ActivityListBlock>
    </>
  );
};

export default ActivityList;
