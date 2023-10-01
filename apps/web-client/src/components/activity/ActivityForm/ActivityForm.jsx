import ActionButton from '../../common/Buttons/ActionButton';
import { memo, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { notEmptyValidation } from '../../../lib/utils/validation';
import useInput from '../../../hooks/useInput';
import Input from '../../common/Input/Input';
import {
  ButtonContainer,
  CapacityContainer,
  HourContainer,
  Item,
  ItemContainer,
  Plan,
  StyledActionButton,
  StyledForm,
  StyledInput,
  Tag,
  TagInput,
  TagListBlock,
  TagListHeader,
  Title,
  TitleContainer,
} from './ActivityForm.styles';
import { Block, WhiteBlock } from '../../../styles/common/Block.styles';
import {
  File,
  FileContainer,
  FileContainerTitle,
  FileDeleteButton,
  StyledDeleteIcon,
} from '~/components/board-legacy/PostForm/PostForm.styles';
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

const TagList = ({ tags, onDeleteTag }) => {
  return (
    <TagListBlock>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} onDeleteTag={onDeleteTag} />
      ))}
    </TagListBlock>
  );
};

const ActivityForm = ({
  activity,
  onCreateActivity,
  onUpdateActivity,
  errorMessage,
  buttons,
  errorModalVisible,
  onCloseErrorModal,
}) => {
  const editorRef = useRef();
  const [title, onChangeTitle] = useInput(
    activity ? activity.title : '',
    notEmptyValidation,
  );
  const [description, onChangeDescription] = useState(
    activity ? activity.description : '',
  );
  const [startDate, onChangeStartDate] = useInput(
    activity ? activity.startDate : '',
    notEmptyValidation,
  );
  const [seminar, setSeminar] = useState(activity ? activity.seminar : true);
  const [classHour, onChangeClassHour] = useInput(
    activity ? activity.classHour : '',
    notEmptyValidation,
  );
  const [hour, onChangeHour] = useInput(
    activity ? activity.hour : '',
    notEmptyValidation,
  );
  const [capacity, onChangeCapacity] = useInput(
    activity ? activity.capacity : '',
    notEmptyValidation,
  );
  const [files, setFiles] = useState(activity ? activity.fileList : []);
  const [tags, onChangeTags] = useState(
    activity ? activity.tags.map((tag) => tag.name) : [],
  );
  const [tag, onChangeTag] = useInput('', notEmptyValidation);

  const onEditorChange = (e) => {
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
            <Title>세미나/스터디 {activity ? '수정' : '개설'}</Title>
          </TitleContainer>
          <StyledForm autoComplete="off">
            <ItemContainer style={{ margin: '0' }}>
              <Item>
                <Input
                  valueText={title}
                  labelText="세미나/스터디 제목"
                  typeText="text"
                  nameText="title"
                  onChangeFunc={onChangeTitle}
                  placeholderText="ex) 파이썬 기초 세미나"
                />
              </Item>
            </ItemContainer>
            <ItemContainer>
              <Item>
                <Input
                  valueText={startDate}
                  labelText="시작일"
                  typeText="date"
                  nameText="startDate"
                  onChangeFunc={onChangeStartDate}
                  placeholderText="YYYY-MM-DD"
                />
              </Item>
            </ItemContainer>
            <ItemContainer>
              <Item>
                <label htmlFor="seminar">형태</label>
                <div>
                  <input
                    type="radio"
                    name="seminar"
                    value="seminar"
                    checked={seminar === true ? true : false}
                    onChange={onChangeSeminar}
                  />
                  <span>세미나</span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="seminar"
                    value="study"
                    checked={seminar === true ? false : true}
                    onChange={onChangeSeminar}
                  />
                  <span>스터디</span>
                </div>
              </Item>
            </ItemContainer>
            <ItemContainer>
              <Item>
                <label htmlFor="capacity">정원</label>
                <CapacityContainer>
                  <StyledInput
                    value={capacity}
                    type="number"
                    name="capacity"
                    onChange={onChangeCapacity}
                    placeholder="ex) 10"
                  />
                  <span> 명</span>
                </CapacityContainer>
              </Item>
            </ItemContainer>
            <ItemContainer>
              <Item>
                <label htmlFor="classHour">시간</label>
                <HourContainer>
                  <StyledInput
                    value={classHour}
                    type="text"
                    name="classHour"
                    onChange={onChangeClassHour}
                    placeholder="ex) 매주 금요일 14시"
                  />
                  <span>에</span>
                </HourContainer>
                <HourContainer>
                  <StyledInput
                    value={hour}
                    type="number"
                    name="hour"
                    onChange={onChangeHour}
                    placeholder="ex) 2"
                    style={{ width: '4rem' }}
                  />
                  <span>시간 진행</span>
                </HourContainer>
              </Item>
            </ItemContainer>
            <ItemContainer>
              <Item>
                <label htmlFor="tag">태그</label>
                <p>
                  난이도, 다루는 내용, 분야 등<br />
                  ex) #기초 #파이썬 #웹 #프론트엔드
                </p>
                <TagInput>
                  <StyledInput
                    value={tag}
                    onChange={onChangeTag}
                    type="text"
                    name="tag"
                    placeholder="ex) 기초"
                  />
                  <ActionButton onClick={onAddTag}>추가</ActionButton>
                </TagInput>
                <TagListHeader>추가된 태그 목록</TagListHeader>
                <p>삭제하고 싶은 태그를 클릭하면 삭제됩니다</p>
                <TagList tags={tags} onDeleteTag={onDeleteTag} />
              </Item>
            </ItemContainer>
            <ItemContainer>
              <Item>
                <label htmlFor="activityTitle">계획서</label>
                <Plan>
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
                    {files?.length !== 0
                      ? files.map((file) => (
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
                      onSubmit={setFiles}
                      files={files}
                      multiple={true}
                    />
                  </ButtonContainer>
                </Plan>
              </Item>
            </ItemContainer>
            {activity ? (
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

export default ActivityForm;
