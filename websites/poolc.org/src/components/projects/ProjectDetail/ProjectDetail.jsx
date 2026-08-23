// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Viewer } from '@dialga/react-editor';
import MemberCard from '../../members/MemberCard/MemberCard';
import {
  BodyContainer,
  Duration,
  Hero,
  ImageContainer,
  Introduction,
  IntroductionContainer,
  Meta,
  MetaGenre,
  MemberContainer,
  Members,
  Name,
  NameContainer,
  StyledImage,
  TextContainer,
} from './ProjectDetail.styles';
import { PagePanel, PageShell } from '../../common/PageLayout/PageLayout';
import getFileUrl from '../../../lib/utils/getFileUrl';

const getProjectPlaceholder = (id) => `https://picsum.photos/seed/poolc-project-detail-${id}/1200/675`;

const getProjectThumbnail = ({ id, thumbnailURL }) => {
  if (!thumbnailURL) {
    return getProjectPlaceholder(id);
  }

  return getFileUrl(thumbnailURL);
};

const normalizeProjectBody = (body) =>
  (body ?? '')
    .replace(/(드라이브 링크\s*:\s*)(https?:\/\/\S+)/g, '[$1]($2)')
    .replace(/(^|\s)(https?:\/\/\S+)/g, (match, prefix, url) => {
      if (match.includes('](')) {
        return match;
      }

      return `${prefix}[결과물 보기](${url})`;
    });

const ProjectDetail = ({ project, member }) => {
  const { id, thumbnailURL, name, genre, duration, body, members } = project;
  const projectMembers = members ?? [];

  const {
    status: { isLogin },
  } = member;

  return (
    <PageShell>
      <PagePanel>
        <Hero>
          <ImageContainer>
            <StyledImage
              src={getProjectThumbnail({ id, thumbnailURL })}
              alt={name}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getProjectPlaceholder(id);
              }}
            />
          </ImageContainer>
          <TextContainer>
            <NameContainer>
              <Name>{name}</Name>
            </NameContainer>
            <Meta>
              <MetaGenre>{genre}</MetaGenre>
              <span aria-hidden="true">·</span>
              <Duration>{duration}</Duration>
            </Meta>
          </TextContainer>
        </Hero>
        <IntroductionContainer>
          <Introduction>
            <BodyContainer className="here">
              <Viewer initialValue={normalizeProjectBody(body)} key={body} />
            </BodyContainer>
          </Introduction>
        </IntroductionContainer>
        {isLogin && projectMembers.length > 0 && (
          <MemberContainer>
            <h2>
              참여 멤버 <span>{projectMembers.length}</span>
            </h2>
            <Members>
              {projectMembers.map((member) => (
                <MemberCard key={member.loginID} member={member} />
              ))}
            </Members>
          </MemberContainer>
        )}
      </PagePanel>
    </PageShell>
  );
};

export default ProjectDetail;
