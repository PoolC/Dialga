import MemberCard from '../../members/MemberCard/MemberCard';
import { useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import SessionContainer from '../../../containers/activity/SessionContainer/SessionContainer';
import {
  ButtonContainer,
  Content,
  ContentContainer,
  Member,
  MemberContainer,
  PlanContainer,
  PlanContents,
  SessionBlock,
  Sessions,
  StyledButton,
  TagCard,
  TagContainer,
  TagList,
  Title,
  TitleContainer,
} from './ActivityDetail.styles.js';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import {
  File,
  FileContainer,
  FileContainerTitle,
} from '~/components/board-legacy/PostForm/PostForm.styles';
import getFileUrl, { getDecodedFileUrl } from '../../../lib/utils/getFileUrl';
import { FullText } from '../ActivityCard/ActivityCard.styles';
import ActivityRegisterModalContainer from '../../../containers/activity/ActivityModalContainer/ActivityRegisterModalContainer';
import Spinner from '../../common/Spinner/Spinner';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const Tag = ({ tag }) => {
  return <TagCard>#{tag}</TagCard>;
};

const ActivityDetail = ({
  loading,
  activity,
  activityMembers,
  activityMemberIDs,
  activitySessions,
  member,
  onToggleRegisterActivity,
}) => {
  const {
    status: { isLogin },
    user: { memberId, role },
  } = member;

  const [members, setMembers] = useState(activityMembers);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

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
      <Block>
        <WhiteBlock>
          {loading && <Spinner />}
          {!loading && (
            <>
              <TitleContainer>
                <Title>{activity.title}</Title>
              </TitleContainer>
              <ContentContainer>
                <h2>{activity.seminar ? '세미나장' : '스터디장'}</h2>
                <Content>{activity.host.name}</Content>
              </ContentContainer>
              <ContentContainer>
                <h2>시작일</h2>
                <Content>{activity.startDate}</Content>
              </ContentContainer>
              <ContentContainer>
                <h2>시간</h2>
                <Content>{activity.classHour}</Content>
                <Content>{activity.hour}시간씩 진행</Content>
              </ContentContainer>
              <ContentContainer>
                <h2>정원</h2>
                <Content>
                  {isLogin && `${activityMemberIDs?.length}명/`}
                  {activity.capacity}명
                </Content>
              </ContentContainer>
              <TagContainer>
                <h2>태그</h2>
                <TagList>
                  {activity.tags.map((tag) => (
                    <Tag key={tag.name} tag={tag.name} />
                  ))}
                </TagList>
              </TagContainer>
              {activity.available && isLogin && isAuthorizedRole(role) && (
                <ButtonContainer>
                  {activity.available &&
                    memberId !== activity.host.loginID &&
                    !activityMemberIDs?.includes(memberId) &&
                    activityMemberIDs?.length < activity.capacity && (
                      <StyledButton onClick={handleRegisterModalOpen}>
                        신청
                      </StyledButton>
                    )}
                  {activity.available &&
                    memberId !== activity.host.loginID &&
                    !activityMemberIDs?.includes(memberId) &&
                    activityMemberIDs?.length >= activity.capacity && (
                      <FullText>[정원 마감]</FullText>
                    )}
                  {activity.available &&
                    memberId !== activity.host.loginID &&
                    activityMemberIDs?.includes(memberId) && (
                      <StyledButton onClick={handleRegisterModalOpen}>
                        신청 취소
                      </StyledButton>
                    )}
                </ButtonContainer>
              )}
              <PlanContainer>
                <h2 className="title">계획서</h2>
                <PlanContents>
                  <Viewer initialValue={activity.description} />
                </PlanContents>
                <FileContainerTitle>첨부된 파일 목록</FileContainerTitle>
                <FileContainer>
                  {activity.fileList?.length !== 0
                    ? activity.fileList?.map((file) => (
                        <File key={file}>
                          <a href={getFileUrl(file)}>
                            {getDecodedFileUrl(file)}
                          </a>
                        </File>
                      ))
                    : '첨부된 파일 없음'}
                </FileContainer>
              </PlanContainer>
              {isLogin && isAuthorizedRole(role) && (
                <MemberContainer>
                  <h2>참여 멤버</h2>
                  <Member>
                    {activityMembers?.map((member) => (
                      <MemberCard key={member.loginID} member={member} />
                    ))}
                  </Member>
                </MemberContainer>
              )}
              <SessionBlock>
                <h2>회차 정보</h2>
                <Sessions>
                  {activitySessions?.map((session) => (
                    <SessionContainer
                      key={session.id}
                      session={session}
                      activityID={activity.id}
                      host={activity.host}
                      role={role}
                    />
                  ))}
                </Sessions>
              </SessionBlock>
            </>
          )}
        </WhiteBlock>
      </Block>
    </>
  );
};

export default ActivityDetail;
