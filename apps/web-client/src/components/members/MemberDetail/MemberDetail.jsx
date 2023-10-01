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
                  <span>
                    <i className="fas fa-quote-left"></i>
                  </span>
                  <Introduction>{introduction}</Introduction>
                  <span>
                    <i className="fas fa-quote-right"></i>
                  </span>
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

export default MemberDetail;
