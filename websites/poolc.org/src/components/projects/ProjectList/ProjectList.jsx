import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Empty } from 'antd';
import { media } from '~/styles/responsive';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { PageContent, PagePanel, PageShell } from '../../common/PageLayout/PageLayout';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import { MobileSectionFilter } from '../../common/MobileSectionFilter/MobileSectionFilter';
import { ListSearchToolbar } from '../../common/ListSearchToolbar/ListSearchToolbar';
import Spinner from '../../common/Spinner/Spinner';
import ProjectCard from '../ProjectCard/ProjectCard';

const PROJECT_CATEGORY_ITEMS = [
  { key: 'ALL', label: '전체' },
  { key: 'WEB_APP', label: '웹앱' },
  { key: 'GAME', label: '게임' },
  { key: 'OTHER', label: '기타' },
];

const ProjectList = ({ projects, loading, category, onCategoryChange }) => {
  const [keyword, setKeyword] = useState('');
  const visibleProjects = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return projects;
    }

    return projects?.filter((project) => project.name?.toLowerCase().includes(normalizedKeyword));
  }, [keyword, projects]);

  return (
    <PageShell>
      <PagePanel>
        <ProjectContent>
          <PageHeader
            title="프로젝트"
            actions={
              <ListSearchToolbar placeholder="제목 검색" value={keyword} onChange={setKeyword}>
                <MobileSectionFilter items={PROJECT_CATEGORY_ITEMS} activeKey={category} onChange={onCategoryChange} title="프로젝트 구분" showDrawerHeader={false} />
              </ListSearchToolbar>
            }
          />
          <ProjectCategoryTabs>
            <SectionTabs items={PROJECT_CATEGORY_ITEMS} activeKey={category} onChange={onCategoryChange} />
          </ProjectCategoryTabs>
          {loading && <Spinner />}
          {!loading && (
            <ProjectGrid>
              {visibleProjects?.length === 0 && (
                <ProjectEmptyState>
                  <Empty description="조건에 맞는 프로젝트가 없습니다." />
                </ProjectEmptyState>
              )}
              {visibleProjects?.map((project) => <ProjectCard key={project.id} project={project} />)}
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

const ProjectCategoryTabs = styled.div`
  ${media.mobile} {
    display: none;
  }
`;

const ProjectGrid = styled(CardGrid)`
  margin-top: 0;
  max-width: 1210px;
  gap: 16px;
  align-items: stretch;
  justify-content: center;
`;

const ProjectEmptyState = styled.li`
  display: flex;
  grid-column: 1 / -1;
  width: 100%;
  min-height: 260px;
  align-items: center;
  justify-content: center;
`;

export default ProjectList;
