import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import { PagePanel } from '../../common/PageLayout/PageLayout';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import ActivityCard from '../ActivityCard/ActivityCard';

import { ActivityContent, ActivityGrid, HeaderActionArea, HeaderControls, SeminarPageShell, SemesterMenuBlock, SemesterMenuButton, SemesterMenuItem, SemesterMenuList } from './ActivityList.styles';
import Spinner from '../../common/Spinner/Spinner';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const ActivityList = ({ loading, activities, semesters, currentLocation, onChangeSemester, onToggleRegisterActivity, onDeleteActivity, member }) => {
  const {
    status: { isLogin },
    user: { memberId, role },
  } = member;
  const canManageActivity = isLogin && isAuthorizedRole(role);
  const semesterItems = semesters ?? [];

  return (
    <SeminarPageShell>
      <SemesterMenuBlock>
        <SemesterMenuList>
          {loading && <Spinner small />}
          {!loading &&
            semesterItems.map((semester) => (
              <SemesterMenuItem key={semester}>
                <SemesterMenuButton type="button" data-selected={currentLocation === semester} onClick={() => onChangeSemester(semester)}>
                  {semester}
                </SemesterMenuButton>
              </SemesterMenuItem>
            ))}
        </SemesterMenuList>
      </SemesterMenuBlock>
      <PagePanel narrow>
        <ActivityContent>
          <PageHeader
            title="세미나&스터디"
            actions={
              <HeaderControls>
                <HeaderActionArea>{canManageActivity && <ActionButton to={`/${MENU.ACTIVITY}/new`}>세미나 개설</ActionButton>}</HeaderActionArea>
              </HeaderControls>
            }
          />
          {loading && <Spinner />}
          {!loading && (
            <ActivityGrid>
              {activities.length === 0 && <EmptyState>해당 학기의 세미나 및 스터디가 존재하지 않습니다.</EmptyState>}
              {activities.map((activity) => (
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
        </ActivityContent>
      </PagePanel>
    </SeminarPageShell>
  );
};

export default ActivityList;
