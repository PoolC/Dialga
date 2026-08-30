import { useMemo, useState } from 'react';
import { Popconfirm } from 'antd';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';
import ActionButton from '../../common/Buttons/ActionButton';
import { SearchToolbar } from '../../common/SearchToolbar/SearchToolbar';
import { SectionTabs } from '../../common/SectionTabs/SectionTabs';
import {
  AccountActions,
  AccountActionButton,
  ActivityTable,
  ActivityTableContainer,
  EmptyResult,
  PageHeader,
  StatusBadge,
  TableHead,
  Title,
  ToolbarActions,
} from './AdminActivity.styles';

const ACTIVITY_TYPE = {
  ALL: 'ALL',
  SEMINAR: 'SEMINAR',
  STUDY: 'STUDY',
};

const ACTIVITY_SEARCH_OPTIONS = [
  { value: 'ACTIVITY', label: '제목' },
  { value: 'HOST', label: '개설자' },
];

const ActivityTableHead = () => (
  <thead>
    <TableHead>
      <th>활동</th>
      <th>유형</th>
      <th>주최자</th>
      <th>시작일</th>
      <th>신청 상태</th>
      <th>조치</th>
    </TableHead>
  </thead>
);

const AdminActivity = ({ activities, onOpenActivity, onCloseActivity, onDeleteActivity }) => {
  const [activeTab, setActiveTab] = useState(ACTIVITY_TYPE.ALL);
  const [searchType, setSearchType] = useState('ACTIVITY');
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleActivities = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return activities.filter((activity) => {
      const activityType = activity.seminar ? ACTIVITY_TYPE.SEMINAR : ACTIVITY_TYPE.STUDY;
      const isInType = activeTab === ACTIVITY_TYPE.ALL || activityType === activeTab;
      const searchableValues = (searchType === 'HOST'
        ? [activity.host?.name]
        : [activity.title]
      ).filter(Boolean).join(' ').toLowerCase();

      return isInType && (!normalizedQuery || searchableValues.includes(normalizedQuery));
    });
  }, [activeTab, activities, searchQuery, searchType]);

  const tabs = [
    { key: ACTIVITY_TYPE.ALL, label: `전체 ${activities.length}` },
    { key: ACTIVITY_TYPE.SEMINAR, label: `세미나 ${activities.filter((activity) => activity.seminar).length}` },
    { key: ACTIVITY_TYPE.STUDY, label: `스터디 ${activities.filter((activity) => !activity.seminar).length}` },
  ];

  return (
    <WhiteNarrowBlock>
      <PageHeader>
        <Title>활동 관리</Title>
        <ToolbarActions>
          <SearchToolbar
            options={ACTIVITY_SEARCH_OPTIONS}
            searchType={searchType}
            keyword={keyword}
            placeholder="활동 검색"
            onSearchTypeChange={setSearchType}
            onKeywordChange={setKeyword}
            onSearch={() => setSearchQuery(keyword)}
          />
        </ToolbarActions>
      </PageHeader>
      <SectionTabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />
      <ActivityTableContainer>
        <ActivityTable>
          <ActivityTableHead />
          <tbody>
            {visibleActivities.map((activity) => (
              <tr key={activity.id}>
                <td><strong>{activity.title}</strong></td>
                <td>{activity.seminar ? '세미나' : '스터디'}</td>
                <td>{activity.host?.name || '-'}</td>
                <td>{activity.startDate || '-'}</td>
                <td><StatusBadge $available={activity.available}>{activity.available ? '신청 가능' : '신청 비공개'}</StatusBadge></td>
                <td>
                  <AccountActions>
                    <ActionButton onClick={() => (activity.available ? onCloseActivity(activity.id) : onOpenActivity(activity.id))}>
                      {activity.available ? '닫기' : '열기'}
                    </ActionButton>
                    <Popconfirm
                      title="활동 삭제"
                      description={`'${activity.title}' 활동을 정말 삭제하시겠습니까?`}
                      okText="삭제"
                      cancelText="취소"
                      okButtonProps={{ danger: true }}
                      onConfirm={() => onDeleteActivity(activity.id)}
                    >
                      <AccountActionButton>삭제</AccountActionButton>
                    </Popconfirm>
                  </AccountActions>
                </td>
              </tr>
            ))}
          </tbody>
        </ActivityTable>
        {visibleActivities.length === 0 && <EmptyResult>조건에 맞는 활동이 없습니다.</EmptyResult>}
      </ActivityTableContainer>
    </WhiteNarrowBlock>
  );
};

export default AdminActivity;
