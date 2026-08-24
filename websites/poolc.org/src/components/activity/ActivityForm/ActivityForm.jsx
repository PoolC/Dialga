import { memo, useRef, useState } from 'react';
// FIXME: eslint issue 수정 필요. 터미널에서는 에러가 나지 않으나, 에디터에서만 에러가 나고 있음
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor } from '@dialga/react-editor';
import { DeleteFilled } from '@ant-design/icons';
import { Radio } from 'antd';
import ActionButton from '../../common/Buttons/ActionButton';
import { notEmptyValidation } from '../../../lib/utils/validation';
import useInput from '../../../hooks/useInput';
import Input from '../../common/Input/Input';
import {
  AttachmentHeader,
  AttachmentSection,
  CapacityContainer,
  EmptyFileState,
  FormContent,
  FormGrid,
  FormSection,
  HourContainer,
  Item,
  ItemContainer,
  Plan,
  RadioOption,
  SectionTitle,
  StyledActionButton,
  StyledForm,
  StyledInput,
  SubmitArea,
  Tag,
  TagInput,
  TagListBlock,
  TagListHeader,
  Title,
  TitleContainer,
  TypeOptions,
  WideFormSection,
} from './ActivityForm.styles';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import { File, FileContainer, FileContainerTitle, FileDeleteButton } from '~/components/board-legacy/PostForm/PostForm.styles';
import FileUploadButton from '../../common/Buttons/FileUploadButton';
import Modal from '../../common/Modal/Modal';
import getFileUrl, { getDecodedFileUrl } from '../../../lib/utils/getFileUrl';
import throttle from '../../../lib/utils/throttle';

const TagItem = memo(({ tag, onDeleteTag }) => {
  const handleDeleteTag = () => {
    onDeleteTag(tag);
  };
  return <Tag onClick={handleDeleteTag}>#{tag}</Tag>;
});

const TagList = ({ tags, onDeleteTag }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} onDeleteTag={onDeleteTag} />
    ))}
  </TagListBlock>
);

const ActivityForm = ({ activity, onCreateActivity, onUpdateActivity, errorMessage, buttons, errorModalVisible, onCloseErrorModal }) => {
  const editorRef = useRef();
  const [title, onChangeTitle] = useInput(activity ? activity.title : '', notEmptyValidation);
  const [description, onChangeDescription] = useState(activity ? activity.description : '');
  const [startDate, onChangeStartDate] = useInput(activity ? activity.startDate : '', notEmptyValidation);
  const [seminar, setSeminar] = useState(activity ? activity.seminar : true);
  const [classHour, onChangeClassHour] = useInput(activity ? activity.classHour : '', notEmptyValidation);
  const [hour, onChangeHour] = useInput(activity ? activity.hour : '', notEmptyValidation);
  const [capacity, onChangeCapacity] = useInput(activity ? activity.capacity : '', notEmptyValidation);
  const [files, setFiles] = useState(activity ? activity.fileList : []);
  const [tags, onChangeTags] = useState(activity ? activity.tags.map((tag) => tag.name) : []);
  const [tag, onChangeTag] = useInput('', notEmptyValidation);

  const onEditorChange = () => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    onChangeDescription(markdownContent);
  };

  const onAddTag = (e) => {
    e.preventDefault();
    if (!tag) {
      return;
    }
    onChangeTags([...tags.filter((t) => t !== tag), tag]);
    e.target.value = '';
    onChangeTag(e);
  };

  const onDeleteTag = (tag) => {
    onChangeTags(tags.filter((t) => t !== tag));
  };

  const handleCreate = throttle((e) => {
    e.preventDefault();
    onCreateActivity({
      title,
      description,
      startDate,
      seminar,
      classHour,
      hour,
      capacity,
      tags,
      fileList: files,
    });
  }, 1000);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateActivity({
      title,
      description,
      startDate,
      seminar,
      classHour,
      hour,
      capacity,
      tags,
      fileList: files,
    });
  };

  const onChangeSeminar = (e) => {
    setSeminar(e.target.value === 'seminar');
  };

  const handleDeleteFile = (e, file) => {
    e.preventDefault();
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <>
      <Modal contents={errorMessage} buttons={buttons} visible={errorModalVisible} onConfirm={onCloseErrorModal} onCancel={onCloseErrorModal} />
      <Block>
        <WhiteBlock>
          <FormContent>
            <TitleContainer>
              <Title>세미나/스터디 {activity ? '수정' : '개설'}</Title>
            </TitleContainer>
            <StyledForm autoComplete="off">
              <FormGrid>
              <FormSection>
                <SectionTitle>기본 정보</SectionTitle>
                <ItemContainer>
                  <Item>
                    <Input valueText={title} labelText="세미나/스터디 제목" typeText="text" nameText="title" onChangeFunc={onChangeTitle} placeholderText="ex) 파이썬 기초 세미나" />
                  </Item>
                </ItemContainer>
                <ItemContainer>
                  <Item>
                    <label htmlFor="seminar">형태</label>
                    <TypeOptions>
                      <RadioOption htmlFor="seminar">
                        <Radio name="seminar" value="seminar" checked={seminar} onChange={onChangeSeminar} />
                        <span>세미나</span>
                      </RadioOption>
                      <RadioOption htmlFor="study">
                        <Radio name="seminar" value="study" checked={!seminar} onChange={onChangeSeminar} />
                        <span>스터디</span>
                      </RadioOption>
                    </TypeOptions>
                  </Item>
                </ItemContainer>
                <ItemContainer>
                  <Item>
                    <label htmlFor="tag">태그</label>
                    <p>난이도, 다루는 내용, 분야 등을 입력해주세요. 예: #기초 #파이썬 #웹</p>
                    <TagInput>
                      <StyledInput value={tag} onChange={onChangeTag} type="text" name="tag" placeholder="ex) 기초" />
                      <ActionButton onClick={onAddTag}>추가</ActionButton>
                    </TagInput>
                    <TagListHeader>추가된 태그</TagListHeader>
                    <TagList tags={tags} onDeleteTag={onDeleteTag} />
                  </Item>
                </ItemContainer>
              </FormSection>
              <FormSection>
                <SectionTitle>운영 정보</SectionTitle>
                <ItemContainer>
                  <Item>
                    <Input valueText={startDate} labelText="시작일" typeText="date" nameText="startDate" onChangeFunc={onChangeStartDate} placeholderText="YYYY-MM-DD" />
                  </Item>
                </ItemContainer>
                <ItemContainer>
                  <Item>
                    <label htmlFor="capacity">정원</label>
                    <CapacityContainer>
                      <StyledInput value={capacity} type="number" name="capacity" onChange={onChangeCapacity} placeholder="ex) 10" />
                      <span>명</span>
                    </CapacityContainer>
                  </Item>
                </ItemContainer>
                <ItemContainer>
                  <Item>
                    <label htmlFor="classHour">진행 시간</label>
                    <HourContainer>
                      <StyledInput value={classHour} type="text" name="classHour" onChange={onChangeClassHour} placeholder="ex) 매주 금요일 14시" />
                    </HourContainer>
                    <HourContainer>
                      <StyledInput value={hour} type="number" name="hour" onChange={onChangeHour} placeholder="ex) 2" style={{ width: '6rem' }} />
                      <span>시간 진행</span>
                    </HourContainer>
                  </Item>
                </ItemContainer>
              </FormSection>
              <WideFormSection>
                <SectionTitle>계획서</SectionTitle>
                <ItemContainer>
                  <Item>
                    <Plan>
                      <Editor initialEditType="wysiwyg" initialValue={description} ref={editorRef} onChange={(e) => onEditorChange(e)} />
                    </Plan>
                  </Item>
                </ItemContainer>
              </WideFormSection>
              <WideFormSection>
                <AttachmentHeader>
                  <SectionTitle>첨부 파일</SectionTitle>
                  <FileUploadButton onSubmit={setFiles} files={files} multiple buttonStyle={{ marginBottom: 0 }} />
                </AttachmentHeader>
                <AttachmentSection>
                  <FileContainerTitle style={{ width: '100%' }}>첨부된 파일 목록</FileContainerTitle>
                  {files?.length !== 0 ? (
                    <FileContainer style={{ width: '100%', maxWidth: '100%' }}>
                      {files.map((file) => (
                        <File key={file}>
                          <a href={getFileUrl(file)}>{getDecodedFileUrl(file)}</a>
                          <FileDeleteButton onClick={(e) => handleDeleteFile(e, file)}>
                            <DeleteFilled />
                          </FileDeleteButton>
                        </File>
                      ))}
                    </FileContainer>
                  ) : (
                    <EmptyFileState>아직 첨부한 파일이 없습니다.</EmptyFileState>
                  )}
                </AttachmentSection>
              </WideFormSection>
              </FormGrid>
              <SubmitArea>{activity ? <StyledActionButton onClick={handleUpdate}>수정</StyledActionButton> : <StyledActionButton onClick={handleCreate}>제출</StyledActionButton>}</SubmitArea>
            </StyledForm>
          </FormContent>
        </WhiteBlock>
      </Block>
    </>
  );
};

export default ActivityForm;
