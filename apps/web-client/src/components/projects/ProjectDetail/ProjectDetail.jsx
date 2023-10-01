import MemberCard from '../../members/MemberCard/MemberCard';
import {
  BodyContainer,
  Duration,
  DurationContainer,
  Genre,
  GenreContainer,
  ImageContainer,
  Introduction,
  IntroductionContainer,
  MemberContainer,
  Members,
  Name,
  NameContainer,
  StyledImage,
  TextContainer,
} from './ProjectDetail.styles';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import getFileUrl from '../../../lib/utils/getFileUrl';
import { Viewer } from '@toast-ui/react-editor';

const ProjectDetail = ({ project, member }) => {
  const { thumbnailURL, name, genre, duration, body, members } = project;

  const {
    status: { isLogin },
  } = member;

  return (
    <Block>
      <WhiteBlock>
        <ImageContainer>
          <StyledImage src={getFileUrl(thumbnailURL)} />
        </ImageContainer>
        <TextContainer>
          <NameContainer>
            <Name>{name}</Name>
          </NameContainer>
          <GenreContainer>
            <Genre>{genre}</Genre>
          </GenreContainer>
          <DurationContainer>
            <Duration>{duration}</Duration>
          </DurationContainer>
          <IntroductionContainer>
            <Introduction>
              <BodyContainer className="here">
                <Viewer initialValue={body} />
              </BodyContainer>
            </Introduction>
          </IntroductionContainer>
        </TextContainer>
        {isLogin && (
          <MemberContainer>
            <h2>참여 멤버</h2>
            <Members>
              {members.map((member) => (
                <MemberCard key={member.loginID} member={member} />
              ))}
            </Members>
          </MemberContainer>
        )}
      </WhiteBlock>
    </Block>
  );
};

export default ProjectDetail;
