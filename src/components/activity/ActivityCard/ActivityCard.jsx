import { MENU } from '../../../constants/menus';
import React, { useState } from 'react';
import {
  ActivityCardBlock,
  ActivityCardContainer,
  ActivityCapacity,
  StyledLink,
  ActivityTitle,
  ActivityClassHour,
  ActivityDate,
  ActivityHost,
  ActivityTags,
  ActivityTag,
  ActivityButtons,
  StyledActionButton,
  StyledDeleteButton,
} from './ActivityCard.styles.js';
import ActivityRegisterModalContainer from '../../../containers/activity/ActivityModalContainer/ActivityRegisterModalContainer';
import ActivityDeleteModalContainer from '../../../containers/activity/ActivityModalContainer/ActivityDeleteModalContainer';

const ActivityCard = ({
  activity,
  onToggleRegisterActivity,
  onDeleteActivity,
  isLogin,
  memberId,
}) => {
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

  const {
    id,
    title,
    host,
    startDate,
    classHour,
    capacity,
    available,
    tags,
  } = activity;
  return (
    <>
      <ActivityRegisterModalContainer
        visible={registerModalVisible}
        activityTitle={title}
        onConfirm={handleConfirm}
        onCancel={handleRegisterCancel}
        isRegister={!members.includes(memberId)}
      />
      <ActivityDeleteModalContainer
        visible={deleteModalVisible}
        activityTitle={title}
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
      />
      <ActivityCardBlock>
        <ActivityCardContainer>
          <StyledLink to={`/${MENU.ACTIVITY}/${id}`}>
            <ActivityTitle>{title}</ActivityTitle>
          </StyledLink>
          <ActivityClassHour>{classHour}</ActivityClassHour>
          <ActivityDate>{`${startDate} ~ `}</ActivityDate>
          <ActivityHost>{host.name}</ActivityHost>
          <ActivityCapacity>
            {isLogin && `${members.length}명/`}
            {!isLogin && '정원 '}
            {capacity}명
          </ActivityCapacity>
          <ActivityTags>
            {tags.map((tag) => (
              <ActivityTag key={tag.name}>#{tag.name}</ActivityTag>
            ))}
          </ActivityTags>
          {isLogin && (memberId === host.loginID || available) && (
            <ActivityButtons>
              {memberId === host.loginID && (
                <StyledActionButton to={`/${MENU.ACTIVITY}/edit/${id}`}>
                  관리
                </StyledActionButton>
              )}
              {memberId === host.loginID && (
                <StyledActionButton to={`/${MENU.ACTIVITY}/${id}/attendance`}>
                  출석
                </StyledActionButton>
              )}
              {memberId === host.loginID && (
                <StyledDeleteButton onClick={handleDeleteModalOpen}>
                  삭제
                </StyledDeleteButton>
              )}
              {available &&
                memberId !== host.loginID &&
                !members.includes(memberId) && (
                  <StyledActionButton onClick={handleRegisterModalOpen}>
                    신청
                  </StyledActionButton>
                )}
              {available &&
                memberId !== host.loginID &&
                members.includes(memberId) && (
                  <StyledActionButton onClick={handleRegisterModalOpen}>
                    신청 취소
                  </StyledActionButton>
                )}
            </ActivityButtons>
          )}
        </ActivityCardContainer>
      </ActivityCardBlock>
    </>
  );
};

export default ActivityCard;
