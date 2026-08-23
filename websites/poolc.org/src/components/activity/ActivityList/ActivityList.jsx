import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import { CardGrid } from '../../common/CardGrid/CardGrid';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import { PageHeader } from '../../common/PageHeader/PageHeader';
import { PagePanel, PageShell } from '../../common/PageLayout/PageLayout';
import ActivityCard from '../ActivityCard/ActivityCard';

import { Description } from './ActivityList.styles';
import Spinner from '../../common/Spinner/Spinner';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const ActivityList = ({ loading, activities, onToggleRegisterActivity, onDeleteActivity, member }) => {
  const {
    status: { isLogin },
    user: { memberId, role },
  } = member;

  return (
    <PageShell>
      <PagePanel narrow>
        <PageHeader title="세미나&스터디" actions={isLogin && isAuthorizedRole(role) && <ActionButton to={`/${MENU.ACTIVITY}/new`}>개설</ActionButton>} />
        <Description>상세 내용을 보려면 각 제목을 클릭해주세요.</Description>
        {loading && <Spinner />}
        {!loading && (
          <CardGrid>
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
          </CardGrid>
        )}
      </PagePanel>
    </PageShell>
  );
};

export default ActivityList;
