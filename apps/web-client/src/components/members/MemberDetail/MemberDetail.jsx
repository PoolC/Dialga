import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import ActivityCard from '../../activity/ActivityCard/ActivityCard';
import ProjectCard from '../../projects/ProjectCard/ProjectCard';
import {
  Activities,
  ActivityContainer,
  ContentContainer,
  Department,
  DepartmentContainer,
  ImageContainer,
  Introduction,
  IntroductionContainer,
  Name,
  NameContainer,
  Status,
  StyledImage,
  TextContainer,
} from './MemberDetail.styles';
import { getProfileImageUrl } from '~/lib/utils/getProfileImageUrl';
import Icon from '@ant-design/icons';

const MemberDetail = ({ member }) => {
  const {
    name,
    department,
    profileImageURL,
    isAdmin,
    introduction,
    projects,
    hostActivities,
    participantActivities,
  } = member;
  return (
    <Block>
      <WhiteBlock>
        <ContentContainer>
          <ImageContainer>
            <StyledImage src={getProfileImageUrl(profileImageURL)} />
          </ImageContainer>
          <TextContainer>
            <NameContainer>
              <Name>{name}</Name>
              {isAdmin && <Status>PoolC임원</Status>}
            </NameContainer>
            <DepartmentContainer>
              {department && (
                <>
                  <h2>전공</h2>
                  <Department>{department}</Department>
                </>
              )}
            </DepartmentContainer>
            <IntroductionContainer>
              {introduction && (
                <>
                  <Icon
                    component={QuoteLeftIcon}
                    style={{ fontSize: '16px', color: '#47be9b' }}
                  />
                  <Introduction>{introduction}</Introduction>
                  <Icon
                    component={QuoteRightIcon}
                    style={{ fontSize: '16px', color: '#47be9b' }}
                  />
                </>
              )}
            </IntroductionContainer>
          </TextContainer>
        </ContentContainer>
        <ActivityContainer>
          <h2>참여 활동</h2>
          <Activities>
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {hostActivities?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
            {participantActivities?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </Activities>
        </ActivityContainer>
      </WhiteBlock>
    </Block>
  );
};

const QuoteLeftIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"></path>
  </svg>
);

const QuoteRightIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z"></path>
  </svg>
);

export default MemberDetail;
