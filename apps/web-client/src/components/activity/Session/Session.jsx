import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import {
  Attendance,
  AttendanceList,
  Date,
  Description,
  SessionCard,
  SessionDivider,
  SessionNumber,
} from './Session.styles';
import { Viewer } from '@toast-ui/react-editor';
import {
  File,
  FileContainer,
  FileContainerTitle,
} from '~/components/board-legacy/PostForm/PostForm.styles';
import getFileUrl, { getDecodedFileUrl } from '../../../lib/utils/getFileUrl';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const Session = ({ session, memberInfo, activityID, attendance, host }) => {
  const { id, description, date, sessionNumber, hour, fileList } = session;
  const members = attendance
    .filter((a) => a.attended === true)
    .map((a) => a.member);
  const {
    status: { isLogin },
    user: { memberId, role },
  } = memberInfo;

  return (
    <>
      <SessionCard>
        <SessionNumber>{sessionNumber}회차</SessionNumber>
        <Date>{date}</Date>
        <Date>({hour}시간 진행)</Date>
        <Description>
          <Viewer initialValue={description} />
        </Description>
        {isLogin && (
          <>
            <FileContainerTitle>첨부된 파일 목록</FileContainerTitle>
            <FileContainer>
              {fileList?.length !== 0
                ? fileList?.map((file) => (
                    <File key={file}>
                      <a href={getFileUrl(file)}>{getDecodedFileUrl(file)}</a>
                    </File>
                  ))
                : '첨부된 파일 없음'}
            </FileContainer>
          </>
        )}
        {isLogin && isAuthorizedRole(role) && members && (
          <AttendanceList>
            <h5>[출석 인원]</h5>
            {members.map((member) => (
              <Attendance key={member.loginID}>{member.name}</Attendance>
            ))}
          </AttendanceList>
        )}
      </SessionCard>
      {isLogin && host.loginID === memberId && (
        <ActionButton to={`/${MENU.ACTIVITY}/${activityID}/attendance/${id}`}>
          수정
        </ActionButton>
      )}
      <SessionDivider />
    </>
  );
};

export default Session;
