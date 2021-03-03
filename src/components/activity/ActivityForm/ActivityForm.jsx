import colors from '../../../lib/styles/colors';
import ActionButton from '../../common/Buttons/ActionButton';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { notEmptyValidation } from '../../../lib/utils/validation';
import useInput from '../../../hooks/useInput';
import Input from '../../common/Input/Input';

const ActivityFormBlock = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin: 0px 0 300px 0;
  @media (max-width: 576px) {
    margin-bottom: 500px;
  }
`;

const ActivityFormContainer = styled.div`
  width: 90%;
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 20px ${colors.gray[1]};
  border-radius: 50px;
  padding: 80px 10px 120px 10px;
  & > .project_container_title {
    font-weight: 700;
    margin-bottom: 30px;
    max-width: 1200px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0 40px 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledActionButton = styled(ActionButton)`
  width: 160px;
`;

const ItemContainer = styled.div`
  margin-bottom: 30px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin-bottom: 10px;
    font-weight: 700;
  }
  textarea {
    outline: 0;
  }
  p {
    color: ${colors.brown[0]};
    font-size: 0.9rem;
    margin-bottom: 10px;
    word-break: keep-all;
    text-align: center;
    line-height: 1.2rem;
  }
`;

const StyledInput = styled.input`
  outline: 0;
  border: 1px solid ${colors.brown[0]};
  height: 2rem;
  border-radius: 2px;
  width: 100%;
  max-width: 320px;
  outline: ${colors.gray[1]};
  &.capacity {
    width: 5rem;
    margin-right: 10px;
  }
  &.startDate {
    width: 10rem;
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${colors.mint[2]};
  cursor: pointer;
  background-color: ${colors.gray[1]};
  border: 1px solid ${colors.mint[1]};
  padding: 3px;
  border-radius: 3px;
  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const TagInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > input {
    width: 8rem;
  }
  & > button {
    margin: 0 0 0 10px;
  }
`;

const TagListHeader = styled.header`
  margin: 40px 0 10px 0;
  font-weight: 700;
`;

const HourContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  & > .hour {
    width: 3rem;
  }
  & > input {
    margin-right: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  & > button {
    margin: 0;
  }
`;

const CapacityContainer = styled.div`
  display: flex;
  align-items: center;
  & > input {
    width: 4rem;
  }
  & > span {
    margin-left: 0.5rem;
  }
`;

const TagItem = React.memo(({ tag, onDeleteTag }) => {
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

const ActivityForm = ({ activity, onCreateActivity, onUpdateActivity }) => {
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
  const [tags, onChangeTags] = useState(
    activity ? activity.tags.map((tag) => tag.name) : [],
  );
  const [tag, onChangeTag] = useInput('', notEmptyValidation);

  const onEditorChange = (e) => {
    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    console.log(markdownContent);
    const HTMLContent = editorInstance.getHtml();
    console.log(HTMLContent);
    onChangeDescription(markdownContent);
  };

  const onAddTag = (e) => {
    e.preventDefault();
    onChangeTags([...tags.filter((t) => t !== tag), tag]);
    e.target.value = '';
  };

  const onDeleteTag = (tag) => {
    onChangeTags(tags.filter((t) => t !== tag));
  };

  const handleCreate = (e) => {
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
    });
    console.log('submit');
  };

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
    });
  };

  const onChangeSeminar = (e) => {
    setSeminar(e.target.value === 'seminar');
  };

  return (
    <ActivityFormBlock>
      <ActivityFormContainer>
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
              <div>
                <Editor
                  initialValue={description}
                  ref={editorRef}
                  onChange={(e) => onEditorChange(e)}
                />
                <ButtonContainer>
                  <ActionButton>파일 첨부</ActionButton>
                </ButtonContainer>
              </div>
            </Item>
          </ItemContainer>
          {activity ? (
            <StyledActionButton onClick={handleUpdate}>수정</StyledActionButton>
          ) : (
            <StyledActionButton onClick={handleCreate}>제출</StyledActionButton>
          )}
        </StyledForm>
      </ActivityFormContainer>
    </ActivityFormBlock>
  );
};

export default ActivityForm;
