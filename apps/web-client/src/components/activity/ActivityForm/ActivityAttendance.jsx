import { useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import Input from '../../common/Input/Input';
import { notEmptyValidation } from '../../../lib/utils/validation';
import {
  Date,
  DateContainer,
  Description,
  DescriptionContainer,
  Hour,
  HourContainer,
  HourInput,
  MemberBlock,
  MemberContainer,
  Members,
  StyledActionButton,
  StyledForm,
  Title,
  TitleContainer,
} from './ActivityAttendance.styles';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import Modal from '../../common/Modal/Modal';
import { Editor } from '@toast-ui/react-editor';
import {
  File,
  FileContainer,
  FileContainerTitle,
  FileDeleteButton,
  StyledDeleteIcon,
} from '~/components/board-legacy/PostForm/PostForm.styles';
import getFileUrl, { getDecodedFileUrl } from '../../../lib/utils/getFileUrl';
import { ButtonContainer } from './ActivityForm.styles';
import FileUploadButton from '../../common/Buttons/FileUploadButton';
import throttle from '../../../lib/utils/throttle';

const Member = ({ member, attended, handleCheckAttendance }) => {
  const [isChecked, setIsChecked] = useState(attended ? attended : false);

  const handleCheck = (e) => {
    setIsChecked((isChecked) => !isChecked);
    handleCheckAttendance(member, isChecked);
  };

  return (
    <MemberBlock key={member.loginID}>
      <input
        type="checkbox"
        value={member.loginID}
        onChange={handleCheck}
        checked={isChecked}
      />
      {member.name}
    </MemberBlock>
  );
};

const ActivityAttendance = ({
  activity,
  activityMembers,
  activitySession,
  sessionNumber,
  sessionAttendance,
  onCreateSession,
  onUpdateSession,
  errorMessage,
  buttons,
  errorModalVisible,
  onCloseErrorModal,
}) => {
  const { title } = activity;
  const editorRef = useRef();
  const newSessionCount = activitySession
    ? activitySession.sessionNumber
    : sessionNumber;

  const [date, onChangeDate] = useInput(
    activitySession ? activitySession.date : '',
    notEmptyValidation,
  );

  const [description, onChangeDescription] = useState(
    activitySession ? activitySession.description : '',
  );

  const [hour, onChangeHour] = useInput(
    activitySession ? activitySession.hour : '',
    notEmptyValidation,
  );

  const [fileList, setFileList] = useState(
    activitySession ? activitySession.fileList : [],
  );

  const [attendances, setAttendances] = useState(
    sessionAttendance
      ? sessionAttendance
          .filter((attendance) => attendance.attended === true)
          .map((attendance) => attendance.member)
      : [],
  );

  const handleCheckAttendance = (member, isChecked) => {
    if (!isChecked) {
      setAttendances([
        ...attendances,
        { name: member.name, loginID: member.loginID },
      ]);
      return;
    }
    setAttendances(
      attendances.filter((attendance) => attendance.loginID !== member.loginID),
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateSession({
      date,
      description,
      attendances,
      hour,
      fileList,
    });
  };

  const handleCreate = throttle((e) => {
    e.preventDefault();
    onCreateSession({
      sessionNumber,
      date,
      description,
      attendances,
      hour,
      fileList,
    });
  }, 1000);

  const onEditorChange = (e) => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    onChangeDescription(markdownContent);
  };
  const handleDeleteFile = (e, file) => {
    e.preventDefault();
    setFileList(fileList.filter((f) => f !== file));
  };

  return (
    <>
      <Modal
        contents={errorMessage}
        buttons={buttons}
        visible={errorModalVisible}
        onConfirm={onCloseErrorModal}
        onCancel={onCloseErrorModal}
      />
      <Block>
        <WhiteBlock>
          <TitleContainer>
            <Title>{title}</Title>
            <Title>
              [{newSessionCount}회차 출석체크{sessionAttendance && ' 수정'}]
            </Title>
          </TitleContainer>
          <StyledForm>
            <DateContainer>
              <Date>
                <Input
                  valueText={date}
                  labelText="날짜"
                  typeText="date"
                  nameText="date"
                  onChangeFunc={onChangeDate}
                  placeholderText="YYYY-MM-DD"
                />
              </Date>
            </DateContainer>
            <HourContainer>
              <Hour>
                <label htmlFor="hour">진행 시간</label>
                <p>반올림하여 정수로 입력</p>
                <div>
                  <HourInput
                    value={hour}
                    label="진행 시간"
                    type="number"
                    name="hour"
                    onChange={onChangeHour}
                    placeholder="ex) 2"
                  />
                  <span style={{ marginLeft: '0.5rem' }}>시간</span>
                </div>
              </Hour>
            </HourContainer>
            <DescriptionContainer>
              <Description>
                <label htmlFor="description">내용</label>
                <p>예시: 파이썬의 변수에 대해 공부 / A 논문 스터디 등</p>
                <Editor
                  initialEditType="wysiwyg"
                  initialValue={description}
                  ref={editorRef}
                  onChange={(e) => onEditorChange(e)}
                  style={{ width: '100%' }}
                />
                <FileContainerTitle style={{ width: '100%' }}>
                  첨부된 파일 목록
                </FileContainerTitle>
                <FileContainer style={{ width: '100%', maxWidth: '100%' }}>
                  {fileList?.length !== 0
                    ? fileList.map((file) => (
                        <File key={file}>
                          <a href={getFileUrl(file)}>
                            {getDecodedFileUrl(file)}
                          </a>
                          <FileDeleteButton
                            onClick={(e) => handleDeleteFile(e, file)}
                          >
                            <StyledDeleteIcon className="far fa-trash-alt"></StyledDeleteIcon>
                          </FileDeleteButton>
                        </File>
                      ))
                    : '첨부된 파일 없음'}
                </FileContainer>
                <ButtonContainer>
                  <FileUploadButton
                    onSubmit={setFileList}
                    files={fileList}
                    multiple={true}
                  />
                </ButtonContainer>
              </Description>
            </DescriptionContainer>
            <MemberContainer>
              <h4>참여 멤버 목록</h4>
              <p>출석한 인원만 체크해주세요.</p>
              <Members>
                {sessionAttendance
                  ? sessionAttendance.map((attendance) => (
                      <Member
                        key={attendance.member.loginID}
                        member={attendance.member}
                        attended={attendance.attended}
                        handleCheckAttendance={handleCheckAttendance}
                      />
                    ))
                  : activityMembers.map((member) => (
                      <Member
                        key={member.loginID}
                        member={member}
                        handleCheckAttendance={handleCheckAttendance}
                      />
                    ))}
              </Members>
            </MemberContainer>
            {sessionAttendance ? (
              <StyledActionButton onClick={handleUpdate}>
                수정
              </StyledActionButton>
            ) : (
              <StyledActionButton onClick={handleCreate}>
                제출
              </StyledActionButton>
            )}
          </StyledForm>
        </WhiteBlock>
      </Block>
    </>
  );
};

export default ActivityAttendance;
