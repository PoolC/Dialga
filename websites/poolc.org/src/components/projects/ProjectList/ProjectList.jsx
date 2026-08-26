import styled from '@emotion/styled';
import { useAppSelector } from '~/hooks/useAppSelector';
import { MENU } from '~/constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { PageContent, PagePanel, PageShell } from '../../common/PageLayout/PageLayout';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import Spinner from '../../common/Spinner/Spinner';
import ProjectCard from '../ProjectCard/ProjectCard';

const PROJECT_CATEGORY_ITEMS = [
  { key: 'ALL', label: '전체' },
  { key: 'WEB_APP', label: '웹앱' },
  { key: 'GAME', label: '게임' },
];

const ProjectList = ({ projects, loading, category, onCategoryChange }) => {
  const isAdmin = useAppSelector((state) => state.auth.user.isAdmin);

  return (
    <PageShell>
      <PagePanel>
        <ProjectContent>
          <PageHeader
            title="프로젝트"
            actions={isAdmin ? <ActionButton to={`/${MENU.ADMIN}/projects`}>프로젝트 관리</ActionButton> : null}
          />
          <SectionTabs items={PROJECT_CATEGORY_ITEMS} activeKey={category} onChange={onCategoryChange} />
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
};

const ProjectContent = styled(PageContent)`
  max-width: 1210px;
`;

const ProjectGrid = styled(CardGrid)`
  margin-top: 0;
  max-width: 1210px;
  gap: 16px;
  align-items: stretch;
  justify-content: center;
`;

export default ProjectList;
