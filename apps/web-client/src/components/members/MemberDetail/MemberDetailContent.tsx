import Icon, { MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Popconfirm } from 'antd';
import { useHistory } from 'react-router';
import ActivityCard from '~/components/activity/ActivityCard/ActivityCard';
import ProjectCard from '~/components/projects/ProjectCard/ProjectCard';
import getFileUrl from '~/lib/utils/getFileUrl';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import {
  ContentContainer,
  ImageContainer,
  StyledImage,
  TextContainer,
  NameContainer,
  Name,
  Status,
  DepartmentContainer,
  Department,
  IntroductionContainer,
  Introduction,
  ActivityContainer,
  Activities,
} from './MemberDetailContent.styles';
import { ConversationControllerService, MemberControllerService, MemberResponse, queryKey, useAppMutation, useAppSuspeneseQueries } from '~/lib/api-v2';
import { MENU } from '~/constants/menus';

export default function MemberDetailContent({ loginId }: { loginId: string }) {
  const history = useHistory();
  const [{ data: _member }, { data: me }] = useAppSuspeneseQueries({
    queries: [
      {
        queryKey: queryKey.member.id(loginId),
        queryFn: () => MemberControllerService.getMemberWithProjectAndActivityUsingGet({ loginId }),
      },
      {
        queryKey: queryKey.member.me,
        queryFn: MemberControllerService.getMeUsingGet,
      },
    ],
  });

  const member = _member as unknown as Required<MemberResponse>;

  const { mutate } = useAppMutation({
    mutationFn: () =>
      ConversationControllerService.createConversationUsingPost({
        request: {
          otherLoginID: member.loginID,
        },
      }),
  });

  const onStartConversation = () => {
    mutate(undefined, {
      onSuccess: ({ id }) => {
        history.push(`/${MENU.MESSAGE}/${id}/${MENU.MESSAGE_FORM}`);
      },
    });
  };

  return (
    <>
      <ContentContainer>
        <ImageContainer>
          <StyledImage src={getProfileImageUrl(member.profileImageURL)} />
        </ImageContainer>
        <TextContainer>
          <NameContainer>
            <Name>{member.name}</Name>
            {member.isAdmin && <Status>PoolC임원</Status>}
            {member.badge && <Avatar src={getFileUrl(member.badge.imageUrl)} size={60} />}
            {member.loginID !== me.loginID && (
              <Popconfirm title={`${member.name}님과 대화하기`} description={`${member.name}님과의 대화를 시작할까요?`} okText="네" cancelText="아니요" onConfirm={onStartConversation}>
                <Button shape="circle" icon={<MessageOutlined />} type="primary" />
              </Popconfirm>
            )}
          </NameContainer>
          <DepartmentContainer>
            {member.department && (
              <>
                <h2>전공</h2>
                <Department>{member.department}</Department>
              </>
            )}
          </DepartmentContainer>
          <IntroductionContainer>
            {member.introduction && (
              <>
                <Icon component={QuoteLeftIcon} style={{ fontSize: '16px', color: '#47be9b' }} />
                <Introduction>{member.introduction}</Introduction>
                <Icon component={QuoteRightIcon} style={{ fontSize: '16px', color: '#47be9b' }} />
              </>
            )}
          </IntroductionContainer>
        </TextContainer>
      </ContentContainer>
      <ActivityContainer>
        <h2>참여 활동</h2>
        <Activities>
          {member.projects?.map((project) => <ProjectCard key={project.id} project={project} />)}
          {/* TODO: fill undefined props */}
          {member.hostActivities?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} onToggleRegisterActivity={undefined} onDeleteActivity={undefined} isLogin={undefined} memberId={undefined} role={undefined} />
          ))}
          {/* TODO: fill undefined props */}
          {member.participantActivities?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} onToggleRegisterActivity={undefined} onDeleteActivity={undefined} isLogin={undefined} memberId={undefined} role={undefined} />
          ))}
        </Activities>
      </ActivityContainer>
    </>
  );
}

const QuoteLeftIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
  </svg>
);

const QuoteRightIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z" />
  </svg>
);
