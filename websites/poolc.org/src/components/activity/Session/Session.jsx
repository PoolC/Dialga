// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Viewer } from '@dialga/react-editor';
import { MENU } from '../../../constants/menus';
import ActionButton from '../../common/Buttons/ActionButton';
import { Attendance, AttendanceList, Date, Description, SessionCard, SessionDivider, SessionNumber } from './Session.styles';
import { File, FileContainer, FileContainerTitle } from '~/components/board-legacy/PostForm/PostForm.styles';
import getFileUrl, { getDecodedFileUrl } from '../../../lib/utils/getFileUrl';
import { isAuthorizedRole } from '../../../lib/utils/checkRole';

const Session = ({ session, memberInfo, activityID, attendance, host }) => {
  const { id, description, date, sessionNumber, hour, fileList } = session;
  const members = attendance.filter((a) => a.attended === true).map((a) => a.member);
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
          <Viewer initialValue={description} key={description} />
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
      {isLogin && host.loginID === memberId && <ActionButton to={`/${MENU.ACTIVITY}/${activityID}/attendance/${id}`}>수정</ActionButton>}
      <SessionDivider />
    </>
  );
};

export default Session;
