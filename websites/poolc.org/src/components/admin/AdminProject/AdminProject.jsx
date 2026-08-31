import { useMemo, useState } from 'react';
import { Popconfirm } from 'antd';
import ActionButton from '../../common/Buttons/ActionButton';
import { SearchToolbar } from '../../common/SearchToolbar/SearchToolbar';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import { MENU } from '../../../constants/menus';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import {
  AccountActions,
  AccountActionButton,
  EmptyResult,
  PageHeader,
  ProjectIdentity,
  ProjectListRow,
  ProjectTable,
  ProjectTableContainer,
  TabActionRow,
  TableHead,
  Title,
  ToolbarActions,
} from './AdminProject.styles';

const PROJECT_CATEGORY = {
  ALL: 'ALL',
  WEB_APP: 'WEB_APP',
  GAME: 'GAME',
  OTHER: 'OTHER',
};

const PROJECT_CATEGORY_LABEL = {
  WEB_APP: '웹앱',
  GAME: '게임',
  OTHER: '기타',
};

const ProjectTableHead = () => (
  <thead>
    <TableHead>
      <th>프로젝트</th>
      <th>분류</th>
      <th>활동 기간</th>
      <th>장르</th>
      <th>조치</th>
    </TableHead>
  </thead>
);

const formatActivityPeriod = (project) => {
  if (!project.startDate) return '-';
  return project.endDate ? `${project.startDate} - ${project.endDate}` : `${project.startDate} - 진행 중`;
};

const AdminProject = ({ projects, onDeleteProject }) => {
  const [activeTab, setActiveTab] = useState(PROJECT_CATEGORY.ALL);
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const isInCategory = activeTab === PROJECT_CATEGORY.ALL || project.category === activeTab;
      const searchableValues = [project.name, project.genre, project.description].filter(Boolean).join(' ').toLowerCase();

      return isInCategory && (!normalizedQuery || searchableValues.includes(normalizedQuery));
    });
  }, [activeTab, projects, searchQuery]);

  const tabs = [
    { key: PROJECT_CATEGORY.ALL, label: `전체 ${projects.length}` },
    { key: PROJECT_CATEGORY.WEB_APP, label: `웹앱 ${projects.filter((project) => project.category === PROJECT_CATEGORY.WEB_APP).length}` },
    { key: PROJECT_CATEGORY.GAME, label: `게임 ${projects.filter((project) => project.category === PROJECT_CATEGORY.GAME).length}` },
    { key: PROJECT_CATEGORY.OTHER, label: `기타 ${projects.filter((project) => project.category === PROJECT_CATEGORY.OTHER).length}` },
  ];

  return (
    <WhiteNarrowBlock>
      <PageHeader>
        <Title>프로젝트 관리</Title>
        <ToolbarActions>
          <SearchToolbar
            keyword={keyword}
            placeholder="프로젝트 검색"
            onKeywordChange={setKeyword}
            onSearch={() => setSearchQuery(keyword)}
            showSearchType={false}
          />
        </ToolbarActions>
      </PageHeader>
      <TabActionRow>
        <SectionTabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
        <ActionButton to={`/${MENU.ADMIN}/projects/new`}>프로젝트 생성</ActionButton>
      </TabActionRow>
      <ProjectTableContainer>
        <ProjectTable>
          <ProjectTableHead />
          <tbody>
            {visibleProjects.map((project) => (
              <ProjectListRow key={project.id}>
                <td>
                  <ProjectIdentity>
                    <strong>{project.name}</strong>
                  </ProjectIdentity>
                </td>
                <td>{PROJECT_CATEGORY_LABEL[project.category] || '-'}</td>
                <td>{formatActivityPeriod(project)}</td>
                <td>{project.genre || '-'}</td>
                <td>
                  <AccountActions>
                    <ActionButton to={`/${MENU.ADMIN}/projects/edit/${project.id}`}>편집</ActionButton>
                    <Popconfirm
                      title="프로젝트 삭제"
                      description={`'${project.name}' 프로젝트를 정말 삭제하시겠습니까?`}
                      okText="삭제"
                      cancelText="취소"
                      okButtonProps={{ danger: true }}
                      onConfirm={() => onDeleteProject(project.id)}
                    >
                      <AccountActionButton>삭제</AccountActionButton>
                    </Popconfirm>
                  </AccountActions>
                </td>
              </ProjectListRow>
            ))}
          </tbody>
        </ProjectTable>
        {visibleProjects.length === 0 && <EmptyResult>조건에 맞는 프로젝트가 없습니다.</EmptyResult>}
      </ProjectTableContainer>
    </WhiteNarrowBlock>
  );
};

export default AdminProject;
