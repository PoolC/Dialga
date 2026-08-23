import styled from '@emotion/styled';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { PageContent, PagePanel, PageShell } from '../../common/PageLayout/PageLayout';
import Spinner from '../../common/Spinner/Spinner';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList = ({ projects, loading }) => (
  <PageShell>
    <PagePanel>
      <ProjectContent>
        <PageHeader title="프로젝트" />
        {loading && <Spinner />}
        {!loading && (
          <ProjectGrid>
            {projects?.length === 0 && <EmptyState>등록된 프로젝트가 없습니다.</EmptyState>}
            {projects?.map((project) => <ProjectCard key={project.id} project={project} />)}
          </ProjectGrid>
        )}
      </ProjectContent>
    </PagePanel>
  </PageShell>
);

const ProjectContent = styled(PageContent)`
  max-width: 1210px;
`;

const ProjectGrid = styled(CardGrid)`
  margin-top: 18px;
  max-width: 1210px;
  gap: 16px;
  align-items: stretch;
  justify-content: center;
`;

export default ProjectList;
