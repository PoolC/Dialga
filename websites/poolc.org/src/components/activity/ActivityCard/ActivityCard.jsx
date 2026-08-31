import { useState } from 'react';
import { MENU } from '../../../constants/menus';
import {
  ActivityButtons,
  ActivityCapacity,
  ActivityCardBlock,
  ActivityCardContainer,
  ActivityCardHeader,
  ActivityClassHour,
  ActivityDate,
  ActivityHost,
  ActivityMetaGroup,
  ActivityMetaLabel,
  ActivityMetaValue,
  ActivityStatus,
  ActivityTag,
  ActivityTags,
  ActivityTitle,
  ActivityType,
  FullText,
  StyledActionButton,
  StyledDeleteButton,
  StyledLink,
} from './ActivityCard.styles.js';
import ActivityRegisterModalContainer from '../../../containers/activity/ActivityModalContainer/ActivityRegisterModalContainer';
import ActivityDeleteModalContainer from '../../../containers/activity/ActivityModalContainer/ActivityDeleteModalContainer';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const ActivityCard = ({ activity, onToggleRegisterActivity, onDeleteActivity, isLogin, memberId, role }) => {
  const [members, setMembers] = useState(activity.memberLoginIds);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleRegisterModalOpen = () => {
    setRegisterModalVisible(true);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onToggleRegisterActivity(id, members, setMembers);
    setRegisterModalVisible(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDeleteActivity(id);
  };

  const handleRegisterCancel = () => {
    setRegisterModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const { id, title, host, startDate, classHour, capacity, available, tags } = activity;
  const isFull = members.length >= capacity;
  const isOpen = available && !isFull;
  const statusText = isFull ? '정원 마감' : '마감';

  return (
    <>
      <ActivityRegisterModalContainer visible={registerModalVisible} activityTitle={title} onConfirm={handleConfirm} onCancel={handleRegisterCancel} isRegister={!members.includes(memberId)} />
      <ActivityDeleteModalContainer visible={deleteModalVisible} activityTitle={title} onConfirm={handleDelete} onCancel={handleDeleteCancel} />
      <ActivityCardBlock>
        <ActivityCardContainer>
          <ActivityCardHeader>
            <ActivityType>{activity.seminar ? '세미나' : '스터디'}</ActivityType>
            {!isOpen && <ActivityStatus>{statusText}</ActivityStatus>}
          </ActivityCardHeader>
          <StyledLink to={`/${MENU.ACTIVITY}/${id}`}>
            <ActivityTitle>{title}</ActivityTitle>
          </StyledLink>
          <ActivityMetaGroup data-card-meta="schedule">
            <ActivityDate>{`${startDate} 시작`}</ActivityDate>
            {classHour && <ActivityClassHour>{classHour}</ActivityClassHour>}
          </ActivityMetaGroup>
          <ActivityMetaGroup data-card-meta="operation">
            <ActivityHost>
              <ActivityMetaLabel>진행</ActivityMetaLabel>
              <ActivityMetaValue>{host.name}</ActivityMetaValue>
            </ActivityHost>
            <ActivityCapacity>
              <ActivityMetaLabel>정원</ActivityMetaLabel>
              <ActivityMetaValue>
                {isLogin && `${members.length} / `}
                {capacity}명
              </ActivityMetaValue>
            </ActivityCapacity>
          </ActivityMetaGroup>
          <ActivityTags>
            {tags.map((tag) => (
              <ActivityTag key={tag.name}>#{tag.name}</ActivityTag>
            ))}
          </ActivityTags>
          {isLogin && isAuthorizedRole(role) && (
            <ActivityButtons>
              {memberId === host.loginID && <StyledActionButton to={`/${MENU.ACTIVITY}/edit/${id}`}>관리</StyledActionButton>}
              {memberId === host.loginID && <StyledActionButton to={`/${MENU.ACTIVITY}/${id}/attendance`}>출석</StyledActionButton>}
              {memberId === host.loginID && <StyledDeleteButton onClick={handleDeleteModalOpen}>삭제</StyledDeleteButton>}
              {available && memberId !== host.loginID && !members.includes(memberId) && !isFull && <StyledActionButton onClick={handleRegisterModalOpen}>신청</StyledActionButton>}
              {available && memberId !== host.loginID && !members.includes(memberId) && isFull && <FullText>[정원 마감]</FullText>}
              {available && memberId !== host.loginID && members.includes(memberId) && <StyledActionButton onClick={handleRegisterModalOpen}>신청 취소</StyledActionButton>}
              {!available && memberId !== host.loginID && <FullText>마감</FullText>}
            </ActivityButtons>
          )}
        </ActivityCardContainer>
      </ActivityCardBlock>
    </>
  );
};

export default ActivityCard;
