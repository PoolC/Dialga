import ActionButton from '../../common/Buttons/ActionButton';

import {
  ActivityListRow,
  ContentsContainer,
  Table,
  TableHead,
  TitleContainer,
} from './AdminActivity.styles';
import { WhiteNarrowBlock } from '../../../styles/common/Block.styles';

const AdminActivity = ({
  activities,
  onOpenActivity,
  onCloseActivity,
  onDeleteActivity,
}) => {
  const handleClose = (e, activityID) => {
    e.preventDefault();
    onCloseActivity(activityID);
  };

  const handleOpen = (e, activityID) => {
    e.preventDefault();
    onOpenActivity(activityID);
  };

  const handleDelete = (e, activityID) => {
    e.preventDefault();
    onDeleteActivity(activityID);
  };

  return (
    <WhiteNarrowBlock>
      <TitleContainer>세미나/스터디 관리</TitleContainer>
      <ContentsContainer>
        <Table>
          <thead>
            <TableHead>
              <th className="activity_list_head">이름</th>
              <th className="activity_list_head">주최자</th>
              <th className="activity_list_head hide">시작일</th>
              <th className="activity_list_head hide">종류</th>
              <th className="activity_list_head">신청 가능 여부</th>
              <th className="activity_list_head">동작</th>
            </TableHead>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityListRow key={activity.id}>
                <td className="activity-list-row">{activity.title}</td>
                <td className="activity-list-row">{activity.host.name}</td>
                <td className="activity-list-row hide">{activity.startDate}</td>
                <td className="activity-list-row hide">
                  {activity.seminar ? '세미나' : '스터디'}
                </td>
                <td className="activity-list-row">
                  {activity.available ? 'o' : 'x'}
                </td>
                <td className="activity-list-row">
                  {activity.available ? (
                    <ActionButton onClick={(e) => handleClose(e, activity.id)}>
                      닫기
                    </ActionButton>
                  ) : (
                    <ActionButton onClick={(e) => handleOpen(e, activity.id)}>
                      열기
                    </ActionButton>
                  )}
                  <ActionButton onClick={(e) => handleDelete(e, activity.id)}>
                    삭제
                  </ActionButton>
                </td>
              </ActivityListRow>
            ))}
          </tbody>
        </Table>
      </ContentsContainer>
    </WhiteNarrowBlock>
  );
};

export default AdminActivity;
