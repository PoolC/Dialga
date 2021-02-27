import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '../../../hooks/useInput';
import colors from '../../../lib/styles/colors';
import { notEmptyValidation } from '../../../lib/utils/validation';
import ActionButton from '../../common/Buttons/ActionButton';
import Input from '../../common/Input/Input';
import MemberCard from '../../members/MemberCard/MemberCard';

const AdminProjectFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 20px ${colors.gray[1]};
  flex: 4;
  border-radius: 50px;
  padding: 30px 0px;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > label {
    margin: 2rem 0 1rem 0;
    font-weight: 600;
  }
`;

const StyledActionButton = styled(ActionButton)`
  height: 2rem;
  width: 15rem;
  margin: 2rem 0;
`;

const StyledSearchActionButton = styled(ActionButton)`
  height: 2rem;
`;

const MemberSearchForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    width: 10rem;
  }
`;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0 10px 0;
  & > h3 {
    display: flex;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const MemberBlock = styled.div`
  display: flex;
  margin: 5px 0;
  padding: 5px 2px 5px 10px;
  border: 1px solid ${colors.mint[1]};
  border-radius: 3px;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 0.8rem;
    margin: 0.25rem;
  }
  & > .name {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`;

const StyledTextarea = styled.textarea`
  height: 6rem;
  width: 15rem;
  outline: 0;
`;

const Member = ({ member }) => {
  const { id, name, department, studentId } = member;
  return (
    <MemberBlock>
      <MemberInfo>
        <p className="name">{name}</p>
        <p>{studentId}</p>
        <p>{department}</p>
      </MemberInfo>
      <ButtonContainer>
        <ActionButton>
          <i className="fas fa-times"></i>
        </ActionButton>
      </ButtonContainer>
    </MemberBlock>
  );
};

const AdminProjectForm = ({ onCreateProject, onSearchMember, members }) => {
  // const members = [
  //   {
  //     id: 0,
  //     name: '김민지',
  //     department: '국어국문학과',
  //     studentId: '2015110019',
  //   },
  //   {
  //     id: 1,
  //     name: '김민지',
  //     department: '국어국문학과',
  //     studentId: '2015110019',
  //   },
  //   {
  //     id: 2,
  //     name: '김민지',
  //     department: '국어국문학과',
  //     studentId: '2015110019',
  //   },
  // ];
  const [searchMember, onChangeSearchMember] = useInput('', notEmptyValidation);
  const [name, onChangeName] = useInput('', notEmptyValidation);
  const [thumbnailURL, onChangeThumbnailURL] = useInput('', notEmptyValidation);
  const [genre, onChangeGenre] = useInput('', notEmptyValidation);
  const [duration, onChangeDuration] = useInput('', notEmptyValidation);
  const [description, onChangeDescription] = useInput('', notEmptyValidation);
  const [body, onChangeBody] = useInput('', notEmptyValidation);

  const onSubmit = (e) => {
    e.preventDefault();
    onCreateProject({ name, genre, duration, thumbnailURL, description, body });
    console.log('submit');
  };
  const onClickSearch = (e) => {
    e.preventDefault();
    onSearchMember(searchMember);
  };
  return (
    <AdminProjectFormBlock>
      <TitleContainer>프로젝트 생성</TitleContainer>
      <StyledForm onSubmit={onSubmit}>
        <Input
          valueText={name}
          labelText="프로젝트 이름"
          typeText="text"
          nameText="name"
          onChangeFunc={onChangeName}
          placeholderText="프로젝트 이름"
        />
        <Input
          valueText={genre}
          labelText="장르"
          typeText="text"
          nameText="genre"
          onChangeFunc={onChangeGenre}
          placeholderText="ex) 모바일 게임, 슈팅, 웹, .."
        />
        <Input
          valueText={duration}
          labelText="활동 기간"
          typeText="text"
          nameText="duration"
          onChangeFunc={onChangeDuration}
          placeholderText="ex) 2019.10.23 ~ 2020.10.23"
        />
        <Input
          valueText={thumbnailURL}
          labelText="썸네일 이미지 첨부"
          typeText="text"
          nameText="thumbnailURL"
          onChangeFunc={onChangeThumbnailURL}
        />
        <Input
          valueText={description}
          labelText="설명 요약"
          typeText="text"
          nameText="description"
          onChangeFunc={onChangeDescription}
          placeholderText="공백 포함 30자 이내"
        />
        <label>프로젝트 내용</label>
        <StyledTextarea
          value={body}
          nameText="body"
          onChange={onChangeBody}
          placeholderText="프로젝트 내용을 자세히 적어주세요"
        />
        <label>참여자</label>
        <MemberSearchForm>
          <Input
            valueText={searchMember}
            labelText=""
            typeText="text"
            nameText="id"
            onChangeFunc={onChangeSearchMember}
            placeholderText="회원 이름으로 검색"
          />
          <StyledSearchActionButton onClick={onClickSearch}>
            검색
          </StyledSearchActionButton>
        </MemberSearchForm>
        <MemberContainer>
          <h3>참여자 목록</h3>
          {members.map((member) => (
            <Member key={member.loginID} member={member} />
          ))}
        </MemberContainer>
        <div></div>
        <StyledActionButton>제출</StyledActionButton>
      </StyledForm>
    </AdminProjectFormBlock>
  );
};

export default AdminProjectForm;
