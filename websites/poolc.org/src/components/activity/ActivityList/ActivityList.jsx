import { useMemo, useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import { PagePanel } from '../../common/PageLayout/PageLayout';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { ListSearchToolbar } from '../../common/ListSearchToolbar/ListSearchToolbar';
import { MobileSectionFilter } from '../../common/MobileSectionFilter/MobileSectionFilter';
import ActivityCard from '../ActivityCard/ActivityCard';

import { ActivityContent, ActivityFloatingCreateButton, ActivityGrid, HeaderActionArea, HeaderControls, SeminarPageShell, SemesterMenuBlock, SemesterMenuButton, SemesterMenuItem, SemesterMenuList } from './ActivityList.styles';
import Spinner from '../../common/Spinner/Spinner';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const isOpenForRegistration = (activity) => (
  activity.available && (activity.memberLoginIds?.length ?? 0) < activity.capacity
);

const ActivityList = ({ loading, activities, semesters, currentLocation, onChangeSemester, onToggleRegisterActivity, onDeleteActivity, member }) => {
  const {
    status: { isLogin },
    user: { memberId, role },
  } = member;
  const canManageActivity = isLogin && isAuthorizedRole(role);
  const semesterItems = semesters ?? [];
  const [keyword, setKeyword] = useState('');
  const visibleActivities = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return (activities ?? [])
      .filter((activity) => !normalizedKeyword || activity.title?.toLowerCase().includes(normalizedKeyword))
      .slice()
      .sort((firstActivity, secondActivity) => {
        const availabilityOrder = Number(isOpenForRegistration(secondActivity)) - Number(isOpenForRegistration(firstActivity));

        if (availabilityOrder !== 0) {
          return availabilityOrder;
        }

        return (firstActivity.title ?? '').localeCompare(secondActivity.title ?? '');
      });
  }, [activities, keyword]);
  const semesterFilterItems = semesterItems.map((semester) => ({ key: semester, label: semester }));

  return (
    <SeminarPageShell>
      <SemesterMenuBlock>
        <SemesterMenuList>
          {loading && <Spinner small />}
          {!loading && semesterItems.map((semester) => (
            <SemesterMenuItem key={semester}>
              <SemesterMenuButton type="button" data-selected={currentLocation === semester} onClick={() => onChangeSemester(semester)}>
                {semester}
              </SemesterMenuButton>
            </SemesterMenuItem>
          ))}
        </SemesterMenuList>
      </SemesterMenuBlock>
      <PagePanel narrow>
        <ActivityContent data-has-create-action={canManageActivity}>
          <PageHeader
            title="세미나&스터디"
            actions={
              <HeaderControls>
                <ListSearchToolbar placeholder="제목 검색" value={keyword} onChange={setKeyword}>
                  <MobileSectionFilter
                    items={semesterFilterItems}
                    activeKey={currentLocation}
                    onChange={onChangeSemester}
                    title="학기 선택"
                    triggerIcon={<DownOutlined />}
                    visibleBelowWide
                    showDrawerHeader={false}
                  />
                </ListSearchToolbar>
                <HeaderActionArea>{canManageActivity && <ActionButton to={`/${MENU.ACTIVITY}/new`}>세미나 개설</ActionButton>}</HeaderActionArea>
              </HeaderControls>
            }
          />
          {loading && <Spinner />}
          {!loading && (
            <ActivityGrid>
              {visibleActivities.length === 0 && <EmptyState>조건에 맞는 세미나 및 스터디가 없습니다.</EmptyState>}
              {visibleActivities.map((activity) => (
                <ActivityCard
                  onToggleRegisterActivity={onToggleRegisterActivity}
                  onDeleteActivity={onDeleteActivity}
                  key={activity.id}
                  activity={activity}
                  isLogin={isLogin}
                  memberId={memberId}
                  role={role}
                />
              ))}
            </ActivityGrid>
          )}
          {canManageActivity && (
            <ActivityFloatingCreateButton to={`/${MENU.ACTIVITY}/new`}>
              <PlusOutlined />
              세미나 개설
            </ActivityFloatingCreateButton>
          )}
        </ActivityContent>
      </PagePanel>
    </SeminarPageShell>
  );
};

export default ActivityList;
