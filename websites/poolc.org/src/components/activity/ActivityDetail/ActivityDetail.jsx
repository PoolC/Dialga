import { useState } from 'react';
// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Viewer } from '@dialga/react-editor';
import MemberCard from '../../members/MemberCard/MemberCard';
import SessionContainer from '../../../containers/activity/SessionContainer/SessionContainer';
import {
  ActivityFloatingRegisterButton,
  ButtonContainer,
  DetailContent,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailSection,
  DetailValue,
  EmptyFileState,
  Member,
  MemberContainer,
  PlanFileItem,
  PlanFileList,
  PlanFileMeta,
  PlanContainer,
  PlanContents,
  SectionTitle,
  SessionBlock,
  Sessions,
  StyledButton,
  SummaryCard,
  SummaryHeader,
  SummaryType,
  TagCard,
  TagList,
  Title,
} from './ActivityDetail.styles.js';
import getFileUrl, { getDecodedFileUrl } from '../../../lib/utils/getFileUrl';
import { FullText } from '../ActivityCard/ActivityCard.styles';
import ActivityRegisterModalContainer from '../../../containers/activity/ActivityModalContainer/ActivityRegisterModalContainer';
import Spinner from '../../common/Spinner/Spinner';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';
import { PagePanel, PageShell } from '../../common/PageLayout/PageLayout';

const Tag = ({ tag }) => <TagCard>#{tag}</TagCard>;

const ActivityDetail = ({ loading, activity, activityMembers, activityMemberIDs, activitySessions, member, onToggleRegisterActivity }) => {
  const {
    status: { isLogin },
    user: { memberId, role },
  } = member;

  const [members, setMembers] = useState(activityMembers);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const memberCount = activityMemberIDs?.length ?? 0;
  const isFull = activity ? memberCount >= activity.capacity : false;
  const showRegisterActions = activity?.available && isLogin && isAuthorizedRole(role);
  const isHost = activity && memberId === activity.host.loginID;
  const isRegistered = activityMemberIDs?.includes(memberId);
  const canRegister = showRegisterActions && !isHost && !isRegistered && !isFull;
  const canCancelRegistration = showRegisterActions && !isHost && isRegistered;
  const hasMobileRegisterAction = canRegister || canCancelRegistration;

  const handleRegisterModalOpen = () => {
    setRegisterModalVisible(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    onToggleRegisterActivity(activity.id, members, setMembers);
    setRegisterModalVisible(false);
  };

  const handleRegisterCancel = () => {
    setRegisterModalVisible(false);
  };

  return (
    <>
      {!loading && (
        <ActivityRegisterModalContainer
          visible={registerModalVisible}
          activityTitle={activity.title}
          onConfirm={handleConfirm}
          onCancel={handleRegisterCancel}
          isRegister={!activityMemberIDs?.includes(memberId)}
        />
      )}
      <PageShell>
        <PagePanel>
          {loading && <Spinner />}
          {!loading && (
            <DetailContent data-has-register-action={hasMobileRegisterAction}>
              <SummaryCard>
                <SummaryHeader>
                  <SummaryType>{activity.seminar ? '세미나' : '스터디'}</SummaryType>
                  {!activity.available && <SummaryType data-muted>마감</SummaryType>}
                  {activity.available && isFull && <SummaryType data-muted>정원 마감</SummaryType>}
                  {activity.available && !isFull && <SummaryType>신청 가능</SummaryType>}
                </SummaryHeader>
                <Title>{activity.title}</Title>
                {showRegisterActions && (
                  <ButtonContainer>
                    {canRegister && <StyledButton onClick={handleRegisterModalOpen}>신청하기</StyledButton>}
                    {activity.available && !isHost && !isRegistered && isFull && <FullText>[정원 마감]</FullText>}
                    {canCancelRegistration && <StyledButton onClick={handleRegisterModalOpen}>신청 취소</StyledButton>}
                  </ButtonContainer>
                )}
              </SummaryCard>
              {hasMobileRegisterAction && (
                <ActivityFloatingRegisterButton>
                  <StyledButton onClick={handleRegisterModalOpen}>{canCancelRegistration ? '신청 취소' : '신청하기'}</StyledButton>
                </ActivityFloatingRegisterButton>
              )}
              <DetailSection>
                <SectionTitle>운영 정보</SectionTitle>
                <DetailGrid>
                  <DetailItem>
                    <DetailLabel>{activity.seminar ? '세미나장' : '스터디장'}</DetailLabel>
                    <DetailValue>{activity.host.name}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>시작일</DetailLabel>
                    <DetailValue>{activity.startDate}</DetailValue>
                  </DetailItem>
                  <DetailItem data-wide>
                    <DetailLabel>진행 시간</DetailLabel>
                    <DetailValue>{activity.classHour}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>회차 시간</DetailLabel>
                    <DetailValue>{activity.hour}시간씩 진행</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>정원</DetailLabel>
                    <DetailValue>
                      {isLogin && `${memberCount}명 / `}
                      {activity.capacity}명
                    </DetailValue>
                  </DetailItem>
                  <DetailItem data-wide>
                    <DetailLabel>태그</DetailLabel>
                    <TagList data-compact>
                      {activity.tags.map((tag) => (
                        <Tag key={tag.name} tag={tag.name} />
                      ))}
                    </TagList>
                  </DetailItem>
                </DetailGrid>
              </DetailSection>
              <PlanContainer>
                <SectionTitle>계획서</SectionTitle>
                <PlanContents>
                  <Viewer initialValue={activity.description} key={activity.description} />
                </PlanContents>
                <PlanFileMeta>
                  <DetailLabel>첨부파일</DetailLabel>
                  <DetailValue>{activity.fileList?.length ?? 0}개</DetailValue>
                </PlanFileMeta>
                {activity.fileList?.length !== 0 ? (
                  <PlanFileList>
                    {activity.fileList?.map((file) => (
                      <PlanFileItem key={file}>
                        <a href={getFileUrl(file)}>{getDecodedFileUrl(file)}</a>
                      </PlanFileItem>
                    ))}
                  </PlanFileList>
                ) : (
                  <EmptyFileState>첨부된 파일 없음</EmptyFileState>
                )}
              </PlanContainer>
              {isLogin && isAuthorizedRole(role) && (
                <MemberContainer>
                  <SectionTitle>참여 멤버</SectionTitle>
                  <Member>
                    {activityMembers?.map((member) => (
                      <MemberCard key={member.loginID} member={member} />
                    ))}
                  </Member>
                </MemberContainer>
              )}
              <SessionBlock>
                <SectionTitle>회차 정보</SectionTitle>
                <Sessions>
                  {activitySessions?.map((session) => (
                    <SessionContainer key={session.id} session={session} activityID={activity.id} host={activity.host} role={role} />
                  ))}
                </Sessions>
              </SessionBlock>
            </DetailContent>
          )}
        </PagePanel>
      </PageShell>
    </>
  );
};

export default ActivityDetail;
