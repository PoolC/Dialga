import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import { PagePanel } from '../../common/PageLayout/PageLayout';
import ActivityCard from '../ActivityCard/ActivityCard';
import { FilterSelect } from '../../common/FilterSearchToolbar/FilterSearchToolbar';

import { ActivityGrid, HeaderActionArea, HeaderControls, HeaderMeta, HeaderTitle, SeminarHeader, SeminarPageShell, SemesterSelectArea, TitleGroup } from './ActivityList.styles';
import Spinner from '../../common/Spinner/Spinner';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const ActivityList = ({ loading, activities, semesters, currentLocation, onChangeSemester, onToggleRegisterActivity, onDeleteActivity, member }) => {
  const {
    status: { isLogin },
    user: { memberId, role },
  } = member;
  const canManageActivity = isLogin && isAuthorizedRole(role);
  const semesterOptions = (semesters ?? []).map((semester) => ({ label: semester, value: semester }));

  return (
    <SeminarPageShell>
      <PagePanel>
        <SeminarHeader>
          <TitleGroup>
            <HeaderTitle>세미나&스터디</HeaderTitle>
            {!loading && <HeaderMeta>{activities.length}개 진행 중</HeaderMeta>}
          </TitleGroup>
          <HeaderControls>
            <SemesterSelectArea>
              {loading && <Spinner small />}
              {!loading && <FilterSelect value={currentLocation} onChange={onChangeSemester} options={semesterOptions} />}
            </SemesterSelectArea>
            <HeaderActionArea>{canManageActivity && <ActionButton to={`/${MENU.ACTIVITY}/new`}>세미나 개설</ActionButton>}</HeaderActionArea>
          </HeaderControls>
        </SeminarHeader>
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
      </PagePanel>
    </SeminarPageShell>
  );
};

export default ActivityList;
