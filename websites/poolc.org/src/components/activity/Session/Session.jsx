// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Viewer } from '@dialga/react-editor';
import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import {
  Attendance,
  AttendanceList,
  Description,
  EmptySessionValue,
  SessionCard,
  SessionDescriptionBlock,
  SessionEditActions,
  SessionHeader,
  SessionMeta,
  SessionMetaGrid,
  SessionMetaItem,
  SessionMetaLabel,
  SessionMetaValue,
  SessionNumber,
} from './Session.styles';
import { File } from '~/components/board-legacy/PostForm/PostForm.styles';
import getFileUrl, { getDecodedFileUrl } from '../../../lib/utils/getFileUrl';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const Session = ({ session, memberInfo, activityID, attendance, host }) => {
  const { id, description, date, sessionNumber, hour, fileList } = session;
  const members = attendance.filter((a) => a.attended === true).map((a) => a.member);
  const fileCount = fileList?.length ?? 0;
  const {
    status: { isLogin },
    user: { memberId, role },
  } = memberInfo;
  const canEdit = isLogin && host.loginID === memberId;
  const canViewAttendance = isLogin && isAuthorizedRole(role);

  return (
    <SessionCard>
      <SessionHeader>
        <SessionNumber>{sessionNumber}회차</SessionNumber>
        <SessionMeta>
          {date} · {hour}시간 진행
        </SessionMeta>
      </SessionHeader>
      <SessionDescriptionBlock>
        <SessionMetaLabel>주제</SessionMetaLabel>
        <Description>
          <Viewer initialValue={description} key={description} />
        </Description>
      </SessionDescriptionBlock>
      {isLogin && (
        <SessionMetaGrid data-single={!canViewAttendance}>
          <SessionMetaItem>
            <SessionMetaLabel>첨부파일</SessionMetaLabel>
            <SessionMetaValue>{fileCount}개</SessionMetaValue>
            {fileCount > 0 ? (
              <AttendanceList>
                {fileList.map((file) => (
                  <File key={file}>
                    <a href={getFileUrl(file)}>{getDecodedFileUrl(file)}</a>
                  </File>
                ))}
              </AttendanceList>
            ) : (
              <EmptySessionValue>첨부된 파일 없음</EmptySessionValue>
            )}
          </SessionMetaItem>
          {canViewAttendance && (
            <SessionMetaItem>
              <SessionMetaLabel>출석</SessionMetaLabel>
              <SessionMetaValue>
                {members.length} / {attendance.length}명
              </SessionMetaValue>
              {members.length > 0 ? (
                <AttendanceList>
                  {members.map((member) => (
                    <Attendance key={member.loginID}>{member.name}</Attendance>
                  ))}
                </AttendanceList>
              ) : (
                <EmptySessionValue>출석 인원 없음</EmptySessionValue>
              )}
            </SessionMetaItem>
          )}
        </SessionMetaGrid>
      )}
      {canEdit && (
        <SessionEditActions>
          <ActionButton to={`/${MENU.ACTIVITY}/${activityID}/attendance/${id}`}>수정</ActionButton>
        </SessionEditActions>
        )}
    </SessionCard>
  );
};

export default Session;
