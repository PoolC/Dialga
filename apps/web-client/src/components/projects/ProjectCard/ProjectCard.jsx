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
  StyledLink,
  ThumbnailContainer,
} from './ProjectCard.styles';

const ProjectCard = ({ project }) => {
  const { id, thumbnailURL, name, genre, description } = project;
  return (
    <StyledLink to={`/${MENU.PROJECT}/${id}`}>
      <ProjectCardBlock>
        <Card>
          <ThumbnailContainer>
            <ProjectThumbnail
              src={
                getFileUrl(thumbnailURL) +
                getParametersForUnsplash({
                  width: 240,
                  height: 120,
                  quality: 80,
                  format: 'jpg',
                })
              }
              alt="project_thumbnail"
            />
          </ThumbnailContainer>
          <ProjectTitle>{name}</ProjectTitle>
          <ProjectGenre>{genre}</ProjectGenre>
          <ProjectDescription>{description}</ProjectDescription>
        </Card>
      </ProjectCardBlock>
    </StyledLink>
  );
};

export default ProjectCard;
