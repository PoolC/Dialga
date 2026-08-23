import { MENU } from '../../../constants/menus';
import getFileUrl from '../../../lib/utils/getFileUrl';
import { getParametersForUnsplash } from '../../../lib/utils/imageUtils';
import {
  Card,
  ProjectCardBlock,
  ProjectDescription,
  ProjectGenre,
  ProjectThumbnail,
  ProjectTitle,
  ProjectTrack,
  StyledLink,
  TextContent,
  ThumbnailContainer,
} from './ProjectCard.styles';

const splitProjectName = (name) => {
  const match = name?.match(/^\[([^\]]+)\]\s*(.+)$/);

  if (!match) {
    return { title: name, track: null };
  }

  return {
    title: match[2],
    track: match[1],
  };
};

const getProjectPlaceholder = (id) => `https://picsum.photos/seed/poolc-project-${id}/480/270`;

const getProjectThumbnail = ({ id, thumbnailURL }) => {
  if (!thumbnailURL) {
    return getProjectPlaceholder(id);
  }

  return (
    getFileUrl(thumbnailURL) +
    getParametersForUnsplash({
      width: 480,
      height: 270,
      quality: 80,
      format: 'jpg',
    })
  );
};

const ProjectCard = ({ project }) => {
  const { id, thumbnailURL, name, genre, description } = project;
  const { title, track } = splitProjectName(name);

  return (
    <StyledLink to={`/${MENU.PROJECT}/${id}`}>
      <ProjectCardBlock>
        <Card>
          <ThumbnailContainer>
            <ProjectThumbnail
              src={getProjectThumbnail({ id, thumbnailURL })}
              alt={title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getProjectPlaceholder(id);
              }}
            />
          </ThumbnailContainer>
          <TextContent>
            <ProjectTitle>{title}</ProjectTitle>
            <ProjectGenre>
              {track && <ProjectTrack>{track}</ProjectTrack>}
              <span>{genre}</span>
            </ProjectGenre>
            <ProjectDescription>{description}</ProjectDescription>
          </TextContent>
        </Card>
      </ProjectCardBlock>
    </StyledLink>
  );
};

export default ProjectCard;
