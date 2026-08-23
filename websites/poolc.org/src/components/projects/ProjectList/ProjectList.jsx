import styled from '@emotion/styled';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { PagePanel, PageShell } from '../../common/PageLayout/PageLayout';
import Spinner from '../../common/Spinner/Spinner';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList = ({ projects, loading }) => (
  <PageShell>
    <PagePanel>
      <PageHeader title="프로젝트" />
      {loading && <Spinner />}
      {!loading && (
        <ProjectGrid>
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectGrid>
      )}
    </PagePanel>
  </PageShell>
);

const ProjectGrid = styled(CardGrid)`
  gap: 16px;
  align-items: stretch;
`;

export default ProjectList;
