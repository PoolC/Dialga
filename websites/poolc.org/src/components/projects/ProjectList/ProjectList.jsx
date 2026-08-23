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
        <CardGrid>
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </CardGrid>
      )}
    </PagePanel>
  </PageShell>
);

export default ProjectList;
